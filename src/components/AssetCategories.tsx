
import React from 'react';
import CategoryCard  from './CategoryCard';
import styles from '../App.module.css'; 

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';


interface ImageItem {
  src: string;
  alt: string;
  label: string;
  textStyle?: string; 
}


const images: ImageItem[] = [
  { src: image1, alt: 'Sample 1', label: 'Logo' },
  { src: image2, alt: 'Sample 2', label: 'Bundles/ Collections' },
  { src: image3, alt: 'Sample 3', label: 'Illustrations' },
  { src: image4, alt: 'Sample 4', label: 'Vector Creatives', textStyle: styles.textss },
];
const AssetCategories: React.FC = () => {
  return (
    <div className={styles.images}> 
      {images.map((img, index) => (
        <CategoryCard
          key={index} 
          src={img.src}
          alt={img.alt}
          label={img.label}
          textStyle={img.textStyle}
        />
      ))}
    </div>
  );
};

export default AssetCategories;