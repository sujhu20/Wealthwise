import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Tabs,
  Tab,
  Paper,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Eco as EcoIcon,
  TrendingUp as TrendingUpIcon,
  Info as InfoIcon,
  Add as AddIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import InvestmentFilters from './InvestmentFilters';
import InvestmentAnalytics from './InvestmentAnalytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const SustainableInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    amount: '',
    category: 'renewable_energy',
    esgScore: 0,
  });
  const [totalImpact, setTotalImpact] = useState({
    carbonReduction: 0,
    waterSaved: 0,
    treesPlanted: 0,
  });
  const [performanceData, setPerformanceData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [insights, setInsights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [performanceRange, setPerformanceRange] = useState([-100, 100]);
  const [impactScoreRange, setImpactScoreRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchInvestments();
    fetchImpact();
    fetchPerformanceData();
    fetchInsights();
  }, []);

  const fetchInvestments = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/investments/sustainable`);
      if (response.ok) {
        const data = await response.json();
        setInvestments(data);
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
    }
  };

  const fetchImpact = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/investments/impact`);
      if (response.ok) {
        const data = await response.json();
        setTotalImpact(data);
      }
    } catch (error) {
      console.error('Error fetching impact:', error);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/investments/performance`);
      if (response.ok) {
        const data = await response.json();
        setPerformanceData({
          labels: data.labels,
          datasets: [
            {
              label: 'Portfolio Value',
              data: data.values,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/investments/insights`);
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  const handleCreateInvestment = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/investments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvestment),
      });

      if (response.ok) {
        fetchInvestments();
        fetchImpact();
        setOpenDialog(false);
        setNewInvestment({
          name: '',
          amount: '',
          category: 'renewable_energy',
          esgScore: 0,
        });
      }
    } catch (error) {
      console.error('Error creating investment:', error);
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'renewable_energy':
        return 'Renewable Energy';
      case 'clean_water':
        return 'Clean Water';
      case 'sustainable_agriculture':
        return 'Sustainable Agriculture';
      case 'green_buildings':
        return 'Green Buildings';
      default:
        return category;
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredInvestments = investments.filter(investment => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(investment.category);
    const matchesSearch = investment.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPerformance = investment.performance >= performanceRange[0] && investment.performance <= performanceRange[1];
    const matchesImpactScore = investment.impactScore >= impactScoreRange[0] && investment.impactScore <= impactScoreRange[1];
    
    return matchesCategory && matchesSearch && matchesPerformance && matchesImpactScore;
  });

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Sustainable Investments</Typography>
          <Box>
            <Tooltip title="View Investment Insights">
              <IconButton onClick={() => setSelectedTab(2)}>
                <AssessmentIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{ ml: 1 }}
            >
              New Investment
            </Button>
          </Box>
        </Box>

        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Overview" icon={<TimelineIcon />} />
          <Tab label="Performance" icon={<TrendingUpIcon />} />
          <Tab label="Insights" icon={<AssessmentIcon />} />
        </Tabs>

        {selectedTab === 0 && (
          <>
            <Grid container spacing={2} mb={4}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <EcoIcon color="success" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Carbon Reduction</Typography>
                    </Box>
                    <Typography variant="h4">
                      {totalImpact.carbonReduction.toFixed(1)} tons
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      CO2 equivalent reduced
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <EcoIcon color="info" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Water Saved</Typography>
                    </Box>
                    <Typography variant="h4">
                      {totalImpact.waterSaved.toFixed(1)}k L
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Water conserved
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <EcoIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">Trees Planted</Typography>
                    </Box>
                    <Typography variant="h4">
                      {totalImpact.treesPlanted.toFixed(0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Equivalent trees planted
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {investments.map((investment) => (
                <Grid item xs={12} key={investment._id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box>
                          <Typography variant="subtitle1">{investment.name}</Typography>
                          <Chip
                            label={getCategoryLabel(investment.category)}
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Rating
                            value={investment.esgScore / 20}
                            readOnly
                            precision={0.5}
                            sx={{ mr: 2 }}
                          />
                          <Typography variant="h6">
                            ${investment.amount.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={investment.performance}
                        sx={{ mb: 1 }}
                      />
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Performance: {investment.performance}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Impact Score: {investment.impactScore}/100
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {selectedTab === 1 && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Line options={chartOptions} data={performanceData} />
          </Paper>
        )}

        {selectedTab === 2 && (
          <Grid container spacing={2}>
            {insights.map((insight, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <InfoIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">{insight.title}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {insight.description}
                    </Typography>
                    {insight.recommendation && (
                      <Box mt={2}>
                        <Typography variant="subtitle2" color="primary">
                          Recommendation:
                        </Typography>
                        <Typography variant="body2">
                          {insight.recommendation}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>New Sustainable Investment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Investment Name"
            fullWidth
            value={newInvestment.name}
            onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newInvestment.amount}
            onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={newInvestment.category}
              label="Category"
              onChange={(e) => setNewInvestment({ ...newInvestment, category: e.target.value })}
            >
              <MenuItem value="renewable_energy">Renewable Energy</MenuItem>
              <MenuItem value="clean_water">Clean Water</MenuItem>
              <MenuItem value="sustainable_agriculture">Sustainable Agriculture</MenuItem>
              <MenuItem value="green_buildings">Green Buildings</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Typography component="legend">ESG Score</Typography>
            <Rating
              value={newInvestment.esgScore / 20}
              onChange={(event, newValue) => {
                setNewInvestment({ ...newInvestment, esgScore: newValue * 20 });
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateInvestment} variant="contained">
            Create Investment
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SustainableInvestments; 