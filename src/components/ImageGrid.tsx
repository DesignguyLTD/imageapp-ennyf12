import React from 'react';
import { Photo } from '../types/pexels.d';
import ImageCard from './ImageCard';
import styles from '../App.module.css'; 

interface ImageGridProps {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
  currentQuery: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({ photos, loading, error, loadMore, hasMore, currentQuery }) => {
  if (loading && photos.length === 0) {
    return <p className={styles.message}>Loading images for "{currentQuery}"...</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>Error: {error}</p>;
  }

  if (photos.length === 0 && !loading && currentQuery) {
    return <p className={styles.message}>No images found for "{currentQuery}".</p>;
  }
  if (photos.length === 0 && !loading && !currentQuery) {
    return <p className={styles.message}>Start searching for images!</p>;
  }

  return (
    <div className={styles.gridContainer}>
      <div className={styles.imageGrid}>
        {photos.map(photo => (
          <ImageCard key={photo.id} photo={photo} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className={styles.loadMoreButton}
        >
          {loading ? 'Loading More...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default ImageGrid;