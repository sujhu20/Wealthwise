import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  Savings,
  AccountBalance,
  Psychology,
} from '@mui/icons-material';

interface FinancialInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert';
  category: 'spending' | 'saving' | 'investment' | 'risk';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionItems: string[];
  timeframe: string;
}

const AIFinancialInsights: React.FC = () => {
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateAIInsights = async () => {
      try {
        // Simulated AI analysis
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock AI-generated insights
        setInsights([
          {
            id: '1',
            type: 'prediction',
            category: 'spending',
            title: 'Spending Pattern Analysis',
            description: "Based on your current spending habits, you're likely to exceed your monthly budget by 15% in the next 30 days.",
            confidence: 85,
            impact: 'high',
            actionItems: [
              'Review entertainment subscriptions',
              'Consider meal planning to reduce food expenses',
              'Set up spending alerts for non-essential categories'
            ],
            timeframe: 'Next 30 days'
          },
          {
            id: '2',
            type: 'recommendation',
            category: 'investment',
            title: 'Investment Opportunity',
            description: 'Your current savings rate suggests you could benefit from diversifying your portfolio with sustainable investments.',
            confidence: 92,
            impact: 'medium',
            actionItems: [
              'Research ESG investment funds',
              'Consider reallocating 10% of savings to sustainable bonds',
              'Review current investment strategy'
            ],
            timeframe: 'Next 3 months'
          },
          {
            id: '3',
            type: 'alert',
            category: 'risk',
            title: 'Financial Health Alert',
            description: 'Your emergency fund is below the recommended 6-month threshold. Consider increasing your savings rate.',
            confidence: 95,
            impact: 'high',
            actionItems: [
              'Set up automatic savings transfers',
              'Review and reduce non-essential expenses',
              'Create a savings goal for emergency fund'
            ],
            timeframe: 'Immediate action needed'
          }
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to generate financial insights');
        setLoading(false);
      }
    };

    generateAIInsights();
  }, []);

  const getInsightIcon = (type: FinancialInsight['type']) => {
    switch (type) {
      case 'prediction':
        return <TrendingUp color="primary" />;
      case 'recommendation':
        return <Psychology color="success" />;
      case 'alert':
        return <Warning color="error" />;
      default:
        return <AccountBalance />;
    }
  };

  const getImpactColor = (impact: FinancialInsight['impact']) => {
    switch (impact) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
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
    <Paper sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Psychology sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h5">AI Financial Insights</Typography>
      </Box>
      
      <List>
        {insights.map((insight) => (
          <ListItem key={insight.id} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box display="flex" alignItems="center" width="100%" mb={1}>
              <ListItemIcon>
                {getInsightIcon(insight.type)}
              </ListItemIcon>
              <ListItemText
                primary={insight.title}
                secondary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      label={`${insight.confidence}% confidence`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={insight.impact}
                      size="small"
                      color={getImpactColor(insight.impact)}
                    />
                  </Box>
                }
              />
            </Box>
            
            <Typography variant="body2" color="text.secondary" paragraph>
              {insight.description}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Recommended Actions:
            </Typography>
            <List dense>
              {insight.actionItems.map((action, index) => (
                <ListItem key={index}>
                  <ListItemText primary={action} />
                </ListItem>
              ))}
            </List>
            
            <Typography variant="caption" color="text.secondary">
              Timeframe: {insight.timeframe}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AIFinancialInsights; 