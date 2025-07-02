import React from 'react';
import {Button, Error} from '../components/ui';
import {HomeIcon} from "@heroicons/react/24/outline";
import { SEO } from '../components';

/**
 * NotFoundPage component
 * Displays a 404 error page when a user navigates to a non-existent route
 */
const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        canonicalUrl={window.location.href.split('?')[0]}
      />
      <Error.FullPage
        title="Page not found"
        message="The page you're looking for doesn't exist or has been moved."
        variant="warning"
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

export default NotFoundPage;
