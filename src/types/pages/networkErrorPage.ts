/**
 * Types related to the NetworkErrorPage component
 */

export interface NetworkErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export interface LocationState {
  message?: string;
  from?: string;
}
