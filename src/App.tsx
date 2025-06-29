import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import RandomCats from './pages/RandomCats';
import Breeds from './pages/Breeds';
import Favorites from './pages/Favorites';

/**
 * App component
 * Sets up the router configuration for the application
 */
export default function App() {
  // Create router configuration
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
