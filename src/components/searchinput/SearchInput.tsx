import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchInput.module.css';
import Buttons from '../button/Buttons';

interface SearchInputProps {
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
  isFocused?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search for your images',
  initialValue = '',
  onSearch,
  isFocused = false,
}) => {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    } else if (!isFocused && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isFocused]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchInputContainer}>
      <input
        ref={inputRef}
        type="text"
        className={styles.inputField}
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Buttons variant="primary" onClick={handleSearchClick} className={styles.searchButton}>
        Go
      </Buttons>
    </div>
  );
};

export default SearchInput;