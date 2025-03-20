import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface BudgetItem {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
}

const initialBudget: BudgetItem[] = [
  { category: 'Housing', allocated: 2000, spent: 1800, remaining: 200 },
  { category: 'Food', allocated: 500, spent: 450, remaining: 50 },
  { category: 'Transportation', allocated: 300, spent: 250, remaining: 50 },
  { category: 'Utilities', allocated: 200, spent: 180, remaining: 20 },
  { category: 'Entertainment', allocated: 200, spent: 150, remaining: 50 },
  { category: 'Savings', allocated: 1000, spent: 0, remaining: 1000 },
];

const Budget = () => {
  const [budget, setBudget] = useState<BudgetItem[]>(initialBudget);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleAddCategory = () => {
    if (newCategory && newAmount) {
      const amount = parseFloat(newAmount);
      setBudget([
        ...budget,
        {
          category: newCategory,
          allocated: amount,
          spent: 0,
          remaining: amount,
        },
      ]);
      setNewCategory('');
      setNewAmount('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Budget Planning
      </Typography>

      <Grid container spacing={3}>
        {/* Budget Overview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Budget Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Total Budget</Typography>
                <Typography variant="h5">
                  ${budget.reduce((sum, item) => sum + item.allocated, 0)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Total Spent</Typography>
                <Typography variant="h5">
                  ${budget.reduce((sum, item) => sum + item.spent, 0)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Total Remaining</Typography>
                <Typography variant="h5">
                  ${budget.reduce((sum, item) => sum + item.remaining, 0)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Add New Category */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add New Category
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Category Name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Allocated Amount"
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddCategory}
                  disabled={!newCategory || !newAmount}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Budget Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Allocated</TableCell>
                  <TableCell align="right">Spent</TableCell>
                  <TableCell align="right">Remaining</TableCell>
                  <TableCell align="right">Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budget.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell component="th" scope="row">
                      {item.category}
                    </TableCell>
                    <TableCell align="right">${item.allocated}</TableCell>
                    <TableCell align="right">${item.spent}</TableCell>
                    <TableCell align="right">${item.remaining}</TableCell>
                    <TableCell align="right">
                      <Slider
                        value={(item.spent / item.allocated) * 100}
                        disabled
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Budget Tips */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Budgeting Tips
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Smart Budgeting Strategies
                </Typography>
                <Typography variant="body2" paragraph>
                  • Use the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings
                </Typography>
                <Typography variant="body2" paragraph>
                  • Track your spending regularly
                </Typography>
                <Typography variant="body2" paragraph>
                  • Set realistic goals
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Common Pitfalls to Avoid
                </Typography>
                <Typography variant="body2" paragraph>
                  • Not accounting for irregular expenses
                </Typography>
                <Typography variant="body2" paragraph>
                  • Setting unrealistic budgets
                </Typography>
                <Typography variant="body2" paragraph>
                  • Not adjusting the budget as circumstances change
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Budget; 