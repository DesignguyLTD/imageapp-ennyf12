

import React from 'react';
import styles from './Logo.module.css';
import { Link } from 'react-router-dom';
interface LogoProps {
  
  text?: string;
}


const Logo: React.FC<LogoProps> = ({ text = 'DesignGuy Img' }) => {
  return (
    <Link to='/' className={styles.logo}>
      {text}
    </Link>
  );
};

export default Logo;