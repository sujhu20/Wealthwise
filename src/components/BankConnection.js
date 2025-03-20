import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  AccountBalance as BankIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const BankConnection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [connectedBanks, setConnectedBanks] = useState([]);

  const handleConnectBank = () => {
    // Initialize Plaid Link
    const handler = window.Plaid.create({
      clientName: 'WealthWise',
      env: process.env.REACT_APP_PLAID_ENV || 'sandbox',
      product: ['transactions'],
      language: 'en',
      countryCodes: ['US'],
      onSuccess: (public_token, metadata) => {
        // Send public_token to your backend
        connectBankAccount(public_token, metadata);
      },
      onExit: (err, metadata) => {
        if (err) console.error('Plaid Link Error:', err);
      },
      onEvent: (eventName, metadata) => {
        console.log('Plaid Event:', eventName, metadata);
      },
    });

    handler.open();
  };

  const connectBankAccount = async (public_token, metadata) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bank/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_token,
          institution: metadata.institution,
          accounts: metadata.accounts,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setConnectedBanks([...connectedBanks, data]);
        setOpenDialog(false);
      } else {
        throw new Error('Failed to connect bank account');
      }
    } catch (error) {
      console.error('Error connecting bank:', error);
      // Handle error (show error message to user)
    }
  };

  const handleDisconnectBank = async (bankId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bank/disconnect/${bankId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConnectedBanks(connectedBanks.filter(bank => bank.id !== bankId));
      } else {
        throw new Error('Failed to disconnect bank account');
      }
    } catch (error) {
      console.error('Error disconnecting bank:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Connected Banks</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Connect Bank
            </Button>
          </Box>

          <Grid container spacing={2}>
            {connectedBanks.map((bank) => (
              <Grid item xs={12} key={bank.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center">
                        <BankIcon sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1">{bank.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last synced: {new Date(bank.lastSync).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => handleDisconnectBank(bank.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Connect Your Bank</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            We use Plaid to securely connect your bank accounts. Your credentials are never stored.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConnectBank}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BankConnection; 