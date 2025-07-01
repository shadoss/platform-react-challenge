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
