import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  School as SchoolIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const UserExperience = () => {
  const [notifications, setNotifications] = useState([]);
  const [openSettings, setOpenSettings] = useState(false);
  const [dashboardSettings, setDashboardSettings] = useState({
    showSpendingAlerts: true,
    showBillReminders: true,
    showGoalProgress: true,
    showPerformanceCharts: true,
    showImpactMetrics: true,
  });
  const [educationalResources, setEducationalResources] = useState([]);
  const [expandedResource, setExpandedResource] = useState(null);

  useEffect(() => {
    fetchNotifications();
    fetchEducationalResources();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchEducationalResources = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/resources`);
      if (response.ok) {
        const data = await response.json();
        setEducationalResources(data);
      }
    } catch (error) {
      console.error('Error fetching educational resources:', error);
    }
  };

  const handleDashboardSettingChange = (setting) => {
    setDashboardSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'spending':
        return <WarningIcon color="warning" />;
      case 'bill':
        return <CalendarIcon color="primary" />;
      case 'goal':
        return <TrendingUpIcon color="success" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">User Experience</Typography>
          <IconButton onClick={() => setOpenSettings(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* Notifications Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <NotificationsIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1">Notifications & Alerts</Typography>
              </Box>
              <List>
                {notifications.map((notification, index) => (
                  <ListItem key={index} divider={index !== notifications.length - 1}>
                    <ListItemIcon>
                      {getNotificationIcon(notification.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.title}
                      secondary={notification.message}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Educational Resources Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1">Educational Resources</Typography>
              </Box>
              {educationalResources.map((resource, index) => (
                <Accordion
                  key={index}
                  expanded={expandedResource === index}
                  onChange={() => setExpandedResource(expandedResource === index ? null : index)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{resource.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {resource.description}
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        size="small"
                        href={resource.link}
                        target="_blank"
                      >
                        Learn More
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </CardContent>

      {/* Dashboard Settings Dialog */}
      <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
        <DialogTitle>Customize Dashboard</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={dashboardSettings.showSpendingAlerts}
                  onChange={() => handleDashboardSettingChange('showSpendingAlerts')}
                />
              }
              label="Show Spending Alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={dashboardSettings.showBillReminders}
                  onChange={() => handleDashboardSettingChange('showBillReminders')}
                />
              }
              label="Show Bill Reminders"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={dashboardSettings.showGoalProgress}
                  onChange={() => handleDashboardSettingChange('showGoalProgress')}
                />
              }
              label="Show Goal Progress"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={dashboardSettings.showPerformanceCharts}
                  onChange={() => handleDashboardSettingChange('showPerformanceCharts')}
                />
              }
              label="Show Performance Charts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={dashboardSettings.showImpactMetrics}
                  onChange={() => handleDashboardSettingChange('showImpactMetrics')}
                />
              }
              label="Show Impact Metrics"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettings(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default UserExperience; 