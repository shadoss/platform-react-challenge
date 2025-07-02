import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Button, Error} from '../components/ui';
import { SEO } from '../components';
import {HomeIcon} from "@heroicons/react/24/outline";

interface NetworkErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

interface LocationState {
  message?: string;
  from?: string;
}

/**
 * NetworkErrorPage component
 * Displays an error page when there's a network error
 */
const NetworkErrorPage: React.FC<NetworkErrorPageProps> = ({
  message: propMessage,
  onRetry: propOnRetry
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  // Use message from location state if available, otherwise use prop or default
  const message = state?.message || propMessage || "We're having trouble connecting to our servers. Please check your internet connection and try again.";

  // We have the path in state?.from if needed

  const handleRetry = () => {
    if (propOnRetry) {
      propOnRetry();
    } else if (state?.from) {
      // Navigate back to the page the user was trying to access
      navigate(state.from);
    } else {
      // Default retry behavior: refresh the current page
      window.location.reload();
    }
  };

  return (
    <>
      <SEO
        title="Connection Error"
        description="We're having trouble connecting to our servers. Please check your internet connection and try again."
        canonicalUrl={window.location.href.split('?')[0]}
      />
      <Error.FullPage
        title="Connection Error"
        message={message}
        variant="error"
        onRetry={handleRetry}
        actions={
          <Button
              variant="primary"
              onClick={() => window.location.href = '/'}
              icon={<HomeIcon className="icon-small" />}
          >
            Go to Home
          </Button>
        }
      />
    </>
  );
};

export default NetworkErrorPage;
