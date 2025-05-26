import React, { createContext, useContext, ReactNode } from 'react';
import { Photo } from '../types/pexels.d'; 
import usePexelsApi from '../hooks/usePexelsApi'; 


interface ImageContextType {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  searchImages: (query: string) => Promise<void>;
  loadMoreImages: () => Promise<void>;
  hasMore: boolean;
  currentSearchQuery: string;
  currentPage: number;
}


const ImageContext = createContext<ImageContextType | undefined>(undefined);


export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const {
    photos,
    loading,
    error,
    searchImages,
    loadMoreImages,
    hasMore,
    currentQuery,
    currentPage,
  } = usePexelsApi();

  
  const contextValue: ImageContextType = {
    photos,
    loading,
    error,
    searchImages,
    loadMoreImages,
    hasMore,
    currentSearchQuery: currentQuery,
    currentPage: currentPage,
  };

  return (
   
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};


export const useImage = () => {
  const context = useContext(ImageContext);

  
  if (context === undefined) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};