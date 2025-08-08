import React from 'react';
import { Box, Typography, Button, Alert, AlertTitle } from '@mui/material';

interface GraphQLErrorHandlerProps {
  error?: Error | null;
  onRetry?: () => void;
  children?: React.ReactNode;
}

export const GraphQLErrorHandler: React.FC<GraphQLErrorHandlerProps> = ({
  error,
  onRetry,
  children,
}) => {
  if (!error) {
    return <>{children}</>;
  }

  // Determine error type and message
  const getErrorInfo = (error: Error) => {
    const message = error.message.toLowerCase();

    if (message.includes('network') || message.includes('fetch')) {
      return {
        title: 'Connection Error',
        message:
          'Unable to connect to the server. Please check your internet connection and try again.',
        severity: 'error' as const,
      };
    }

    if (message.includes('not found') || message.includes('404')) {
      return {
        title: 'Film Not Found',
        message:
          'The requested film could not be found. Please try a different film.',
        severity: 'warning' as const,
      };
    }

    if (message.includes('timeout')) {
      return {
        title: 'Request Timeout',
        message: 'The request took too long to complete. Please try again.',
        severity: 'warning' as const,
      };
    }

    if (message.includes('unauthorized') || message.includes('403')) {
      return {
        title: 'Access Denied',
        message: 'You do not have permission to access this resource.',
        severity: 'error' as const,
      };
    }

    return {
      title: 'Unexpected Error',
      message: 'An unexpected error occurred. Please try again later.',
      severity: 'error' as const,
    };
  };

  const errorInfo = getErrorInfo(error);

  return (
    <Box sx={{ p: 2 }}>
      <Alert severity={errorInfo.severity} sx={{ mb: 2 }}>
        <AlertTitle>{errorInfo.title}</AlertTitle>
        {errorInfo.message}
      </Alert>

      {onRetry && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="contained"
            onClick={onRetry}
            sx={{
              backgroundColor:
                errorInfo.severity === 'error' ? '#d32f2f' : '#ed6c02',
              '&:hover': {
                backgroundColor:
                  errorInfo.severity === 'error' ? '#c62828' : '#e65100',
              },
            }}
          >
            Try Again
          </Button>
        </Box>
      )}
    </Box>
  );
};
