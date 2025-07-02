import { lazy } from 'react';
import { createBrowserRouter, RouterProvider, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ErrorBoundary } from './components';

// Lazy load page components for better performance
const RandomCats = lazy(() => import('./pages/RandomCats'));
const Breeds = lazy(() => import('./pages/Breeds'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const NetworkErrorPage = lazy(() => import('./pages/NetworkErrorPage'));

/**
 * App component
 * Sets up the router configuration for the application with error handling
 */
export default function App() {
  // Create router configuration with error handling
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorHandler />,
      children: [
        {
          index: true,
          element: <RandomCats />,
        },
        {
          path: 'breeds',
          element: <Breeds />,
        },
        {
          path: 'favorites',
          element: <Favorites />,
        },
        {
          // Network error page
          path: 'network-error',
          element: <NetworkErrorPage />
        },
        {
          // 404 page - this will catch all unmatched routes
          path: '*',
          element: <NotFoundPage />
        }
      ],
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

/**
 * ErrorHandler component
 * Handles routing errors and displays appropriate error pages
 */
function ErrorHandler() {
  // useRouteError hook provides information about the error that occurred
  const error = useRouteError();

  // Check if it's a routing error (like 404)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />;
    }

    return (
      <NetworkErrorPage
        message={`${error.status} ${error.statusText}: ${error.data}`}
      />
    );
  }

  // For network errors
  if (error instanceof Error && error.message.includes('Failed to fetch')) {
    return <NetworkErrorPage />;
  }

  // For other errors
  return (
    <NetworkErrorPage
      message="An unexpected error occurred. Please try again later."
    />
  );
}
