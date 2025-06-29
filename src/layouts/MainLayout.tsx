import React from 'react';
import { Link, Outlet } from 'react-router-dom';

/**
 * MainLayout component
 * Provides a consistent layout with navigation for all pages
 */
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Cat Lovers App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300">Random Cats</Link>
              </li>
              <li>
                <Link to="/breeds" className="hover:text-gray-300">Breeds</Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-gray-300">Favorites</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>footer</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
