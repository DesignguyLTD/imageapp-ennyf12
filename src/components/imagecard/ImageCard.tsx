

import React from 'react';
import { Photo } from '../../types/pexels';
import styles from './ImageCard.module.css';
import { Link } from 'react-router-dom';

interface ImageCardProps {
  photo: Photo;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo }) => {
  return (
    <Link to={`/download/${photo.id}`} className={styles.link}>
    <div className={styles.imageCard}>
      <img
        src={photo.src.tiny}
        alt={photo.alt || `Photo by ${photo.photographer}`}
        className={styles.image}
      />

      <div className={styles.textContainer}>

        <p className={styles.description}>
          {photo.alt || `Image by ${photo.photographer}`}
        </p>

        <p className={styles.photographerInfo}>
          Photographer:
            <span className={styles.photographerNameText}>
              {photo.photographer}
            </span>
        </p>
      </div>
    </div>
    </Link>
  );
};

export default ImageCard;