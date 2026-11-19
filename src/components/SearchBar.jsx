import { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [search, setSearch] = useState('');

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <span className="searchbar-icon">🔍</span>
        <input
          type="text"
          placeholder="Search news, projects, members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="searchbar-input"
        />
        <span className="searchbar-shortcut">⌘K</span>
      </div>
    </div>
  );
}

export default SearchBar;
