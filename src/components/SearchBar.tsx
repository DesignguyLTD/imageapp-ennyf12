import React, { useState, useEffect } from 'react'; 
import styles from '../App.module.css'

interface SearchBarProps {
  
  onSearch: (query: string) => void;
  initialQuery?: string; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  
  const [inputValue, setInputValue] = useState(initialQuery);

  
  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  
  const handleSearchTrigger = () => {
   
    if (inputValue.trim()) {
      onSearch(inputValue.trim()); 
    }
  };

  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    
    if (event.key === 'Enter') {
      handleSearchTrigger(); 
    }
  };

  return (
    <div className={styles.search}>
    <form  className={styles.input}>
      <input
      className={styles.inputboxs}
        type="text"
        placeholder="Search for your images"  
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        onKeyPress={handleKeyPress} 
      />
      <button
        onClick={handleSearchTrigger} 
        className={styles.inputsubmit}
      >
        Go
      </button>
    </form>
    </div>
  );
};

export default SearchBar;