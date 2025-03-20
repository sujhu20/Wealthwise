import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
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
  BarChart,
  Bar,
} from 'recharts';

const InvestmentAnalytics = ({ investments = [], isLoading }) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  // Calculate summary metrics
  const totalInvestments = investments.length;
  const totalValue = investments.reduce((sum, inv) => sum + (inv.value || 0), 0);
  const avgPerformance = totalInvestments > 0 
    ? investments.reduce((sum, inv) => sum + (inv.performance || 0), 0) / totalInvestments 
    : 0;
  const avgImpactScore = totalInvestments > 0
    ? investments.reduce((sum, inv) => sum + (inv.impactScore || 0), 0) / totalInvestments
    : 0;

  // Prepare data for performance chart
  const performanceData = investments.map((inv, index) => ({
    id: inv.id || index,
    name: inv.name || 'Unnamed',
    performance: inv.performance || 0,
    impactScore: inv.impactScore || 0
  }));

  // Show a message when no investments exist
  if (totalInvestments === 0) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Investment Analytics
        </Typography>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No investment data available. Add investments to see analytics.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const ChartComponent = totalInvestments === 1 ? BarChart : LineChart;
  const DataComponent = totalInvestments === 1 ? Bar : Line;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Investment Analytics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Investments
              </Typography>
              <Typography variant="h4">{totalInvestments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Value
              </Typography>
              <Typography variant="h4">${totalValue.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg Performance
              </Typography>
              <Typography variant="h4">{avgPerformance.toFixed(2)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg Impact Score
              </Typography>
              <Typography variant="h4">{avgImpactScore.toFixed(1)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Performance Overview
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <ChartComponent data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              yAxisId="left" 
              domain={[0, 'auto']} 
              label={{ value: 'Performance %', angle: -90, position: 'insideLeft' }} 
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={[0, 10]} 
              label={{ value: 'Impact Score', angle: 90, position: 'insideRight' }} 
            />
            <Tooltip />
            <Legend />
            {totalInvestments === 1 ? (
              <>
                <Bar
                  yAxisId="left"
                  dataKey="performance"
                  fill="#2196f3"
                  name="Performance %"
                />
                <Bar
                  yAxisId="right"
                  dataKey="impactScore"
                  fill="#f50057"
                  name="Impact Score"
                />
              </>
            ) : (
              <>
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="performance"
                  stroke="#2196f3"
                  name="Performance %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="impactScore"
                  stroke="#f50057"
                  name="Impact Score"
                />
              </>
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default InvestmentAnalytics;