

import React, { useState } from 'react';
import styles from './NavBar.module.css';

import Logo from '../logo/Logo';
import Buttons from '../button/Buttons'; 

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
          <li className={isNavItemActive('Graphics') ? styles.selected : ''}>Graphics <span>▼</span></li>
          <li className={isNavItemActive('Illustration') ? styles.selected : ''}>Illustration <span>▼</span></li>
          <li className={isNavItemActive('Images') ? styles.selected : ''}>Images <span>▼</span></li>
          <li className={isNavItemActive('3D') ? styles.selected : ''}>3D</li>
          <li className={isNavItemActive('GIFs') ? styles.selected : ''}>GIFs</li>
          <li className={isNavItemActive('Music') ? styles.selected : ''}>Music</li>
          <li className={isNavItemActive('NFTs') ? styles.selected : ''}>NFTs</li>
        </ul>

        <div className={styles.buttonWrapper}>
          {isLoggedIn ? ( 
            <Buttons variant="primary" onClick={onLoginClick}>Logout</Buttons>
          ) : (
            <Buttons variant="primary" onClick={onLoginClick}>{loginButtonText}</Buttons>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;