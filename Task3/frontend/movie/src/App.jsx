import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import SearchBar from './SearchBar';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMovieClick = async (imdbID) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=441280de`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSelectedMovie(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      return;
    }
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=441280de`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=441280de`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMovies([]);
      }
    };

    if (searchTerm !== '') {
      fetchMovies();
    }
  }, [searchTerm]);

  return (
    <div className="app">
      <header className="header">
        <h1>Movie Exploration and Search System</h1>
        <SearchBar
          searchTerm={searchTerm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </header>
      <div className="content">
        <div className="left-panel">
          <h2>Trending Movies</h2>
          <MovieList
            movies={movies}
            handleMovieClick={handleMovieClick}
            selectedMovie={selectedMovie}
          />
        </div>
        <div className="right-panel">
          {selectedMovie && <MovieDetail movie={selectedMovie} />}
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Movie Exploration. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;