import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  Add as AddIcon,
  Delete as DeleteIcon,
  SwapHoriz as TransferIcon,
} from '@mui/icons-material';

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit';
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  accountId: string;
}

const BankingServices: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [openAddAccount, setOpenAddAccount] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<BankAccount>>({});
  const [transferDetails, setTransferDetails] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
  });

  const handleAddAccount = () => {
    if (newAccount.bankName && newAccount.accountNumber && newAccount.type) {
      const account: BankAccount = {
        id: Date.now().toString(),
        bankName: newAccount.bankName!,
        accountNumber: newAccount.accountNumber!,
        balance: 0,
        type: newAccount.type!,
      };
      setAccounts([...accounts, account]);
      setNewAccount({});
      setOpenAddAccount(false);
    }
  };

  const handleTransfer = () => {
    if (transferDetails.fromAccount && transferDetails.toAccount && transferDetails.amount) {
      const amount = parseFloat(transferDetails.amount);
      const fromAccount = accounts.find(acc => acc.id === transferDetails.fromAccount);
      const toAccount = accounts.find(acc => acc.id === transferDetails.toAccount);

      if (fromAccount && toAccount && fromAccount.balance >= amount) {
        // Update account balances
        setAccounts(accounts.map(acc => {
          if (acc.id === fromAccount.id) {
            return { ...acc, balance: acc.balance - amount };
          }
          if (acc.id === toAccount.id) {
            return { ...acc, balance: acc.balance + amount };
          }
          return acc;
        }));

        // Add transaction record
        const transaction: Transaction = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          description: `Transfer to ${toAccount.bankName}`,
          amount,
          type: 'transfer',
          accountId: fromAccount.id,
        };
        setTransactions([transaction, ...transactions]);
        setTransferDetails({ fromAccount: '', toAccount: '', amount: '' });
        setOpenTransfer(false);
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Banking Services</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddAccount(true)}
        >
          Add Account
        </Button>
      </Box>

      {/* Bank Accounts */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Linked Accounts
        </Typography>
        <List>
          {accounts.map((account) => (
            <React.Fragment key={account.id}>
              <ListItem>
                <AccountBalance sx={{ mr: 2 }} />
                <ListItemText
                  primary={account.bankName}
                  secondary={`${account.type.charAt(0).toUpperCase() + account.type.slice(1)} • ${account.accountNumber}`}
                />
                <ListItemSecondaryAction>
                  <Typography variant="h6" color="primary">
                    ${account.balance.toLocaleString()}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Recent Transactions */}
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Recent Transactions</Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<TransferIcon />}
            onClick={() => setOpenTransfer(true)}
          >
            Transfer
          </Button>
        </Box>
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction.id}>
              <ListItemText
                primary={transaction.description}
                secondary={new Date(transaction.date).toLocaleDateString()}
              />
              <ListItemSecondaryAction>
                <Typography
                  variant="body1"
                  color={transaction.type === 'deposit' ? 'success.main' : 'error.main'}
                >
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Add Account Dialog */}
      <Dialog open={openAddAccount} onClose={() => setOpenAddAccount(false)}>
        <DialogTitle>Add Bank Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Bank Name"
            fullWidth
            value={newAccount.bankName || ''}
            onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Account Number"
            fullWidth
            value={newAccount.accountNumber || ''}
            onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Account Type"
            select
            fullWidth
            value={newAccount.type || ''}
            onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value as BankAccount['type'] })}
          >
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="credit">Credit</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddAccount(false)}>Cancel</Button>
          <Button onClick={handleAddAccount} variant="contained" color="primary">
            Add Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={openTransfer} onClose={() => setOpenTransfer(false)}>
        <DialogTitle>Transfer Money</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            label="From Account"
            fullWidth
            value={transferDetails.fromAccount}
            onChange={(e) => setTransferDetails({ ...transferDetails, fromAccount: e.target.value })}
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bankName} - ${account.balance.toLocaleString()}
              </option>
            ))}
          </TextField>
          <TextField
            select
            margin="dense"
            label="To Account"
            fullWidth
            value={transferDetails.toAccount}
            onChange={(e) => setTransferDetails({ ...transferDetails, toAccount: e.target.value })}
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bankName} - ${account.balance.toLocaleString()}
              </option>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={transferDetails.amount}
            onChange={(e) => setTransferDetails({ ...transferDetails, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTransfer(false)}>Cancel</Button>
          <Button onClick={handleTransfer} variant="contained" color="primary">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BankingServices; 