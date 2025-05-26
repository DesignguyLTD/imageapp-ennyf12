import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Photo, PexelsSearchResponse } from '../types/pexels'; // Import your types

interface UsePexelsApiResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  searchImages: (query: string, page?: number, perPage?: number) => Promise<void>;
  loadMoreImages: () => Promise<void>;
  hasMore: boolean;
  // Expose the current search term and page (useful for displaying status)
  currentQuery: string;
  currentPage: number;
}


const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1';
const usePexelsApi = (): UsePexelsApiResult => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>(''); // Stores the currently searched query
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);

  const fetchImages = useCallback(async (searchQuery: string, pageNum: number, perPage: number = 24) => {
    if (!PEXELS_API_KEY) {
      setError("Pexels API key not found. Please set REACT_APP_PEXELS_API_KEY in your .env.local file.");
      console.error("Pexels API key is missing!");
      return;
    }

    setLoading(true); 
    setError(null);

    try {
      const response = await axios.get<PexelsSearchResponse>(
        `${BASE_URL}/search`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: searchQuery,
            page: pageNum,
            per_page: perPage,
          },
        }
      );

      const { photos: newPhotos, total_results, page: currentPage, per_page: currentPerPage } = response.data;

      if (pageNum === 1) {
        setPhotos(newPhotos);
      } else { 
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]); 
      }

      setTotalResults(total_results);
      
      setHasMore(currentPage * currentPerPage < total_results);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        
        setError(`Error fetching images: ${err.response?.status || 'Unknown Status'} - ${err.response?.statusText || 'No Status Text'}. Message: ${err.message}`);
        console.error("Axios Pexels API error:", err.response || err);
      } else {
        setError("An unexpected error occurred while fetching images.");
        console.error("Generic Pexels API error:", err);
      }
    } finally {
      setLoading(false);
    }
  }, []); 
  const searchImages = useCallback(async (searchQuery: string, initialPage: number = 1, perPage: number = 24) => {
    setQuery(searchQuery); 
    setPage(initialPage);   
    await fetchImages(searchQuery, initialPage, perPage);
  }, [fetchImages]);


  const loadMoreImages = useCallback(async () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1; 
    setPage(nextPage);
    await fetchImages(query, nextPage); 
  }, [loading, hasMore, page, query, fetchImages]);

  return {
    photos,
    loading,
    error,
    searchImages,
    loadMoreImages,
    hasMore,
    currentQuery: query,  
    currentPage: page,   
  };
};

export default usePexelsApi;