import React, { useState } from 'react';
import styles from '../App.module.css';

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

interface ImageItem {
  src: string;
  alt: string;
  label: string;
  textStyle?: string; // optional for custom text class
}

const images: ImageItem[] = [
  { src: image1, alt: 'Sample 1', label: 'Logo' },
  { src: image2, alt: 'Sample 2', label: 'Bundles/ Collections' },
  { src: image3, alt: 'Sample 3', label: 'Illustrations' },
  { src: image4, alt: 'Sample 4', label: 'Vector Creatives', textStyle: styles.textss },
];

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Optionally call props.onSearch?.(searchQuery)
  };

  return (
    <div className={styles.hero}>
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

      <div className={styles.images}>
        {images.map((img, index) => (
          <div key={index} className={styles.container}>
            <img src={img.src} alt={img.alt} className={styles.image} />
            <div className={img.textStyle || styles.text}>{img.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
