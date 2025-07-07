import React, { useState, useEffect, useRef } from 'react'; // NEW: import useRef
import styles from './SearchInput.module.css';
import Buttons from '../button/Buttons';

interface SearchInputProps {
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
  isFocused?: boolean; // NEW: Prop to force focus state for Storybook
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search for your images',
  initialValue = '',
  onSearch,
  isFocused = false, // Default to false
}) => {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null); // NEW: Create a ref for the input

  // NEW: useEffect to apply focus when isFocused prop is true (for Storybook)
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus(); // Programmatically focus the input
    } else if (!isFocused && inputRef.current) {
      inputRef.current.blur(); // Remove focus if isFocused is false
    }
  }, [isFocused]); // Re-run effect when isFocused prop changes

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
        ref={inputRef} // NEW: Attach the ref to the input field
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