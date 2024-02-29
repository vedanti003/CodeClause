// MovieList.jsx
import React, { useState } from 'react';
import './movieList.css';

const MovieList = ({ movies, handleMovieClick, selectedMovie }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className={selectedMovie === movie ? 'movie selected' : 'movie'}
          onClick={() => handleMovieClick(movie.imdbID)}
        >
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <p>({movie.Year})</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
