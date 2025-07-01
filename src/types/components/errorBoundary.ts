import type { ErrorInfo, ReactNode } from 'react';

/**
 * Types related to the ErrorBoundary component
 */

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
