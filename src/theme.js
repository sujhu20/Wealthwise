import { createTheme } from '@mui/material/styles';

// Create theme generator that accepts mode (light/dark)
const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#0f172a',
      paper: mode === 'light' ? '#ffffff' : '#1e293b',
      card: mode === 'light' 
        ? 'linear-gradient(145deg, #ffffff, #f5f7fa)'
        : 'linear-gradient(145deg, #1e293b, #0f172a)',
    },
    text: {
      primary: mode === 'light' ? '#1e293b' : '#f1f5f9',
      secondary: mode === 'light' ? '#64748b' : '#94a3b8',
      hint: mode === 'light' ? '#94a3b8' : '#64748b',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
    },
    divider: mode === 'light' 
      ? 'rgba(100, 116, 139, 0.08)' 
      : 'rgba(148, 163, 184, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(45, 55, 72, 0.05), 0px 1px 2px rgba(45, 55, 72, 0.1)',
    '0px 4px 6px rgba(45, 55, 72, 0.05), 0px 2px 4px rgba(45, 55, 72, 0.1)',
    '0px 6px 8px rgba(45, 55, 72, 0.05), 0px 3px 6px rgba(45, 55, 72, 0.1)',
    '0px 8px 12px rgba(45, 55, 72, 0.05), 0px 4px 8px rgba(45, 55, 72, 0.1)',
    '0px 10px 15px rgba(45, 55, 72, 0.05), 0px 5px 10px rgba(45, 55, 72, 0.1)',
    '0px 12px 18px rgba(45, 55, 72, 0.05), 0px 6px 12px rgba(45, 55, 72, 0.1)',
    '0px 14px 21px rgba(45, 55, 72, 0.05), 0px 7px 14px rgba(45, 55, 72, 0.1)',
    '0px 16px 24px rgba(45, 55, 72, 0.05), 0px 8px 16px rgba(45, 55, 72, 0.1)',
    '0px 18px 28px rgba(45, 55, 72, 0.05), 0px 10px 20px rgba(45, 55, 72, 0.1)',
    '0px 20px 30px rgba(45, 55, 72, 0.05), 0px 12px 24px rgba(45, 55, 72, 0.1)',
    '0px 22px 32px rgba(45, 55, 72, 0.05), 0px 14px 28px rgba(45, 55, 72, 0.1)',
    '0px 24px 36px rgba(45, 55, 72, 0.05), 0px 16px 32px rgba(45, 55, 72, 0.1)',
    '0px 26px 40px rgba(45, 55, 72, 0.05), 0px 18px 36px rgba(45, 55, 72, 0.1)',
    '0px 28px 42px rgba(45, 55, 72, 0.05), 0px 20px 40px rgba(45, 55, 72, 0.1)',
    '0px 30px 45px rgba(45, 55, 72, 0.05), 0px 22px 44px rgba(45, 55, 72, 0.1)',
    '0px 32px 48px rgba(45, 55, 72, 0.05), 0px 24px 48px rgba(45, 55, 72, 0.1)',
    '0px 34px 52px rgba(45, 55, 72, 0.05), 0px 26px 52px rgba(45, 55, 72, 0.1)',
    '0px 36px 56px rgba(45, 55, 72, 0.05), 0px 28px 56px rgba(45, 55, 72, 0.1)',
    '0px 38px 60px rgba(45, 55, 72, 0.05), 0px 30px 60px rgba(45, 55, 72, 0.1)',
    '0px 40px 64px rgba(45, 55, 72, 0.05), 0px 32px 64px rgba(45, 55, 72, 0.1)',
    '0px 42px 68px rgba(45, 55, 72, 0.05), 0px 34px 68px rgba(45, 55, 72, 0.1)',
    '0px 44px 72px rgba(45, 55, 72, 0.05), 0px 36px 72px rgba(45, 55, 72, 0.1)',
    '0px 46px 76px rgba(45, 55, 72, 0.05), 0px 38px 76px rgba(45, 55, 72, 0.1)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(145, 158, 171, 0.24)' 
              : 'rgba(145, 158, 171, 0.14)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '& .MuiDrawer-root': {
            transition: 'all 0.3s ease-in-out',
          }
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: 'none',
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.24)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'light'
            ? 'rgba(100, 116, 139, 0.1)' 
            : 'rgba(100, 116, 139, 0.2)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) => theme.palette.mode === 'light'
              ? '0 12px 24px rgba(0, 0, 0, 0.08)'
              : '0 12px 24px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'box-shadow 0.2s ease-in-out',
            '&.Mui-focused': {
              boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.1)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          '&.MuiChip-filledPrimary': {
            backgroundColor: 'rgba(37, 99, 235, 0.12)',
            color: '#2563eb',
          },
          '&.MuiChip-filledSecondary': {
            backgroundColor: 'rgba(139, 92, 246, 0.12)',
            color: '#8b5cf6',
          },
          '&.MuiChip-filledSuccess': {
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            color: '#10b981',
          },
          '&.MuiChip-filledError': {
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            color: '#ef4444',
          },
          '&.MuiChip-filledWarning': {
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            color: '#f59e0b',
          },
          '&.MuiChip-filledInfo': {
            backgroundColor: 'rgba(14, 165, 233, 0.12)',
            color: '#0ea5e9',
          },
        },
        label: {
          fontWeight: 500,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingTop: 8,
          paddingBottom: 8,
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: '0.75rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: (theme) => theme.palette.mode === 'light'
            ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
            : `linear-gradient(to right, #0f172a, #1e293b)`,
        },
      },
    },
  },
});

// Export the light mode theme as default
const theme = createAppTheme('light');

// Export the theme creator for dark mode support
export { createAppTheme };
export default theme; 