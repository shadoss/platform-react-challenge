import React from 'react';
import { ExclamationTriangleIcon, ExclamationCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
  variant?: 'error' | 'warning' | 'info';
  actions?: React.ReactNode;
}

interface ErrorComponent extends React.FC<ErrorProps> {
  FullPage: React.FC<ErrorProps>;
  Banner: React.FC<ErrorProps>;
  Toast: React.FC<ErrorProps & { onClose?: () => void }>;
}

/**
 * Error component
 * Displays an error message with optional retry button
 */
const Error: ErrorComponent = ({
  title = 'Error',
  message,
  onRetry,
  className = '',
  variant = 'error',
  actions,
}) => {
  // Using CSS classes from index.css
  const variantClass = `error-container-${variant}`;
  const iconClass = `error-icon-${variant}`;
  const titleClass = `error-title-${variant}`;
  const messageClass = `error-message-${variant}`;

  // Icon based on variant
  const getIcon = () => {
    switch (variant) {
      case 'error':
        return <XCircleIcon className={iconClass} aria-hidden="true" />;
      case 'warning':
        return <ExclamationTriangleIcon className={iconClass} aria-hidden="true" />;
      case 'info':
        return <InformationCircleIcon className={iconClass} aria-hidden="true" />;
      default:
        return <XCircleIcon className={iconClass} aria-hidden="true" />;
    }
  };

  return (
    <div className={`error-container ${variantClass} ${className}`}>
      <div className="error-content">
        <div className="error-icon-container">
          {getIcon()}
        </div>
        <div className="error-body">
          <h3 className={titleClass}>{title}</h3>
          <div className={`error-message-container ${messageClass}`}>
            <p>{message}</p>
          </div>
          {(onRetry || actions) && (
            <div className="error-actions">
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                >
                  Try again
                </Button>
              )}
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Error.FullPage component
 * Displays a full page error message with retry button
 */
Error.FullPage = function ErrorFullPage({
  title = 'Something went wrong',
  message = 'We encountered an error while loading the page. Please try again.',
  onRetry,
  className = '',
  variant = 'error',
  actions,
}: ErrorProps) {
  // Icon based on variant
  const getIcon = () => {
    switch (variant) {
      case 'error':
        return <XCircleIcon className="error-fullpage-icon-error" aria-hidden="true" />;
      case 'warning':
        return <ExclamationTriangleIcon className="error-fullpage-icon-warning" aria-hidden="true" />;
      case 'info':
        return <InformationCircleIcon className="error-fullpage-icon-info" aria-hidden="true" />;
      default:
        return <ExclamationCircleIcon className="error-fullpage-icon-error" aria-hidden="true" />;
    }
  };

  return (
    <div className={`error-fullpage ${className}`}>
      <div className="error-fullpage-icon-container">
        {getIcon()}
      </div>
      <h2 className="error-fullpage-title">{title}</h2>
      <p className="error-fullpage-message">{message}</p>
      <div className="error-fullpage-actions">
        {onRetry && (
          <Button
            variant={variant === 'error' ? 'danger' : variant === 'warning' ? 'secondary' : 'primary'}
            size="md"
            onClick={onRetry}
          >
            Try again
          </Button>
        )}
        {actions}
      </div>
    </div>
  );
};

/**
 * Error.Banner component
 * Displays a banner error message at the top of the page
 */
Error.Banner = function ErrorBanner({
  title,
  message,
  onRetry,
  className = '',
  variant = 'error',
  actions,
}: ErrorProps) {
  // Using CSS classes from index.css
  const bannerClass = `error-banner-${variant}`;

  // Icon based on variant
  const getIcon = () => {
    switch (variant) {
      case 'error':
        return <XCircleIcon className="error-banner-icon" aria-hidden="true" />;
      case 'warning':
        return <ExclamationTriangleIcon className="error-banner-icon" aria-hidden="true" />;
      case 'info':
        return <InformationCircleIcon className="error-banner-icon" aria-hidden="true" />;
      default:
        return <XCircleIcon className="error-banner-icon" aria-hidden="true" />;
    }
  };

  return (
    <div className={`${bannerClass} ${className}`}>
      <div className="error-banner-content">
        <div className="error-banner-flex">
          <div className="error-banner-message-container">
            <span className="error-banner-icon-container">
              {getIcon()}
            </span>
            <p className="error-banner-message">
              {title && <span className="md:hidden">{title}</span>}
              <span className="hidden md:inline">{title ? `${title}: ` : ''}{message}</span>
              <span className="md:hidden">{!title && message}</span>
            </p>
          </div>
          {(onRetry || actions) && (
            <div className="error-banner-actions">
              <div className="error-banner-actions-container">
                {onRetry && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="error-banner-button"
                  >
                    Try again
                  </Button>
                )}
                {actions}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Error.Toast component
 * Displays a toast error message
 */
Error.Toast = function ErrorToast({
  title,
  message,
  onRetry,
  onClose,
  className = '',
  variant = 'error',
}: ErrorProps & { onClose?: () => void }) {
  // Using CSS classes from index.css
  const toastClass = `error-toast-${variant}`;
  const iconClass = `error-icon-${variant}`;
  const titleClass = `error-title-${variant}`;
  const messageClass = `error-message-${variant}`;

  // Icon based on variant
  const getIcon = () => {
    switch (variant) {
      case 'error':
        return <XCircleIcon className={iconClass} aria-hidden="true" />;
      case 'warning':
        return <ExclamationTriangleIcon className={iconClass} aria-hidden="true" />;
      case 'info':
        return <InformationCircleIcon className={iconClass} aria-hidden="true" />;
      default:
        return <XCircleIcon className={iconClass} aria-hidden="true" />;
    }
  };

  return (
    <div className={`error-toast ${toastClass} ${className}`}>
      <div className="error-toast-content">
        <div className="error-icon-container">
          {getIcon()}
        </div>
        <div className="error-body">
          {title && <h3 className={titleClass}>{title}</h3>}
          <div className={`error-message-container ${title ? 'mt-1' : ''} ${messageClass}`}>
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="xs"
                onClick={onRetry}
              >
                Try again
              </Button>
            </div>
          )}
        </div>
        {onClose && (
          <div className="error-toast-close">
            <button
              type="button"
              className="error-toast-close-button"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
