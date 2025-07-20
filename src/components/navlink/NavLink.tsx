import React from 'react';
import styles from './NavLink.module.css';

interface NavLinkProps {
  children: React.ReactNode;
  href?: string;
  hasDropdown?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  href = '#',
  hasDropdown = false,
  isSelected = false,
  onClick,
  ...props
}) => {
  const className = `${styles.navLink} ${isSelected ? styles.selected : ''}`;

  return (
    <a href={href} className={className} onClick={onClick} {...props}>
      {children}
      {hasDropdown && <span className={styles.dropdownIndicator}>▼</span>}
    </a>
  );
};

export default NavLink;