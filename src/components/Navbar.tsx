import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountBalance as BudgetIcon,
  Receipt as ExpensesIcon,
  Savings as SavingsIcon,
  School as EducationIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import Logo from './Logo';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Logo size="medium" />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isMobile ? (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/"
                title="Dashboard"
              >
                <DashboardIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/budget"
                title="Budget"
              >
                <BudgetIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/expenses"
                title="Expenses"
              >
                <ExpensesIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/savings"
                title="Savings"
              >
                <SavingsIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/education"
                title="Education"
              >
                <EducationIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 