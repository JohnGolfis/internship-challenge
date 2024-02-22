import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

// state to store and navigate with React Router
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // handles search button and navigate back to the search results page
  const handleSearch = () => {
    onSearch(searchTerm);
    navigate('/');
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
