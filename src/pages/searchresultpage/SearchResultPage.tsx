// src/pages/SearchResultPage/SearchResultPage.tsx

import React, { useEffect } from 'react';
// UPDATED: Import styles from its own CSS Module
import styles from './SearchResultPage.module.css';
import SearchBar from '../../components/searchinput/SearchInput'; // Adjust path based on your SearchInput
import ImageGrid from '../../components/imagegrid/ImageGrid'; // Adjust path based on your ImageGrid
import { useLocation, useNavigate } from 'react-router-dom';
import usePexelsApi from '../../hook/UsePexelApi'; // Adjust path if needed

const SearchResultPage: React.FC = () => {
  const { photos, loading, error, searchImages, loadMoreImages, hasMore, currentQuery } = usePexelsApi();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const queryFromPath = pathSegments[pathSegments.length - 1];

    if (queryFromPath && queryFromPath !== currentQuery && queryFromPath !== 'search') {
      const decodedQuery = decodeURIComponent(queryFromPath);
      searchImages(decodedQuery);
    } else if (!queryFromPath && !currentQuery) {
      // Handle initial load or no query
      // This might trigger a default search or display an empty state message
      // Example: searchImages('popular'); // Search for a default query
    }
  }, [location.pathname, searchImages, currentQuery]);

  const handleSearchBarSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className={styles.page}>
      <SearchBar
        onSearch={handleSearchBarSearch}
        initialValue={decodeURIComponent(currentQuery || '')} // Pass current query to SearchBar
      />
      <main>
        <h1 className={styles.mainh1}>
          Results for "{decodeURIComponent(currentQuery || '... loading')}"
        </h1>
        <ImageGrid
          photos={photos}
          loading={loading}
          error={error}
          loadMore={loadMoreImages}
          hasMore={hasMore}
          currentQuery={decodeURIComponent(currentQuery || '')}
        />
      </main>
    </div>
  );
};

export default SearchResultPage;