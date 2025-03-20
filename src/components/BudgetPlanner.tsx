import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Chip,
  Tooltip,
  CircularProgress,
  useTheme,
  alpha,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
  Money as MoneyIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API calls in production
const predefinedCategories = [
  { id: 'housing', name: 'Housing', icon: '🏠', color: '#2196f3' },
  { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#4caf50' },
  { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#ff9800' },
  { id: 'utilities', name: 'Utilities', icon: '💡', color: '#9c27b0' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#e91e63' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#f44336' },
  { id: 'healthcare', name: 'Healthcare', icon: '⚕️', color: '#00bcd4' },
  { id: 'savings', name: 'Savings', icon: '💰', color: '#8bc34a' },
  { id: 'debt', name: 'Debt Payments', icon: '💳', color: '#607d8b' },
];

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  icon: string;
  color: string;
  alerts: boolean;
  alertThreshold: number;
}

// Default mock monthly income - in real app this would come from user settings
const DEFAULT_MONTHLY_INCOME = 5000;

const BudgetPlanner: React.FC = () => {
  const theme = useTheme();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState(DEFAULT_MONTHLY_INCOME);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [newBudget, setNewBudget] = useState<Partial<Budget>>({
    category: '',
    allocated: 0,
    spent: 0,
    icon: '💵',
    color: '#2196f3',
    alerts: true,
    alertThreshold: 80
  });
  
  const [notifications, setNotifications] = useState<{id: string, message: string, type: 'warning' | 'info' | 'success'}[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBudgets = localStorage.getItem('wealthwise_budgets');
    const savedIncome = localStorage.getItem('wealthwise_monthly_income');
    
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    } else {
      // Initial demo data for first-time users
      const initialBudgets: Budget[] = [
        { 
          id: '1', 
          category: 'Housing', 
          allocated: 1500, 
          spent: 0, 
          remaining: 1500, 
          icon: '🏠', 
          color: '#2196f3',
          alerts: true,
          alertThreshold: 90
        },
        { 
          id: '2', 
          category: 'Food & Dining', 
          allocated: 600, 
          spent: 0, 
          remaining: 600, 
          icon: '🍔', 
          color: '#4caf50',
          alerts: true,
          alertThreshold: 80
        }
      ];
      setBudgets(initialBudgets);
      localStorage.setItem('wealthwise_budgets', JSON.stringify(initialBudgets));
    }
    
    if (savedIncome) {
      setMonthlyIncome(parseFloat(savedIncome));
    } else {
      localStorage.setItem('wealthwise_monthly_income', DEFAULT_MONTHLY_INCOME.toString());
    }
    
    // Generate initial notifications
    checkBudgetLimits();
  }, []);
  
  // Update localStorage whenever budgets change
  useEffect(() => {
    localStorage.setItem('wealthwise_budgets', JSON.stringify(budgets));
    checkBudgetLimits();
  }, [budgets]);
  
  // Save monthly income when changed
  useEffect(() => {
    localStorage.setItem('wealthwise_monthly_income', monthlyIncome.toString());
  }, [monthlyIncome]);
  
  // Check budgets for limit warnings
  const checkBudgetLimits = () => {
    const newNotifications: {id: string, message: string, type: 'warning' | 'info' | 'success'}[] = [];
    
    budgets.forEach(budget => {
      const progress = calculateProgress(budget.spent, budget.allocated);
      
      if (budget.alerts && progress >= budget.alertThreshold) {
        newNotifications.push({
          id: `warning-${budget.id}`,
          message: `${budget.category} budget at ${progress.toFixed(0)}% of limit`,
          type: 'warning'
        });
      }
      
      if (budget.spent === 0 && budget.allocated > 0) {
        newNotifications.push({
          id: `info-${budget.id}`,
          message: `Track your ${budget.category} expenses to see your progress`,
          type: 'info'
        });
      }
    });
    
    setNotifications(newNotifications);
  };
  
  // Calculate total budget metrics
  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = budgets.reduce((sum, budget) => sum + budget.remaining, 0);
  
  const unallocated = monthlyIncome - totalAllocated;
  const savingsRate = (unallocated / monthlyIncome) * 100;
  
  // Handle adding/editing budget
  const handleSaveBudget = () => {
    if (!newBudget.category || !newBudget.allocated) {
      setSuccessMessage('Please fill in all required fields');
      setShowSuccess(true);
      return;
    }
    
    setLoading(true);
    
    // Short timeout to simulate API call and show loading state
    setTimeout(() => {
      if (editingBudget) {
        // Edit existing budget
        const updatedBudgets = budgets.map(budget => 
          budget.id === editingBudget.id 
            ? { 
                ...budget, 
                category: newBudget.category || budget.category,
                allocated: newBudget.allocated || budget.allocated,
                remaining: (newBudget.allocated || budget.allocated) - budget.spent,
                alerts: newBudget.alerts === undefined ? budget.alerts : newBudget.alerts,
                alertThreshold: newBudget.alertThreshold || budget.alertThreshold
              } 
            : budget
        );
        setBudgets(updatedBudgets);
        setSuccessMessage('Budget updated successfully!');
      } else {
        // Add new budget
        const categoryDetails = predefinedCategories.find(c => c.name === newBudget.category);
        
        const budget: Budget = {
          id: Date.now().toString(),
          category: newBudget.category || 'Uncategorized',
          allocated: newBudget.allocated || 0,
          spent: 0,
          remaining: newBudget.allocated || 0,
          icon: categoryDetails?.icon || '💵',
          color: categoryDetails?.color || '#2196f3',
          alerts: newBudget.alerts === undefined ? true : newBudget.alerts,
          alertThreshold: newBudget.alertThreshold || 80
        };
        
        setBudgets([...budgets, budget]);
        setSuccessMessage('New budget category added!');
      }
      
      setLoading(false);
      setOpenDialog(false);
      setEditingBudget(null);
      setNewBudget({
        category: '',
        allocated: 0,
        spent: 0,
        icon: '💵',
        color: '#2196f3',
        alerts: true,
        alertThreshold: 80
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };
  
  // Handle updating monthly income
  const handleUpdateIncome = (newIncome: number) => {
    setMonthlyIncome(newIncome);
    setOpenIncomeDialog(false);
    setSuccessMessage('Monthly income updated!');
    setShowSuccess(true);
  };
  
  // Handle adding a mock expense to a budget (for demo purposes)
  const handleAddExpense = (budget: Budget) => {
    // For demo: add a random expense between 10% and 30% of allocated budget
    const randomExpense = budget.allocated * (Math.random() * 0.2 + 0.1);
    const newSpent = budget.spent + randomExpense;
    const newRemaining = budget.allocated - newSpent;
    
    const updatedBudgets = budgets.map(b => 
      b.id === budget.id 
        ? { ...b, spent: newSpent, remaining: newRemaining } 
        : b
    );
    
    setBudgets(updatedBudgets);
    setSuccessMessage(`Added $${randomExpense.toFixed(2)} expense to ${budget.category}`);
    setShowSuccess(true);
  };
  
  // Handle deleting a budget
  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
    setSuccessMessage('Budget category deleted');
    setShowSuccess(true);
  };
  
  // Open edit dialog
  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setNewBudget({
      category: budget.category,
      allocated: budget.allocated,
      alerts: budget.alerts,
      alertThreshold: budget.alertThreshold
    });
    setOpenDialog(true);
  };
  
  // Calculate progress percentage
  const calculateProgress = (spent: number, allocated: number) => {
    return (spent / allocated) * 100;
  };
  
  // Determine if a budget needs a warning
  const needsWarning = (budget: Budget) => {
    const progress = calculateProgress(budget.spent, budget.allocated);
    return budget.alerts && progress >= budget.alertThreshold;
  };
  
  // Dismiss a notification
  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  // Add subtle animation for charts and cards
  const fadeInAnimation = {
    opacity: 0,
    animation: 'fadeIn 0.5s ease-in-out forwards',
    '@keyframes fadeIn': {
      '0%': { opacity: 0, transform: 'translateY(10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    }
  };

  // Use theme colors for better dark mode support
  const getCardGradient = (baseColor: string) => {
    return theme.palette.mode === 'light'
      ? `linear-gradient(135deg, ${alpha(baseColor, 0.15)} 0%, ${alpha(baseColor, 0.05)} 100%)`
      : `linear-gradient(135deg, ${alpha(baseColor, 0.25)} 0%, ${alpha(baseColor, 0.15)} 100%)`;
  };

  // Improved progress bar with animation
  const AnimatedProgress = ({ value, color }: { value: number, color: string }) => (
    <LinearProgress
      variant="determinate"
      value={Math.min(value, 100)}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: alpha(color, theme.palette.mode === 'light' ? 0.1 : 0.2),
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        transition: 'all 0.3s'
      }}
    />
  );
  
  return (
    <Box>
      {/* Success message - enhanced with animation */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionProps={{
          style: {
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          }
        }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            boxShadow: theme.shadows[4],
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.success.dark, 0.9)
              : alpha(theme.palette.success.light, 0.9),
            color: theme.palette.success.contrastText,
            border: `1px solid ${theme.palette.success.main}`,
            backdropFilter: 'blur(4px)'
          }}
          onClose={() => setShowSuccess(false)}
          icon={<CheckCircleIcon fontSize="inherit" />}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      
      {/* Budget Overview - enhanced with better theming */}
      <Card 
        sx={{ 
          mb: 3, 
          overflow: 'visible', 
          boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 8 : 2],
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(145deg, #ffffff, #f5f7fa)'
            : 'linear-gradient(145deg, #1e293b, #0f172a)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          ...fadeInAnimation
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Monthly Budget Overview
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => setOpenIncomeDialog(true)}
              size="small"
              startIcon={<MoneyIcon />}
              sx={{
                borderRadius: 8,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }
              }}
            >
              Update Income
            </Button>
          </Box>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={3}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                background: getCardGradient(theme.palette.primary.main),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Allocated
                </Typography>
                <Typography variant="h4" fontWeight={600} color="primary">
                  ${totalAllocated.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  of ${monthlyIncome.toFixed(2)} income
                </Typography>
                <AnimatedProgress
                  value={(totalAllocated / monthlyIncome) * 100}
                  color={theme.palette.primary.main}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                background: getCardGradient(theme.palette.error.main),
                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Spent
                </Typography>
                <Typography variant="h4" fontWeight={600} color="error">
                  ${totalSpent.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {totalAllocated > 0 ? ((totalSpent / totalAllocated) * 100).toFixed(1) : '0'}% of allocated
                </Typography>
                <AnimatedProgress
                  value={totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0}
                  color={theme.palette.error.main}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                background: getCardGradient(theme.palette.success.main),
                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Remaining Budget
                </Typography>
                <Typography variant="h4" fontWeight={600} color="success">
                  ${totalRemaining.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {totalAllocated > 0 ? ((totalRemaining / totalAllocated) * 100).toFixed(1) : '0'}% left this month
                </Typography>
                <AnimatedProgress
                  value={totalAllocated > 0 ? (totalRemaining / totalAllocated) * 100 : 0}
                  color={theme.palette.success.main}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                background: getCardGradient('#8bc34a'),
                border: `1px solid ${alpha('#8bc34a', 0.1)}`,
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Unallocated Income
                </Typography>
                <Typography variant="h4" fontWeight={600} sx={{ color: '#8bc34a' }}>
                  ${unallocated.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {monthlyIncome > 0 ? savingsRate.toFixed(1) : '0'}% savings rate
                </Typography>
                <AnimatedProgress
                  value={monthlyIncome > 0 ? savingsRate : 0}
                  color="#8bc34a"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Notifications Panel - enhanced with animations */}
      {notifications.length > 0 && (
        <Card 
          sx={{ 
            mb: 3, 
            bgcolor: alpha(theme.palette.background.paper, 0.7), 
            boxShadow: theme.shadows[2],
            ...fadeInAnimation,
            animationDelay: '0.1s'
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <NotificationsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography variant="h6">Budget Alerts</Typography>
            </Box>
            
            <Grid container spacing={2}>
              {notifications.map((notification, index) => (
                <Grid item xs={12} key={notification.id}>
                  <Alert 
                    severity={notification.type}
                    onClose={() => dismissNotification(notification.id)}
                    icon={notification.type === 'warning' ? <WarningIcon /> : 
                          notification.type === 'success' ? <CheckCircleIcon /> : <InfoIcon />}
                    sx={{ 
                      boxShadow: theme.shadows[1],
                      '& .MuiAlert-icon': {
                        opacity: 0.9
                      },
                      animation: 'slideIn 0.3s ease-out forwards',
                      animationDelay: `${0.1 + index * 0.1}s`,
                      opacity: 0,
                      '@keyframes slideIn': {
                        '0%': { opacity: 0, transform: 'translateX(-10px)' },
                        '100%': { opacity: 1, transform: 'translateX(0)' }
                      }
                    }}
                  >
                    {notification.message}
                  </Alert>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* Budget Categories - enhanced with better animations */}
      <Card 
        sx={{ 
          mb: 3, 
          boxShadow: theme.shadows[2],
          ...fadeInAnimation,
          animationDelay: '0.2s'
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
              Budget Categories
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingBudget(null);
                setNewBudget({
                  category: '',
                  allocated: 0,
                  spent: 0,
                  alerts: true,
                  alertThreshold: 80
                });
                setOpenDialog(true);
              }}
              sx={{ 
                px: 3,
                boxShadow: theme.shadows[2],
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                '&:hover': {
                  boxShadow: theme.shadows[4],
                  transform: 'translateY(-2px)',
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                },
                transition: 'all 0.2s'
              }}
            >
              Add Category
            </Button>
          </Box>
          
          {budgets.length === 0 ? (
            <Box 
              sx={{ 
                p: 4, 
                textAlign: 'center', 
                border: `1px dashed ${theme.palette.divider}`,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.background.paper, 0.5)
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Budget Categories Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Create your first budget category to start tracking your spending
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => {
                  setEditingBudget(null);
                  setNewBudget({
                    category: '',
                    allocated: 0,
                    spent: 0,
                    alerts: true,
                    alertThreshold: 80
                  });
                  setOpenDialog(true);
                }}
              >
                Add First Category
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {budgets.map((budget, index) => (
                <Grid item xs={12} md={6} key={budget.id}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      position: 'relative',
                      overflow: 'visible',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: theme.shadows[3],
                        transform: 'translateY(-4px)'
                      },
                      borderColor: needsWarning(budget) ? theme.palette.warning.main : alpha(theme.palette.divider, 0.1),
                      borderWidth: needsWarning(budget) ? 2 : 1,
                      animation: 'fadeInUp 0.5s ease-out forwards',
                      animationDelay: `${0.1 + index * 0.1}s`,
                      opacity: 0,
                      '@keyframes fadeInUp': {
                        '0%': { opacity: 0, transform: 'translateY(20px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' }
                      }
                    }}
                  >
                    {needsWarning(budget) && (
                      <Chip 
                        label="Approaching Limit" 
                        size="small"
                        color="warning"
                        icon={<WarningIcon />}
                        sx={{ 
                          position: 'absolute',
                          top: -10,
                          right: 20,
                          boxShadow: theme.shadows[2]
                        }}
                      />
                    )}
                    
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box display="flex" alignItems="center">
                          <Box 
                            sx={{ 
                              width: 40, 
                              height: 40, 
                              borderRadius: '50%', 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: alpha(budget.color, 0.1),
                              mr: 1.5,
                              fontSize: '1.3rem'
                            }}
                          >
                            {budget.icon}
                          </Box>
                          <Typography variant="h6">
                            {budget.category}
                          </Typography>
                        </Box>
                        
                        <Box>
                          <Tooltip title="Add expense (demo)">
                            <IconButton 
                              size="small" 
                              onClick={() => handleAddExpense(budget)}
                              sx={{ color: theme.palette.warning.main }}
                            >
                              <TrendingUpIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit budget">
                            <IconButton 
                              size="small" 
                              onClick={() => handleEditBudget(budget)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete budget">
                            <IconButton 
                              size="small" 
                              onClick={() => handleDeleteBudget(budget.id)}
                              sx={{ color: theme.palette.error.main }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        ${budget.spent.toFixed(2)} spent of ${budget.allocated.toFixed(2)} budget
                      </Typography>
                      
                      <Box position="relative" mb={1}>
                        <AnimatedProgress
                          value={calculateProgress(budget.spent, budget.allocated)}
                          color={budget.color}
                        />
                      </Box>
                      
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle2">
                            ${budget.remaining.toFixed(2)} remaining
                          </Typography>
                        </Box>
                        
                        <Box>
                          <Chip
                            size="small"
                            label={`${calculateProgress(budget.spent, budget.allocated).toFixed(0)}%`}
                            sx={{
                              backgroundColor: alpha(budget.color, 0.1),
                              color: budget.color,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
      
      {/* Tips and Recommendations */}
      <Card sx={{ boxShadow: theme.shadows[2] }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Budget Tips
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, borderLeft: `4px solid ${theme.palette.primary.main}`, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  50/30/20 Rule
                </Typography>
                <Typography variant="body2">
                  Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, borderLeft: `4px solid ${theme.palette.warning.main}`, bgcolor: alpha(theme.palette.warning.main, 0.05) }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Zero-Based Budgeting
                </Typography>
                <Typography variant="body2">
                  Assign every dollar a purpose, making your income minus expenses equal to zero.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, borderLeft: `4px solid ${theme.palette.success.main}`, bgcolor: alpha(theme.palette.success.main, 0.05) }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Pay Yourself First
                </Typography>
                <Typography variant="body2">
                  Automatically divert a percentage of your income to savings before budgeting the rest.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Add/Edit Budget Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => {
          setOpenDialog(false);
          setEditingBudget(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingBudget ? 'Edit Budget Category' : 'Add New Budget Category'}
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newBudget.category || ''}
                  label="Category"
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value as string })}
                >
                  {predefinedCategories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      <Box display="flex" alignItems="center">
                        <Box component="span" mr={1}>{category.icon}</Box>
                        {category.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Monthly Budget Amount"
                type="number"
                value={newBudget.allocated || ''}
                onChange={(e) => setNewBudget({ ...newBudget, allocated: parseFloat(e.target.value) })}
                InputProps={{
                  startAdornment: <Typography variant="body1" sx={{ mr: 1 }}>$</Typography>,
                }}
                helperText="Enter the amount you want to allocate for this category each month"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Budget Alerts
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Alert me when I've spent</InputLabel>
                <Select
                  value={newBudget.alertThreshold || 80}
                  label="Alert me when I've spent"
                  onChange={(e) => setNewBudget({ ...newBudget, alertThreshold: e.target.value as number })}
                >
                  <MenuItem value={70}>70% of budget</MenuItem>
                  <MenuItem value={80}>80% of budget</MenuItem>
                  <MenuItem value={90}>90% of budget</MenuItem>
                  <MenuItem value={100}>100% of budget</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={() => {
              setOpenDialog(false);
              setEditingBudget(null);
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveBudget}
            disabled={loading || !newBudget.category || !newBudget.allocated}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Saving...' : 'Save Budget'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Update Income Dialog */}
      <Dialog
        open={openIncomeDialog}
        onClose={() => setOpenIncomeDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Update Monthly Income</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Monthly Income"
            type="number"
            fullWidth
            variant="outlined"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
            InputProps={{
              startAdornment: <Typography variant="body1" sx={{ mr: 1 }}>$</Typography>,
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIncomeDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => handleUpdateIncome(monthlyIncome)}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Alert Settings Dialog */}
      <Dialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Budget Alert Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Configure when you receive alerts for your budgets.
          </Typography>
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Default Alert Threshold</InputLabel>
            <Select
              value={80}
              label="Default Alert Threshold"
            >
              <MenuItem value={70}>70% of budget</MenuItem>
              <MenuItem value={80}>80% of budget</MenuItem>
              <MenuItem value={90}>90% of budget</MenuItem>
              <MenuItem value={100}>100% of budget</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAlertDialog(false)}>Cancel</Button>
          <Button variant="contained">Save Settings</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BudgetPlanner; 