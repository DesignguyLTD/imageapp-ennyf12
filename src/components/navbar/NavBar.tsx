'use client';

import React, { useState } from 'react';
import styles from './NavBar.module.css';

import Buttons from '../button/Buttons';
import { useAuth0 } from '@auth0/auth0-react';
import Logo from '../logo/Logo';



export interface NavBarProps {
  forceMobileMenuOpen?: boolean;
  
  activeNavLink?: string;
  
  loginButtonText?: string;
  onLoginClick?: () => void;
  
  isLoggedIn?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  forceMobileMenuOpen = false,
  activeNavLink = '', 
  loginButtonText = 'Login / Sign Up', 
  onLoginClick, 
  isLoggedIn = false, 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(forceMobileMenuOpen);

  const toggleMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  const isNavItemActive = (navText: string) => navText === activeNavLink;

  return (
    <nav className={styles.navbar}>
      <Logo text="DesignGuy Img" />
      
      <button className={styles.menuIcon} onClick={toggleMenu} aria-expanded={isMobileMenuOpen} aria-label="Toggle navigation menu">
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <div
        className={`${styles.navLinks} ${
          isMobileMenuOpen ? styles.navActive : ''
        }`}
      >
        <ul className={styles.list}>
          {/* Apply styles.selected class conditionally */}
          <li className={isNavItemActive('Graphics') ? styles.selected : ''}>Graphics<span>▼</span></li>
          <li className={isNavItemActive('Illustration') ? styles.selected : ''}>Illustration<span>▼</span></li>
          <li className={isNavItemActive('Images') ? styles.selected : ''}>Images<span>▼</span></li>
          <li className={isNavItemActive('3D') ? styles.selected : ''}>3D</li>
          <li className={isNavItemActive('GIFs') ? styles.selected : ''}>GIFs</li>
          <li className={isNavItemActive('Music') ? styles.selected : ''}>Music</li>
          <li className={isNavItemActive('NFTs') ? styles.selected : ''}>NFTs</li>
        </ul>

        <div className={styles.buttonWrapper}>
          {isLoading ? (
            <Buttons variant="primary">Loading...</Buttons>
          ) : (
            isAuthenticated ? (
              // Now using the Buttons component for logout
              <Buttons 
                variant="primary" 
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                Log Out
              </Buttons>
            ) : (
              // Using the Buttons component for login as well
              <Buttons variant="primary" onClick={() => loginWithRedirect()}>
                Log In
              </Buttons>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
