import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const OAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        // Get the OAuth parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        const errorMessage = params.get('error_message');
        const errorDisplay = params.get('error_display');
        const errorCode = params.get('error_code');
        const errorType = params.get('error_type');
        const institutionQueryId = params.get('institution_query_id');
        const linkSessionId = params.get('link_session_id');

        if (error) {
          console.error('OAuth Error:', {
            error,
            errorMessage,
            errorDisplay,
            errorCode,
            errorType,
            institutionQueryId,
            linkSessionId,
          });
          navigate('/dashboard?error=oauth_failed');
          return;
        }

        // Exchange the public token
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bank/oauth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_token: params.get('public_token'),
            metadata: {
              institution: params.get('institution'),
              accounts: params.get('accounts'),
              transfer_status: params.get('transfer_status'),
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to complete OAuth process');
        }

        // Redirect back to dashboard on success
        navigate('/dashboard?success=bank_connected');
      } catch (error) {
        console.error('OAuth Handler Error:', error);
        navigate('/dashboard?error=oauth_failed');
      }
    };

    handleOAuth();
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 3 }}>
        Completing bank connection...
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Please wait while we process your request.
      </Typography>
    </Box>
  );
};

export default OAuthHandler; 