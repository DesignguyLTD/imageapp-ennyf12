

import React from 'react';

import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  src: string;
  alt: string;
  label: string;
  textStyle?: string; 
  onClick?: () => void; 
}

const CategoryCard: React.FC<CategoryCardProps> = ({ src, alt, label, textStyle, onClick }) => {
  
  const labelClassName = textStyle ? `${styles.text} ${textStyle}` : styles.text;

  return (
    
    <div className={styles.container} onClick={onClick}>
      <img src={src} alt={alt} className={styles.image} />
      <div className={labelClassName}>{label}</div>
    </div>
  );
};

export default CategoryCard;