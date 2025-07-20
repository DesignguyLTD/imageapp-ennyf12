

import React from 'react'; 
import styles from './Hero.module.css';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../searchinput/SearchInput';

const Hero: React.FC = () => {
 const navigate = useNavigate();

  
  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    } else {
      console.log('Search query is empty, not navigating.');
    }
  };

  return (
    <div className={styles.hero} >
      <div className={styles.texts}>
        <h1>All the assets you need in one place</h1>
        <p>
          Curated SVGs, Vector Icons, Illustrations, 3D graphics, and Lottie Animations. Over 7000+ new assets added every day. Integrated plugins, tools, editors, and more.
        </p>
  
        <SearchInput
          placeholder="Search for your images"
          onSearch={handleSearchSubmit}
          
        />
        </div>
    </div>
  );
};

export default Hero;