import { useState, useEffect, useCallback } from 'react';
import { Photo, PexelsSearchResponse } from '../types/pexels';

interface UsePexelsApiResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  searchImages: (query: string, page?: number, perPage?: number) => Promise<void>;
  loadMoreImages: () => Promise<void>;
  hasMore: boolean;
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
  const [query, setQuery] = useState<string>('');
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
      const url = new URL(`${BASE_URL}/search`);
      url.searchParams.append('query', searchQuery);
      url.searchParams.append('page', String(pageNum));
      url.searchParams.append('per_page', String(perPage));

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': PEXELS_API_KEY,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data: PexelsSearchResponse = await response.json();





      
      const { photos: newPhotos, total_results, page: currentPage, per_page: currentPerPage } = data;

      if (pageNum === 1) {
        setPhotos(newPhotos);
      } else {
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
      }

      setTotalResults(total_results);

      setHasMore(currentPage * currentPerPage < total_results);

    } catch (err) {
      if (err instanceof Error) {
        setError(`Error fetching images: ${err.message}`);
        console.error("Fetch Pexels API error:", err);
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