// SearchBar.jsx
import React from 'react';
import './searchBar.css';

const SearchBar = ({ searchTerm, handleChange, handleSubmit }) => {
  const onSubmit = (e) => {
    e.preventDefault(); 
    if (searchTerm.trim() !== '') {
      handleSubmit(e); 
    }  
  };

  return (
    <form onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="Search for movies..."
      value={searchTerm}
      onChange={handleChange}
    />
    <button type="submit">Search</button>
  </form>
  
  );
};

export default SearchBar;