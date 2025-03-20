import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Nature,
  Savings,
  LocalAtm,
  TrendingUp,
  Add as AddIcon,
} from '@mui/icons-material';

interface SustainableGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  carbonImpact: number; // in kg CO2
  category: 'investment' | 'savings' | 'spending';
  deadline: string;
}

const SustainableFinance: React.FC = () => {
  const [goals, setGoals] = useState<SustainableGoal[]>([
    {
      id: '1',
      title: 'ESG Investment Portfolio',
      description: 'Build a sustainable investment portfolio focusing on environmental, social, and governance factors',
      targetAmount: 10000,
      currentAmount: 5000,
      carbonImpact: 500,
      category: 'investment',
      deadline: '2024-12-31',
    },
    {
      id: '2',
      title: 'Green Home Improvements',
      description: 'Save for energy-efficient home upgrades',
      targetAmount: 5000,
      currentAmount: 2000,
      carbonImpact: 1000,
      category: 'savings',
      deadline: '2024-06-30',
    },
  ]);
  const [openAddGoal, setOpenAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<SustainableGoal>>({});

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.description && newGoal.targetAmount && newGoal.category) {
      const goal: SustainableGoal = {
        id: Date.now().toString(),
        title: newGoal.title!,
        description: newGoal.description!,
        targetAmount: newGoal.targetAmount!,
        currentAmount: 0,
        carbonImpact: newGoal.carbonImpact || 0,
        category: newGoal.category!,
        deadline: newGoal.deadline || new Date().toISOString().split('T')[0],
      };
      setGoals([...goals, goal]);
      setNewGoal({});
      setOpenAddGoal(false);
    }
  };

  const getCategoryIcon = (category: SustainableGoal['category']) => {
    switch (category) {
      case 'investment':
        return <TrendingUp color="success" />;
      case 'savings':
        return <Savings color="primary" />;
      case 'spending':
        return <LocalAtm color="warning" />;
      default:
        return <Nature />;
    }
  };

  const calculateTotalCarbonImpact = () => {
    return goals.reduce((total, goal) => total + goal.carbonImpact, 0);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <Nature sx={{ mr: 1, color: 'success.main' }} />
          <Typography variant="h5">Sustainable Finance</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddGoal(true)}
        >
          Add Sustainable Goal
        </Button>
      </Box>

      {/* Carbon Impact Summary */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Total Carbon Impact
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h4" color="success.main">
            {calculateTotalCarbonImpact()} kg CO2
          </Typography>
          <Typography variant="body2" color="text.secondary">
            equivalent saved through sustainable financial decisions
          </Typography>
        </Box>
      </Paper>

      {/* Sustainable Goals */}
      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} md={6} key={goal.id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {getCategoryIcon(goal.category)}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {goal.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {goal.description}
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2" gutterBottom>
                    Progress: ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(goal.currentAmount / goal.targetAmount) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="success.main">
                    {goal.carbonImpact} kg CO2 impact
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Goal Dialog */}
      <Dialog open={openAddGoal} onClose={() => setOpenAddGoal(false)}>
        <DialogTitle>Add Sustainable Financial Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Goal Title"
            fullWidth
            value={newGoal.title || ''}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newGoal.description || ''}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Target Amount"
            type="number"
            fullWidth
            value={newGoal.targetAmount || ''}
            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Carbon Impact (kg CO2)"
            type="number"
            fullWidth
            value={newGoal.carbonImpact || ''}
            onChange={(e) => setNewGoal({ ...newGoal, carbonImpact: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Category"
            select
            fullWidth
            value={newGoal.category || ''}
            onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as SustainableGoal['category'] })}
          >
            <option value="investment">Investment</option>
            <option value="savings">Savings</option>
            <option value="spending">Spending</option>
          </TextField>
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newGoal.deadline || ''}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddGoal(false)}>Cancel</Button>
          <Button onClick={handleAddGoal} variant="contained" color="primary">
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SustainableFinance; 