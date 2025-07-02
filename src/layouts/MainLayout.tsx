import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';
import { Loading } from '../components/ui';

/**
 * MainLayout component
 * Provides a consistent layout with navigation for all pages
 */
const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Suspense fallback={
          <div className="loading-section-container">
            <Loading.Section text="Loading page..." variant="dots" />
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p className="footer-text">© 2025 Cat Lovers App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
