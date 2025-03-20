import React from 'react';
import { Box, Typography } from '@mui/material';
import { AccountBalance, Nature } from '@mui/icons-material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { icon: 24, text: 'body1' };
      case 'large':
        return { icon: 48, text: 'h4' };
      default:
        return { icon: 32, text: 'h6' };
    }
  };

  const sizes = getSize();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: 'primary.main',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: sizes.icon,
          height: sizes.icon,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AccountBalance
          sx={{
            fontSize: sizes.icon,
            color: 'primary.main',
          }}
        />
        <Nature
          sx={{
            fontSize: sizes.icon * 0.6,
            position: 'absolute',
            bottom: -sizes.icon * 0.1,
            right: -sizes.icon * 0.1,
            color: 'success.main',
            transform: 'rotate(45deg)',
          }}
        />
      </Box>
      {showText && (
        <Typography
          variant={sizes.text as any}
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #4CAF50 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          EcoFinance
        </Typography>
      )}
    </Box>
  );
};

export default Logo; 