// src/components/Logo/Logo.tsx

import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  // We can add props later if the logo changes (e.g., 'src' for an image logo, 'alt')
  // For now, it's just text
  text?: string;
}

const Logo: React.FC<LogoProps> = ({ text = 'DesignGuy Img' }) => {
  return (
    <div className={styles.logo}>
      {text}
    </div>
  );
};

export default Logo;