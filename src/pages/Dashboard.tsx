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
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import BankingServices from '../components/BankingServices';
import AIFinancialInsights from '../components/AIFinancialInsights';
import SustainableFinance from '../components/SustainableFinance';
import FinancialGamification from '../components/FinancialGamification';

interface DataPoint {
  name: string;
  income: number;
  expenses: number;
}

interface Transaction {
  description: string;
  amount: number;
}

interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  chartData: DataPoint[];
  recentTransactions: Transaction[];
}

const data: DataPoint[] = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Apr', income: 2780, expenses: 3908 },
  { name: 'May', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsRate: 0,
    chartData: [],
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        setDashboardData({
          totalBalance: 12345,
          monthlyIncome: 4500,
          monthlyExpenses: 3200,
          savingsRate: 28.9,
          chartData: data,
          recentTransactions: [
            { description: 'Groceries', amount: 150 },
            { description: 'Utility Bill', amount: 85 },
            { description: 'Salary Deposit', amount: 4500 },
            { description: 'Entertainment', amount: 75 },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
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
    <Box>
      <Typography variant="h4" gutterBottom>
        Financial Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Balance
              </Typography>
              <Typography variant="h5">${dashboardData.totalBalance.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Income
              </Typography>
              <Typography variant="h5">${dashboardData.monthlyIncome.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Expenses
              </Typography>
              <Typography variant="h5">${dashboardData.monthlyExpenses.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Savings Rate
              </Typography>
              <Typography variant="h5">{dashboardData.savingsRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Financial Insights */}
        <Grid item xs={12}>
          <AIFinancialInsights />
        </Grid>

        {/* Sustainable Finance */}
        <Grid item xs={12}>
          <SustainableFinance />
        </Grid>

        {/* Financial Gamification */}
        <Grid item xs={12}>
          <FinancialGamification />
        </Grid>

        {/* Banking Services */}
        <Grid item xs={12}>
          <BankingServices />
        </Grid>

        {/* Charts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Income vs Expenses
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#8884d8"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#82ca9d"
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Financial Tips */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Financial Tips
            </Typography>
            <Typography variant="body1" paragraph>
              • Create a monthly budget and stick to it
            </Typography>
            <Typography variant="body1" paragraph>
              • Build an emergency fund with 3-6 months of expenses
            </Typography>
            <Typography variant="body1" paragraph>
              • Pay off high-interest debt first
            </Typography>
            <Typography variant="body1" paragraph>
              • Invest in your retirement early
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            {dashboardData.recentTransactions.map((transaction: Transaction, index: number) => (
              <Typography key={index} variant="body1" paragraph>
                • {transaction.description} - ${transaction.amount.toLocaleString()}
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 