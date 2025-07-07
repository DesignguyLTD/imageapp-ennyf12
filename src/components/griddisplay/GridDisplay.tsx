// src/components/GridDisplay/GridDisplay.tsx

import React from 'react';
import styles from './GridDisplay.module.css';
import ImageCard from '../imagecard/ImageCard';

// Define the type for a single image item's data (when loaded)
interface ImageDataItem {
  id: string; // Unique ID for React keys
  imageUrl: string;
  title?: string;
  slogan?: string;
}

// Define the type for a loading placeholder item
interface LoadingPlaceholderData {
  id: string; // Unique ID for React keys (e.g., "loading-0")
  isLoading: true; // This explicitly marks it as a loading item
}

// Define the props interface for the GridDisplay component
interface GridDisplayProps {
  items: ImageDataItem[]; // Array of real image data
  isLoading?: boolean;   // Global loading state for the entire grid
  loadingCardCount?: number; // How many loading cards to show if isLoading is true
}

const GridDisplay: React.FC<GridDisplayProps> = ({
  items,
  isLoading = false,
  loadingCardCount = 8,
}) => {
  // Create an array that is either actual ImageDataItems or LoadingPlaceholderData
  const displayItems: (ImageDataItem | LoadingPlaceholderData)[] = isLoading
    ? // If loading, create an array of LoadingPlaceholderData objects
      Array.from({ length: loadingCardCount }).map((_, index) => ({ id: `loading-${index}`, isLoading: true }))
    : // If not loading, use the actual items (which are ImageDataItem)
      items;

  return (
    <div className={styles.gridContainer}>
      {displayItems.map((item) => {
        // Use a type guard to differentiate between real data and loading placeholders
        if ('isLoading' in item && item.isLoading === true) {
          // If this 'item' is a LoadingPlaceholderData (it has isLoading: true)
          return <ImageCard key={item.id} isLoading={true} />;
        } else {
          // If it's not a loading placeholder, it must be real ImageDataItem
          const realItem = item as ImageDataItem; // Cast to ImageDataItem for TypeScript
          return (
            <ImageCard
              key={realItem.id}
              imageUrl={realItem.imageUrl}
              title={realItem.title}
              slogan={realItem.slogan}
              isLoading={false} // Explicitly false for real items
            />
          );
        }
      })}
    </div>
  );
};

export default GridDisplay;