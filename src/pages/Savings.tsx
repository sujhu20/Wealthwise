import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface SavingsGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

const initialGoals: SavingsGoal[] = [
  {
    id: 1,
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 5000,
    deadline: '2024-12-31',
    category: 'Emergency',
  },
  {
    id: 2,
    name: 'Vacation',
    targetAmount: 5000,
    currentAmount: 2000,
    deadline: '2024-08-31',
    category: 'Travel',
  },
  {
    id: 3,
    name: 'New Car',
    targetAmount: 25000,
    currentAmount: 5000,
    deadline: '2025-12-31',
    category: 'Vehicle',
  },
];

const categories = [
  'Emergency',
  'Travel',
  'Vehicle',
  'Home',
  'Education',
  'Retirement',
  'Other',
];

const Savings = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialGoals);
  const [open, setOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: '',
  });

  const handleOpen = (goal?: SavingsGoal) => {
    if (goal) {
      setEditingGoal(goal);
      setFormData({
        name: goal.name,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        deadline: goal.deadline,
        category: goal.category,
      });
    } else {
      setEditingGoal(null);
      setFormData({
        name: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
        category: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingGoal(null);
  };

  const handleSubmit = () => {
    if (editingGoal) {
      setGoals(
        goals.map((goal) =>
          goal.id === editingGoal.id
            ? {
                ...goal,
                name: formData.name,
                targetAmount: parseFloat(formData.targetAmount),
                currentAmount: parseFloat(formData.currentAmount),
                deadline: formData.deadline,
                category: formData.category,
              }
            : goal
        )
      );
    } else {
      setGoals([
        ...goals,
        {
          id: goals.length + 1,
          name: formData.name,
          targetAmount: parseFloat(formData.targetAmount),
          currentAmount: parseFloat(formData.currentAmount),
          deadline: formData.deadline,
          category: formData.category,
        },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Savings Goals
      </Typography>

      <Grid container spacing={3}>
        {/* Savings Overview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Savings Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Total Savings</Typography>
                <Typography variant="h5">
                  ${goals.reduce((sum, goal) => sum + goal.currentAmount, 0).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Total Goals</Typography>
                <Typography variant="h5">
                  ${goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">Overall Progress</Typography>
                <Typography variant="h5">
                  {(
                    (goals.reduce((sum, goal) => sum + goal.currentAmount, 0) /
                      goals.reduce((sum, goal) => sum + goal.targetAmount, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Add Goal Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Add New Savings Goal
          </Button>
        </Grid>

        {/* Savings Goals Cards */}
        {goals.map((goal) => (
          <Grid item xs={12} md={6} key={goal.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{goal.name}</Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(goal)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(goal.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  Category: {goal.category}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Target: ${goal.targetAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Current: ${goal.currentAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Deadline: {goal.deadline}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(goal.currentAmount, goal.targetAmount)}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(1)}% Complete
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Goal Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingGoal ? 'Edit Savings Goal' : 'Add New Savings Goal'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Goal Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Target Amount"
                type="number"
                value={formData.targetAmount}
                onChange={(e) =>
                  setFormData({ ...formData, targetAmount: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Amount"
                type="number"
                value={formData.currentAmount}
                onChange={(e) =>
                  setFormData({ ...formData, currentAmount: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingGoal ? 'Save Changes' : 'Add Goal'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Savings; 