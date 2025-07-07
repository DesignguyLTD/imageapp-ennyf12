// src/components/NavLink/NavLink.tsx

import React from 'react';
import styles from './NavLink.module.css';

interface NavLinkProps {
  children: React.ReactNode; // The text of the link (e.g., "Graphics")
  href?: string;             // The URL the link points to
  hasDropdown?: boolean;     // Whether to show a dropdown indicator
  isSelected?: boolean;      // NEW: To indicate the current active page
  onClick?: () => void;      // Optional click handler
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  href = '#', // Default to '#' if no href is provided
  hasDropdown = false,
  isSelected = false, // Default to false
  onClick,
  ...props
}) => {
  // Apply base class and conditional 'selected' class
  const className = `${styles.navLink} ${isSelected ? styles.selected : ''}`;

  return (
    <a href={href} className={className} onClick={onClick} {...props}>
      {children}
      {hasDropdown && <span className={styles.dropdownIndicator}>▼</span>} {/* Dropdown indicator */}
    </a>
  );
};

export default NavLink;