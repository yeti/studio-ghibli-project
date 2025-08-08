import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LoadingButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  sx?: any;
}

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  minHeight: '48px',
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  marginLeft: -12,
  marginTop: -12,
}));

const ButtonContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 1,
  transition: 'opacity 0.2s ease-in-out',
  '&.loading': {
    opacity: 0.3,
  },
});

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  sx,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
      fullWidth={fullWidth}
      sx={sx}
      {...props}
    >
      {loading && <LoadingSpinner size={24} />}
      <ButtonContent className={loading ? 'loading' : ''}>
        {children}
      </ButtonContent>
    </StyledButton>
  );
};
