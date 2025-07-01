import React from 'react';

/**
 * Types related to the Error component
 */

export interface ErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
  variant?: 'error' | 'warning' | 'info';
  actions?: React.ReactNode;
}

export interface ErrorComponent extends React.FC<ErrorProps> {
  FullPage: React.FC<ErrorProps>;
  Banner: React.FC<ErrorProps>;
  Toast: React.FC<ErrorProps & { onClose?: () => void }>;
}
