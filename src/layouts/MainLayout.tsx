import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';

/**
 * MainLayout component
 * Provides a consistent layout with navigation for all pages
 */
const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p className="footer-text">© 2023 Cat Lovers App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
