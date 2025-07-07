// src/components/NavBar/NavBar.tsx

import React, { useState, useEffect } from 'react'; // Keep useState and useEffect for mobile menu toggle only
import styles from './NavBar.module.css';

import Logo from '../logo/Logo';
import NavLink from '../navlink/NavLink';
import Buttons from '../button/Buttons';

export interface NavBarProps {
  isLoggedIn?: boolean;
  activeNavLink?: string;
  forceMobileMenuOpen?: boolean; // For Storybook ONLY
}

const NavBar: React.FC<NavBarProps> = ({
  isLoggedIn = false,
  activeNavLink = '',
  forceMobileMenuOpen = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // REMOVE: const [isMobileView, setIsMobileView] = useState(false);

  // Effect to set initial menu state from prop (for Storybook demos)
  useEffect(() => {
    setIsMobileMenuOpen(forceMobileMenuOpen);
  }, [forceMobileMenuOpen]);

  // REMOVE: useEffect for window.innerWidth (isMobileView logic)
  /*
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);
  */

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuClassName = `${styles.navbarNav} ${isMobileMenuOpen ? styles.open : ''}`;

  return (
    <nav className={styles.navbar}>
      {/* 1. Left section: Logo */}
      <div className={styles.navbarLeft}>
        <Logo text="DesignGuy Img" />
      </div>

      {/* 2. Center section: Main Navigation Links (ALWAYS RENDERED IN JSX, HIDDEN/SHOWN BY CSS) */}
      {/* This div is for desktop layout. It will be hidden on tablet/mobile by CSS. */}
      <div className={styles.navbarNavDesktop}>
        <NavLink href="/graphics" hasDropdown isSelected={activeNavLink === 'Graphics'}>
          Graphics
        </NavLink>
        <NavLink href="/illustration" hasDropdown isSelected={activeNavLink === 'Illustration'}>
          Illustration
        </NavLink>
        <NavLink href="/images" hasDropdown isSelected={activeNavLink === 'Images'}>
          Images
        </NavLink>
        <NavLink href="/3d" isSelected={activeNavLink === '3D'}>
          3D
        </NavLink>
        <NavLink href="/gifs" isSelected={activeNavLink === 'GIFs'}>
          GIFs
        </NavLink>
        <NavLink href="/music" isSelected={activeNavLink === 'Music'}>
          Music
        </NavLink>
        <NavLink href="/nfts" isSelected={activeNavLink === 'NFTs'}>
          NFTs
        </NavLink>
      </div>

      {/* 3. Right section: Desktop Action Button (ALWAYS RENDERED IN JSX, HIDDEN/SHOWN BY CSS) and Hamburger Icon */}
      <div className={styles.navbarRight}>
        {/* This button is for desktop layout. It will be hidden on tablet/mobile by CSS. */}
        <div className={styles.desktopOnlyButton}> {/* NEW: Wrapper for desktop button */}
          <Buttons variant="primary">Login / Sign Up</Buttons>
        </div>

        {/* Hamburger Menu Icon (displayed on tablet/mobile by CSS) */}
        <button
          className={styles.menuIcon}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>


      {/* 4. Collapsible Navigation Menu (Mobile/Tablet ONLY) - hidden/shown by CSS and isMobileMenuOpen state */}
      <div className={mobileMenuClassName}>
        {/* Individual Nav Links (duplicated for mobile dropdown) */}
        <NavLink href="/graphics" hasDropdown isSelected={activeNavLink === 'Graphics'}>
          Graphics
        </NavLink>
        <NavLink href="/illustration" hasDropdown isSelected={activeNavLink === 'Illustration'}>
          Illustration
        </NavLink>
        <NavLink href="/images" hasDropdown isSelected={activeNavLink === 'Images'}>
          Images
        </NavLink>
        <NavLink href="/3d" isSelected={activeNavLink === '3D'}>
          3D
        </NavLink>
        <NavLink href="/gifs" isSelected={activeNavLink === 'GIFs'}>
          GIFs
        </NavLink>
        <NavLink href="/music" isSelected={activeNavLink === 'Music'}>
          Music
        </NavLink>
        <NavLink href="/nfts" isSelected={activeNavLink === 'NFTs'}>
          NFTs
        </NavLink>
        {/* The Login/Signup button that appears inside the dropdown on mobile/tablet */}
        <div className={styles.mobileOnlyButton}>
          <Buttons variant="primary" style={{ width: '100%' }}>Login / Sign Up</Buttons>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;