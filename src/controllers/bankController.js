const plaidClient = require('../config/plaid');
const BankAccount = require('../models/BankAccount');
const Transaction = require('../models/Transaction');

const bankController = {
  // Connect a bank account
  async connectBank(req, res) {
    try {
      const { public_token, institution, accounts } = req.body;
      const userId = req.user.id; // Assuming you have user authentication

      // Exchange public token for access token
      const exchangeResponse = await plaidClient.itemPublicTokenExchange({
        public_token,
      });

      const { access_token, item_id } = exchangeResponse.data;

      // Get account details
      const accountsResponse = await plaidClient.accountsGet({
        access_token,
      });

      // Store bank account information
      const bankAccount = await BankAccount.create({
        userId,
        itemId: item_id,
        accessToken: access_token,
        institutionId: institution.institution_id,
        institutionName: institution.name,
        accounts: accountsResponse.data.accounts,
      });

      // Fetch initial transactions
      await bankController.syncTransactions(bankAccount._id);

      res.status(201).json(bankAccount);
    } catch (error) {
      console.error('Error connecting bank:', error);
      res.status(500).json({ error: 'Failed to connect bank account' });
    }
  },

  // Disconnect a bank account
  async disconnectBank(req, res) {
    try {
      const { bankId } = req.params;
      const userId = req.user.id;

      const bankAccount = await BankAccount.findOne({
        _id: bankId,
        userId,
      });

      if (!bankAccount) {
        return res.status(404).json({ error: 'Bank account not found' });
      }

      // Remove item from Plaid
      await plaidClient.itemRemove({
        access_token: bankAccount.accessToken,
      });

      // Delete bank account and associated transactions
      await BankAccount.deleteOne({ _id: bankId });
      await Transaction.deleteMany({ bankAccountId: bankId });

      res.status(200).json({ message: 'Bank account disconnected successfully' });
    } catch (error) {
      console.error('Error disconnecting bank:', error);
      res.status(500).json({ error: 'Failed to disconnect bank account' });
    }
  },

  // Sync transactions for a bank account
  async syncTransactions(bankAccountId) {
    try {
      const bankAccount = await BankAccount.findById(bankAccountId);
      if (!bankAccount) return;

      // Get transactions from Plaid
      const transactionsResponse = await plaidClient.transactionsGet({
        access_token: bankAccount.accessToken,
        start_date: '2024-01-01', // Adjust as needed
        end_date: new Date().toISOString().split('T')[0],
        options: {
          count: 100,
          offset: 0,
        },
      });

      const { transactions } = transactionsResponse.data;

      // Store transactions in database
      for (const transaction of transactions) {
        await Transaction.create({
          bankAccountId: bankAccount._id,
          plaidTransactionId: transaction.transaction_id,
          amount: transaction.amount,
          date: transaction.date,
          description: transaction.name,
          category: transaction.category?.[0] || 'Uncategorized',
          merchantName: transaction.merchant_name,
        });
      }

      // Update last sync time
      bankAccount.lastSync = new Date();
      await bankAccount.save();
    } catch (error) {
      console.error('Error syncing transactions:', error);
      throw error;
    }
  },

  // Get connected bank accounts
  async getConnectedBanks(req, res) {
    try {
      const userId = req.user.id;
      const bankAccounts = await BankAccount.find({ userId });
      res.status(200).json(bankAccounts);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      res.status(500).json({ error: 'Failed to fetch bank accounts' });
    }
  },
};

module.exports = bankController; 