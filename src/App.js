import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, CircularProgress } from '@mui/material';
import { createAppTheme } from './theme';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import BankingServices from './components/BankingServices.tsx';
import AIFinancialInsights from './components/AIFinancialInsights.tsx';
import SustainableFinance from './components/SustainableFinance.tsx';
import FinancialGamification from './components/FinancialGamification.tsx';
import Navigation from './components/Navigation.tsx';
import OAuthHandler from './components/OAuthHandler';
import BudgetPlanner from './components/BudgetPlanner';
import { initGA, logPageView } from './utils/analytics';

// Create a theme context
export const ColorModeContext = React.createContext({ 
  toggleColorMode: () => {},
  mode: 'light'
});

function App() {
  const [loading, setLoading] = useState(true);
  
  // Get the user's preferred color scheme from localStorage or system preference
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('colorMode');
  const initialMode = savedMode || (prefersDarkMode ? 'dark' : 'light');
  
  const [mode, setMode] = useState(initialMode);
  
  // Create the theme using our custom creator function
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  
  // Create the color mode context value
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('colorMode', newMode);
      },
      mode,
    }),
    [mode],
  );

  useEffect(() => {
    // Initialize Google Analytics
    try {
      initGA();
      logPageView();
    } catch (error) {
      console.error("Analytics error:", error);
      // Continue app execution even if analytics fails
    }
    
    // Simulating app initialization
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          sx={{ 
            display: 'flex', 
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Navigation />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - 280px)` },
                ml: { sm: '280px' },
                backgroundColor: 'background.default',
                transition: 'all 0.3s',
              }}
            >
              <Container maxWidth="xl">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/oauth.html" element={<OAuthHandler />} />
                  <Route path="/transactions" element={<TransactionList />} />
                  <Route path="/banking" element={<BankingServices />} />
                  <Route path="/ai-insights" element={<AIFinancialInsights />} />
                  <Route path="/sustainable" element={<SustainableFinance />} />
                  <Route path="/gamification" element={<FinancialGamification />} />
                  <Route path="/budget" element={<BudgetPlanner />} />
                </Routes>
              </Container>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App; 