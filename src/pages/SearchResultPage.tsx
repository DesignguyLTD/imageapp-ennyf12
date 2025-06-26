import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';
import { useLocation, useNavigate } from 'react-router-dom';
import usePexelsApi from '../hook/UsePexelApi';
import styles from '../App.module.css'

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
        initialQuery={currentQuery}
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