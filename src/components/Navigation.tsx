import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  useTheme,
  alpha,
  Alert,
  Divider,
  Avatar,
  Tooltip,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  ButtonBase,
  Collapse
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
  Insights as InsightsIcon,
  Recycling as RecyclingIcon,
  EmojiEvents as EmojiEventsIcon,
  AccountBalanceWallet as WalletIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowRight as ArrowRightIcon,
  Logout as LogoutIcon,
  Help as HelpIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';



// Import the logo as an absolute path for Vercel deployment
// import logo from '../assets/images/logo.svg';

const drawerWidth = 280;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  badge?: number | null;
  submenu?: MenuItem[];
}

const Navigation: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  const navigate = useNavigate();
  const location = useLocation();

  const primaryMenuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Budget Planner', icon: <AccountBalanceIcon />, path: '/budget' },
    { 
      text: 'Transactions', 
      icon: <ReceiptIcon />, 
      path: '/transactions', 
      badge: 3,
      submenu: [
        { text: 'All Transactions', icon: <ReceiptIcon />, path: '/transactions' },
        { text: 'Pending', icon: <ReceiptIcon />, path: '/transactions/pending', badge: 2 },
        { text: 'Recurring', icon: <ReceiptIcon />, path: '/transactions/recurring', badge: 1 }
      ]
    },
    { text: 'Banking Services', icon: <AccountBalanceIcon />, path: '/banking' },
  ];
  
  const secondaryMenuItems: MenuItem[] = [
    { text: 'AI Insights', icon: <InsightsIcon />, path: '/ai-insights', badge: 1 },
    { text: 'Sustainable Finance', icon: <RecyclingIcon />, path: '/sustainable' },
    { text: 'Gamification', icon: <EmojiEventsIcon />, path: '/gamification' },
  ];

  const handleNavigation = (path: string) => {
    try {
      navigate(path);
      setUserMenuAnchor(null);
      setNotificationsAnchor(null);
    } catch (err) {
      console.error("Navigation error:", err);
      setError("Failed to navigate. Please try again.");
    }
  };
  
  const handleToggleSubmenu = (itemText: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isSelected = location.pathname === item.path;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuOpen = openSubmenus[item.text] || false;
    
    return (
      <React.Fragment key={item.text}>
        <ListItem disablePadding sx={{ mb: hasSubmenu ? 0 : 1 }}>
          <ListItemButton
            onClick={hasSubmenu 
              ? () => handleToggleSubmenu(item.text)
              : () => handleNavigation(item.path)
            }
            selected={isSelected}
            sx={{
              borderRadius: 2,
              py: 1.2,
              pl: depth > 0 ? 4 : 2,
              '&.Mui-selected': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiListItemText-primary': {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              },
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
              },
              transition: 'all 0.2s',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: isSelected
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
              }}
            >
              {item.badge ? (
                <Badge
                  badgeContent={item.badge}
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '10px',
                      height: '18px',
                      minWidth: '18px',
                    },
                  }}
                >
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: isSelected ? 600 : 500,
                  fontSize: '0.95rem',
                },
              }}
            />
            {hasSubmenu && (
              isSubmenuOpen ? <ArrowDownIcon sx={{ fontSize: 20 }} /> : <ArrowRightIcon sx={{ fontSize: 20 }} />
            )}
          </ListItemButton>
        </ListItem>
        
        {hasSubmenu && (
          <Collapse in={isSubmenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.submenu!.map(subItem => renderMenuItem(subItem, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Budget Alert', message: 'You are approaching your monthly limit' },
    { id: 2, title: 'New Transaction', message: 'Payment of $45.99 received' },
    { id: 3, title: 'Subscription Renewal', message: 'Your premium plan will renew in 3 days' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      {error && (
        <Alert 
          severity="error" 
          onClose={() => setError(null)} 
          sx={{ 
            m: 2, 
            borderRadius: 2,
            boxShadow: theme.shadows[2]
          }}
        >
          {error}
        </Alert>
      )}
      
      {/* Logo & Brand Section */}
      <Box
        sx={{
          py: 3,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box 
          sx={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(33, 150, 243, 0.3)',
            mb: 1.5,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 25px rgba(33, 150, 243, 0.4)',
            }
          }}
          onClick={() => handleNavigation('/')}
        >
          <WalletIcon 
            sx={{ 
              fontSize: 38, 
              color: '#fff',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }} 
          />
        </Box>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 800,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            cursor: 'pointer',
          }}
          onClick={() => handleNavigation('/')}
        >
          WealthWise
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            mb: 1
          }}
        >
          Financial Management
        </Typography>
      </Box>
      
      <Divider sx={{ mx: 2, opacity: 0.6 }} />
      
      {/* User Profile */}
      <ButtonBase
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5, 
          p: 2,
          width: '100%',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          }
        }}
        onClick={handleUserMenuOpen}
      >
        <Avatar 
          sx={{ 
            width: 42, 
            height: 42,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
            bgcolor: theme.palette.primary.main,
          }}
        >
          <PersonIcon />
        </Avatar>
        <Box sx={{ textAlign: 'left', flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            Alex Johnson
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Premium Account
          </Typography>
        </Box>
        <ArrowDownIcon sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
      </ButtonBase>
      
      {/* User Menu Dropdown */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: { 
            width: 200,
            mt: 1,
            boxShadow: theme.shadows[3],
            borderRadius: 2,
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleNavigation('/profile')}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">My Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/help')}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Help Center</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => alert('Logout functionality would be implemented here')}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
      
      <Divider sx={{ mt: 2, mb: 2, opacity: 0.6 }} />

      {/* Primary Navigation */}
      <Box sx={{ px: 2 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            color: theme.palette.text.secondary,
            fontWeight: 600,
            pl: 2,
          }}
        >
          Main Menu
        </Typography>
        <List sx={{ mt: 1 }}>
          {primaryMenuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      {/* Secondary Navigation */}
      <Box sx={{ px: 2, mt: 2 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            color: theme.palette.text.secondary,
            fontWeight: 600,
            pl: 2,
          }}
        >
          Features
        </Typography>
        <List sx={{ mt: 1 }}>
          {secondaryMenuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      {/* Bottom Actions */}
      <Box
        sx={{
          mt: 'auto',
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Tooltip title="Notifications">
          <IconButton 
            onClick={handleNotificationsOpen}
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': { 
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              transition: 'all 0.2s',
            }}
          >
            <Badge badgeContent={notifications.length} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        
        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleNotificationsClose}
          PaperProps={{
            sx: { 
              width: 320,
              mt: 1,
              boxShadow: theme.shadows[3],
              borderRadius: 2,
            }
          }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
          </Box>
          <Box sx={{ maxHeight: 320, overflow: 'auto' }}>
            {notifications.map(notification => (
              <MenuItem key={notification.id} sx={{ px: 2, py: 1.5 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {notification.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {notification.message}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Box>
          <Box sx={{ p: 1.5, borderTop: `1px solid ${theme.palette.divider}`, textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ 
                cursor: 'pointer',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' }
              }}
              onClick={() => handleNavigation('/notifications')}
            >
              View all notifications
            </Typography>
          </Box>
        </Menu>
        
        <Tooltip title="Settings">
          <IconButton 
            onClick={() => handleNavigation('/settings')}
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': { 
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              transition: 'all 0.2s',
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
          <IconButton 
            
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': { 
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              transition: 'all 0.2s',
            }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

export default Navigation; 