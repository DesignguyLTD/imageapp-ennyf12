import React from 'react';
import styles from './Button.module.css';

interface ButtonsProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'download';
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  disabled?: boolean;
}

const Buttons: React.FC<ButtonsProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  backgroundColor,
  disabled = false,
  ...props
}) => {
  const className = `${styles.button} ${styles[variant]} ${styles[size]}`;
  const style = backgroundColor ? { backgroundColor } : {};

  return (
    <button className={className} onClick={onClick} style={style} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Buttons;