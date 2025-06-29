import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Header component
 * Provides a consistent header with navigation for all pages
 * Based on Tailwind UI blocks design: https://tailwindcss.com/plus/ui-blocks/marketing/elements/headers
 */
const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="flex">
            <div className="header-logo-container">
              <h1 className="header-logo">Cat Lovers App</h1>
            </div>
            {/* Desktop navigation */}
            <nav className="header-nav">
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                Random Cats
              </Link>
              <Link
                to="/breeds"
                className={`nav-link ${isActive('/breeds') ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                Breeds
              </Link>
              <Link
                to="/favorites"
                className={`nav-link ${isActive('/favorites') ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                Favorites
              </Link>
            </nav>
          </div>
          <div className="header-actions">
            {/* GitHub link (hidden on mobile) */}
            <div className="github-link-container">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                <span className="sr-only">GitHub</span>
                <svg className="github-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="mobile-menu-button"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="mobile-menu-icon" aria-hidden="true" />
              ) : (
                <Bars3Icon className="mobile-menu-icon" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}
          id="mobile-menu"
        >
          <div className="mobile-menu-container">
            <Link
              to="/"
              className={`mobile-nav-link ${isActive('/') ? 'mobile-nav-link-active' : 'mobile-nav-link-inactive'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Random Cats
            </Link>
            <Link
              to="/breeds"
              className={`mobile-nav-link ${isActive('/breeds') ? 'mobile-nav-link-active' : 'mobile-nav-link-inactive'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Breeds
            </Link>
            <Link
              to="/favorites"
              className={`mobile-nav-link ${isActive('/favorites') ? 'mobile-nav-link-active' : 'mobile-nav-link-inactive'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
