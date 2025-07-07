// src/components/Button/Buttons.tsx

import React from 'react';
import styles from './Button.module.css';

// Define the type for Buttons's props
interface ButtonsProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'download';
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  // NEW: Add disabled prop
  disabled?: boolean; // A boolean prop to control the disabled state
}

// Use the ButtonsProps interface here
const Buttons: React.FC<ButtonsProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  backgroundColor,
  disabled = false, // NEW: Give disabled a default value of false
  ...props
}) => {
  const className = `${styles.button} ${styles[variant]} ${styles[size]}`;
  const style = backgroundColor ? { backgroundColor } : {};

  return (
    // NEW: Pass the disabled prop directly to the HTML button element
    <button className={className} onClick={onClick} style={style} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Buttons;