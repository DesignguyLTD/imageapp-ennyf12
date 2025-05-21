import React, { useState } from 'react';
import styles from '../App.module.css';
{/*import { FaBars, FaTimes } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';*/}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>DesignGuy Img</h1>
      </div>

  {/* <div className={styles.menuIcon} onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>*/}

      <div
        className={`${styles.navLinks} ${
          isMobileMenuOpen ? styles.navActive : ''
        }`}
      >    
      <ul className={styles.list}>
        <li>Graphics </li>
        <li>Illustration</li>
        <li>Images</li>
        <li>3D</li>
        <li>GIFs</li>
        <li>Music</li>
        <li>NFTs</li>
    </ul>

      <div className={styles.buttonWrapper}>
        <button className={styles.loginButton}>Login / Sign up</button>
      </div>

      </div>

    </nav>
  );
};

export default Navbar;
