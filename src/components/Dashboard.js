import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  useTheme,
  alpha,
  Button,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  AccountBalance as AccountBalanceIcon,
  SwapHoriz as SwapHorizIcon,
  Savings as SavingsIcon,
  TrendingUp as TrendingUpIcon,
  InfoOutlined as InfoIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import BankingServices from '../components/BankingServices';
import AIFinancialInsights from '../components/AIFinancialInsights';
import SustainableFinance from '../components/SustainableFinance';
import FinancialGamification from '../components/FinancialGamification';
import BankConnection from './BankConnection';

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    balance: 0,
    transactions: [],
    savings: 0,
    investments: 0,
    expensesByCategory: [],
    recentActivity: []
  });

  // Animation styles
  const fadeInAnimation = {
    opacity: 0,
    animation: 'fadeIn 0.5s ease-in-out forwards',
    '@keyframes fadeIn': {
      '0%': { opacity: 0, transform: 'translateY(10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    }
  };
  
  // Function to refresh dashboard data
  const refreshData = () => {
    setLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  // Simulated data fetch
  const fetchData = async () => {
    try {
      // Simulate API delay
      setTimeout(() => {
        // Replace with actual API call
        const mockData = {
          balance: 50000,
          transactions: [
            { date: 'Jan', amount: 4000, income: 6000, expenses: 2000 },
            { date: 'Feb', amount: 3000, income: 5500, expenses: 2500 },
            { date: 'Mar', amount: 5000, income: 7000, expenses: 2000 },
            { date: 'Apr', amount: 4500, income: 6800, expenses: 2300 },
            { date: 'May', amount: 6000, income: 8000, expenses: 2000 },
            { date: 'Jun', amount: 5500, income: 7500, expenses: 2000 },
          ],
          savings: 20000,
          investments: 30000,
          expensesByCategory: [
            { name: 'Housing', value: 1200, color: theme.palette.primary.main },
            { name: 'Food', value: 600, color: theme.palette.secondary.main },
            { name: 'Transportation', value: 400, color: theme.palette.success.main },
            { name: 'Entertainment', value: 300, color: theme.palette.warning.main },
            { name: 'Utilities', value: 250, color: theme.palette.error.main },
            { name: 'Other', value: 350, color: theme.palette.info.main },
          ],
          recentActivity: [
            { id: 1, type: 'expense', amount: 45.99, description: 'Grocery Shopping', date: 'Today', category: 'Food' },
            { id: 2, type: 'income', amount: 2500, description: 'Salary Deposit', date: 'Yesterday', category: 'Income' },
            { id: 3, type: 'expense', amount: 9.99, description: 'Streaming Subscription', date: '3 days ago', category: 'Entertainment' },
            { id: 4, type: 'expense', amount: 35.50, description: 'Gas Station', date: '4 days ago', category: 'Transportation' },
          ]
        };
        setDashboardData(mockData);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <Card
      sx={{
        height: '100%',
        background: theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`
          : `linear-gradient(135deg, ${alpha(color, 0.2)} 0%, ${alpha(color, 0.1)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(color, 0.2)}`,
        borderRadius: 2,
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[4],
        },
        ...fadeInAnimation,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              ${value.toLocaleString()}
            </Typography>
            {change && (
              <Chip
                icon={change > 0 ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />}
                label={`${change > 0 ? '+' : ''}${change}%`}
                size="small"
                color={change > 0 ? 'success' : 'error'}
                sx={{ height: 24 }}
              />
            )}
          </Box>
          <Box 
            sx={{
              backgroundColor: alpha(color, 0.15),
              borderRadius: '50%',
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${alpha(color, 0.3)}`,
            }}
          >
            <Icon sx={{ fontSize: 30, color: color }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Dashboard Overview
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon />}
          onClick={refreshData}
          sx={{
            borderRadius: 8,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }
          }}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Balance"
            value={dashboardData.balance}
            icon={AccountBalanceIcon}
            color={theme.palette.primary.main}
            change={5.2}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Monthly Transactions"
            value={dashboardData.transactions.reduce((acc, curr) => acc + curr.amount, 0)}
            icon={SwapHorizIcon}
            color={theme.palette.success.main}
            change={-2.1}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Savings"
            value={dashboardData.savings}
            icon={SavingsIcon}
            color={theme.palette.info.main}
            change={3.8}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Investments"
            value={dashboardData.investments}
            icon={TrendingUpIcon}
            color={theme.palette.warning.main}
            change={7.4}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 3,
              background: theme.palette.mode === 'light' 
                ? 'linear-gradient(145deg, #ffffff, #f5f7fa)'
                : 'linear-gradient(145deg, #1e293b, #0f172a)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 2,
              height: '100%',
              boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 8 : 2],
              ...fadeInAnimation,
              animationDelay: '0.1s'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" gutterBottom>
                Income vs. Expenses
              </Typography>
              <Tooltip title="Monthly comparison of income and expenses">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData.transactions}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                  <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <ChartTooltip
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: 8,
                      boxShadow: theme.shadows[3]
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    name="Income"
                    stroke={theme.palette.success.main}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke={theme.palette.error.main}
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              background: theme.palette.mode === 'light' 
                ? 'linear-gradient(145deg, #ffffff, #f5f7fa)'
                : 'linear-gradient(145deg, #1e293b, #0f172a)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 2,
              height: '100%',
              boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 8 : 2],
              ...fadeInAnimation,
              animationDelay: '0.2s'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">
                Expense Breakdown
              </Typography>
              <Tooltip title="Distribution of expenses by category">
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box height={250} display="flex" alignItems="center" justifyContent="center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {dashboardData.expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                      borderRadius: 8,
                      boxShadow: theme.shadows[3]
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2}>
              <Grid container spacing={1}>
                {dashboardData.expensesByCategory.map((category) => (
                  <Grid item xs={6} key={category.name}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: category.color,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {category.name}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card
            sx={{
              p: 3,
              background: theme.palette.mode === 'light' 
                ? 'linear-gradient(145deg, #ffffff, #f5f7fa)'
                : 'linear-gradient(145deg, #1e293b, #0f172a)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 2,
              boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 8 : 2],
              ...fadeInAnimation,
              animationDelay: '0.3s'
            }}
          >
            <Typography variant="h6" mb={3}>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {dashboardData.recentActivity.map((activity, index) => (
              <Box key={activity.id}>
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center" 
                  py={1.5}
                  sx={{
                    animation: 'fadeIn 0.5s ease-out forwards',
                    animationDelay: `${0.1 + index * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: alpha(
                          activity.type === 'income' ? theme.palette.success.main : theme.palette.error.main,
                          0.1
                        ),
                        color: activity.type === 'income' ? theme.palette.success.main : theme.palette.error.main,
                      }}
                    >
                      {activity.type === 'income' ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">{activity.description}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.date} • {activity.category}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography 
                    variant="subtitle1" 
                    color={activity.type === 'income' ? 'success.main' : 'error.main'}
                    fontWeight={600}
                  >
                    {activity.type === 'income' ? '+' : '-'}${activity.amount}
                  </Typography>
                </Box>
                {index < dashboardData.recentActivity.length - 1 && <Divider />}
              </Box>
            ))}
            <Box display="flex" justifyContent="center" mt={2}>
              <Button 
                variant="outlined" 
                onClick={() => console.log('View all transactions')}
                sx={{ 
                  borderRadius: 8,
                  px: 3,
                  mt: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }
                }}
              >
                View All Transactions
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 