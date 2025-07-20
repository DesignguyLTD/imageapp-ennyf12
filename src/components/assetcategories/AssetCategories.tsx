import React from 'react';
import styles from './AssetCategories.module.css';
import CategoryCard from '../categorycard/CategoryCard';

import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';

interface ImageItem {
  src: string;
  alt: string;
  label: string;
  textStyle?: string;
}

const images: ImageItem[] = [
  { src: image1, alt: 'Logo', label: 'Logo' },
  { src: image2, alt: 'Bundles/ Collections', label: 'Bundles/ Collections' },
  { src: image3, alt: 'Illustrations', label: 'Illustrations' },
  { src: image4, alt: 'Vector Creatives', label: 'Vector Creatives', textStyle: 'textss' },
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