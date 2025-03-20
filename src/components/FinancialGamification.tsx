import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  EmojiEvents,
  School,
  VolunteerActivism,
  TrendingUp,
  Add as AddIcon,
  Star,
  Group,
} from '@mui/icons-material';

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'education' | 'savings' | 'investment' | 'social';
  progress: number;
  total: number;
  icon: string;
  rewards: string[];
}

interface SocialImpact {
  id: string;
  title: string;
  description: string;
  impact: number;
  category: 'education' | 'environment' | 'community' | 'health';
  participants: number;
  status: 'active' | 'completed';
  deadline: string;
}

const FinancialGamification: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Investment Guru',
      description: 'Complete 5 investment courses and make your first investment',
      points: 1000,
      category: 'education',
      progress: 3,
      total: 5,
      icon: '🎓',
      rewards: ['Premium Course Access', 'Investment Consultation'],
    },
    {
      id: '2',
      title: 'Savings Champion',
      description: 'Save 20% of your income for 3 consecutive months',
      points: 800,
      category: 'savings',
      progress: 2,
      total: 3,
      icon: '💰',
      rewards: ['Savings Rate Boost', 'Financial Planning Session'],
    },
  ]);

  const [socialImpacts, setSocialImpacts] = useState<SocialImpact[]>([
    {
      id: '1',
      title: 'Financial Literacy Workshop',
      description: 'Teach basic financial concepts to underprivileged youth',
      impact: 50,
      category: 'education',
      participants: 25,
      status: 'active',
      deadline: '2024-04-30',
    },
    {
      id: '2',
      title: 'Green Investment Initiative',
      description: 'Invest in sustainable projects and track environmental impact',
      impact: 100,
      category: 'environment',
      participants: 45,
      status: 'active',
      deadline: '2024-06-30',
    },
  ]);

  const [openAchievement, setOpenAchievement] = useState(false);
  const [openImpact, setOpenImpact] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>({});
  const [newImpact, setNewImpact] = useState<Partial<SocialImpact>>({});

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.points) {
      const achievement: Achievement = {
        id: Date.now().toString(),
        title: newAchievement.title!,
        description: newAchievement.description!,
        points: newAchievement.points!,
        category: newAchievement.category || 'education',
        progress: 0,
        total: newAchievement.total || 1,
        icon: newAchievement.icon || '🎯',
        rewards: newAchievement.rewards || [],
      };
      setAchievements([...achievements, achievement]);
      setNewAchievement({});
      setOpenAchievement(false);
    }
  };

  const handleAddImpact = () => {
    if (newImpact.title && newImpact.description && newImpact.category) {
      const impact: SocialImpact = {
        id: Date.now().toString(),
        title: newImpact.title!,
        description: newImpact.description!,
        impact: newImpact.impact || 0,
        category: newImpact.category!,
        participants: 0,
        status: 'active',
        deadline: newImpact.deadline || new Date().toISOString().split('T')[0],
      };
      setSocialImpacts([...socialImpacts, impact]);
      setNewImpact({});
      setOpenImpact(false);
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'education':
        return <School color="primary" />;
      case 'savings':
        return <TrendingUp color="success" />;
      case 'investment':
        return <EmojiEvents color="warning" />;
      case 'social':
        return <VolunteerActivism color="error" />;
      default:
        return <Star />;
    }
  };

  const calculateTotalPoints = () => {
    return achievements.reduce((total, achievement) => {
      const progress = (achievement.progress / achievement.total) * 100;
      return total + (progress * achievement.points) / 100;
    }, 0);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <EmojiEvents sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5">Financial Gamification</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAchievement(true)}
            sx={{ mr: 1 }}
          >
            Add Achievement
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Group />}
            onClick={() => setOpenImpact(true)}
          >
            Create Impact
          </Button>
        </Box>
      </Box>

      {/* Points Summary */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Your Progress
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h4" color="primary">
            {Math.round(calculateTotalPoints())} Points
          </Typography>
          <Typography variant="body2" color="text.secondary">
            earned through financial achievements
          </Typography>
        </Box>
      </Paper>

      {/* Achievements */}
      <Grid container spacing={3}>
        {achievements.map((achievement) => (
          <Grid item xs={12} md={6} key={achievement.id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {achievement.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{achievement.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
                    </Typography>
                  </Box>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" gutterBottom>
                    Progress: {achievement.progress}/{achievement.total}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(achievement.progress / achievement.total) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="primary">
                    {achievement.points} points
                  </Typography>
                  <Box>
                    {achievement.rewards.map((reward, index) => (
                      <Chip
                        key={index}
                        label={reward}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Social Impact */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Social Impact Initiatives
      </Typography>
      <Grid container spacing={3}>
        {socialImpacts.map((impact) => (
          <Grid item xs={12} md={6} key={impact.id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {getCategoryIcon(impact.category as Achievement['category'])}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {impact.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {impact.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="success.main">
                      {impact.impact} lives impacted
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {impact.participants} participants
                    </Typography>
                  </Box>
                  <Chip
                    label={impact.status}
                    color={impact.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Deadline: {new Date(impact.deadline).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Achievement Dialog */}
      <Dialog open={openAchievement} onClose={() => setOpenAchievement(false)}>
        <DialogTitle>Add Achievement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newAchievement.title || ''}
            onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newAchievement.description || ''}
            onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Points"
            type="number"
            fullWidth
            value={newAchievement.points || ''}
            onChange={(e) => setNewAchievement({ ...newAchievement, points: parseInt(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Category"
            select
            fullWidth
            value={newAchievement.category || ''}
            onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value as Achievement['category'] })}
          >
            <option value="education">Education</option>
            <option value="savings">Savings</option>
            <option value="investment">Investment</option>
            <option value="social">Social</option>
          </TextField>
          <TextField
            margin="dense"
            label="Total Steps"
            type="number"
            fullWidth
            value={newAchievement.total || ''}
            onChange={(e) => setNewAchievement({ ...newAchievement, total: parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAchievement(false)}>Cancel</Button>
          <Button onClick={handleAddAchievement} variant="contained" color="primary">
            Add Achievement
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Impact Dialog */}
      <Dialog open={openImpact} onClose={() => setOpenImpact(false)}>
        <DialogTitle>Create Social Impact Initiative</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newImpact.title || ''}
            onChange={(e) => setNewImpact({ ...newImpact, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newImpact.description || ''}
            onChange={(e) => setNewImpact({ ...newImpact, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Category"
            select
            fullWidth
            value={newImpact.category || ''}
            onChange={(e) => setNewImpact({ ...newImpact, category: e.target.value as SocialImpact['category'] })}
          >
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="community">Community</option>
            <option value="health">Health</option>
          </TextField>
          <TextField
            margin="dense"
            label="Target Impact"
            type="number"
            fullWidth
            value={newImpact.impact || ''}
            onChange={(e) => setNewImpact({ ...newImpact, impact: parseInt(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newImpact.deadline || ''}
            onChange={(e) => setNewImpact({ ...newImpact, deadline: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImpact(false)}>Cancel</Button>
          <Button onClick={handleAddImpact} variant="contained" color="primary">
            Create Initiative
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinancialGamification; 