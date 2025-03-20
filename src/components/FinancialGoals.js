import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  Savings as SavingsIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const FinancialGoals = () => {
  const [goals, setGoals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    type: 'savings',
  });
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetchGoals();
    fetchPoints();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/goals`);
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const fetchPoints = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/gamification/points`);
      if (response.ok) {
        const data = await response.json();
        setPoints(data.points);
      }
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const handleCreateGoal = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });

      if (response.ok) {
        fetchGoals();
        setOpenDialog(false);
        setNewGoal({
          name: '',
          targetAmount: '',
          currentAmount: '0',
          deadline: '',
          type: 'savings',
        });
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const getGoalIcon = (type) => {
    switch (type) {
      case 'savings':
        return <SavingsIcon />;
      case 'investment':
        return <TrendingUpIcon />;
      case 'debt':
        return <TimelineIcon />;
      default:
        return <SavingsIcon />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Financial Goals</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              icon={<TrophyIcon />}
              label={`${points} points`}
              color="primary"
              variant="outlined"
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              New Goal
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {goals.map((goal) => (
            <Grid item xs={12} md={6} key={goal._id}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    {getGoalIcon(goal.type)}
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                      {goal.name}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(goal.currentAmount / goal.targetAmount) * 100}
                    sx={{ mb: 1 }}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due: {new Date(goal.deadline).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Financial Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Goal Name"
            fullWidth
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Target Amount"
            type="number"
            fullWidth
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Goal Type</InputLabel>
            <Select
              value={newGoal.type}
              label="Goal Type"
              onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
            >
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="investment">Investment</MenuItem>
              <MenuItem value="debt">Debt Repayment</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateGoal} variant="contained">
            Create Goal
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default FinancialGoals; 