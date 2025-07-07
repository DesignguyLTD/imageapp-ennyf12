// src/components/ImageCard/ImageCard.tsx

import React from 'react';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  imageUrl?: string;         // The URL of the image to display
  title?: string;            // Optional text for title overlay
  slogan?: string;           // Optional text for slogan overlay
  onClick?: () => void;      // Click handler for the card
  isLoading?: boolean;       // NEW: Prop to indicate loading state
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  slogan,
  onClick,
  isLoading = false, // Default to false
  ...props
}) => {
  // Conditionally apply a loading class to the main container
  const cardClassName = `${styles.card} ${isLoading ? styles.loading : ''}`;

  return (
    // If loading, disable click and change cursor
    <div className={cardClassName} onClick={isLoading ? undefined : onClick} {...props}>
      {isLoading ? (
        // NEW: Render a loading placeholder if isLoading is true
        <div className={styles.loadingPlaceholder}>
          {/* Optional: Add a subtle shimmer effect here via CSS */}
        </div>
      ) : (
        // Render actual image content when not loading
        <>
          <img src={imageUrl} alt={title || 'Image'} className={styles.image} />

          {title && (
            <div className={styles.overlay}>
              <h3 className={styles.title}>{title}</h3>
            </div>
          )}

          {slogan && (
            <div className={styles.sloganOverlay}>
              <p className={styles.slogan}>{slogan}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageCard;