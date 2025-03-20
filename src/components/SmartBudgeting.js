import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const SmartBudgeting = () => {
  const [budgets, setBudgets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newBudget, setNewBudget] = useState('');

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/budget/smart-budgets`);
      if (response.ok) {
        const data = await response.json();
        setBudgets(data);
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const handleUpdateBudget = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/budget/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          amount: parseFloat(newBudget),
        }),
      });

      if (response.ok) {
        fetchBudgets();
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Smart Budgeting</Typography>
          <Tooltip title="AI-powered budget recommendations based on your spending patterns">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Grid container spacing={2}>
          {budgets.map((budget) => (
            <Grid item xs={12} key={budget.category}>
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">{budget.category}</Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedCategory(budget.category);
                        setNewBudget(budget.amount.toString());
                        setOpenDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <Chip
                      icon={budget.trend > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      label={`${Math.abs(budget.trend)}% vs last month`}
                      color={budget.trend > 0 ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(budget.spent / budget.amount) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: budget.spent > budget.amount ? 'error.main' : 'primary.main',
                    },
                  }}
                />
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2" color="text.secondary">
                    ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {budget.remainingDays} days remaining
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Budget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Budget Amount"
            type="number"
            fullWidth
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateBudget} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SmartBudgeting; 