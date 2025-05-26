import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar'; 
import ImageGrid from '../components/ImageGrid'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import { useImage } from '../context/ImageContext'; 
import styles from '../App.module.css'
const SearchResultPage: React.FC = () => {
  const { photos, loading, error, searchImages, loadMoreImages, hasMore, currentSearchQuery } = useImage();
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pathSegments = location.pathname.split('/');
    const queryFromPath = pathSegments[pathSegments.length - 1];

    if (queryFromPath && queryFromPath !== currentSearchQuery && queryFromPath !== 'search') {
      const decodedQuery = decodeURIComponent(queryFromPath);
      searchImages(decodedQuery);
    } else if (!queryFromPath && !currentSearchQuery) {
        
    }
  }, [location.pathname, searchImages, currentSearchQuery]); 

  
  const handleSearchBarSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);  
    }
  };

  return (
    <div className={styles.page}>
      <SearchBar
            onSearch={handleSearchBarSearch}
            initialQuery={currentSearchQuery}
          />
      <main>
        <h1 className={styles.mainh1}>
          Results for "{decodeURIComponent(currentSearchQuery || '... loading')}"
        </h1>
        <ImageGrid
          photos={photos}
          loading={loading}
          error={error}
          loadMore={loadMoreImages}
          hasMore={hasMore}
          currentQuery={decodeURIComponent(currentSearchQuery || '')}
        />
      </main>
    </div>
  );
};

export default SearchResultPage;