
import React from 'react';
import styles from '../App.module.css'; 

interface CategoryCardProps {
  src: string;
  alt: string;
  label: string;
  textStyle?: string;
}
 const CategoryCard: React.FC<CategoryCardProps> = ({ src, alt, label, textStyle }) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.image} />
      <div className={textStyle || styles.text}>{label}</div>
    </div>
  );
};

export default CategoryCard;