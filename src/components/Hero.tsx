import React, { useState } from 'react';
import styles from '../App.module.css';
import { useNavigate } from 'react-router-dom'; 

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate(); 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    
    if (searchQuery.trim()) { 
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    } else {
      console.log('Search query is empty, not navigating.');
    }
  };

  return (
    <div className={styles.hero} >
      <div className={styles.texts}>
        <h1>All the assets you need in one place</h1>
        <p>
          Curated SVGs, Vector Icons, Illustrations, 3D graphics, and Lottie Animations.
          Over 7000+ new assets added every day. Integrated plugins, tools, editors, and more.
        </p>
        
        <form className={styles.input} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for your images"
            value={searchQuery}
            onChange={handleInputChange}
            className={styles.inputbox}
          />
          <button type="submit" className={styles.inputsubmit}>Go</button>
        </form>
      </div>
    </div>
  );
};

export default Hero;