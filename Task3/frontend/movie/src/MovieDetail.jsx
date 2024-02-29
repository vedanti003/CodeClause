// MovieDetail.jsx
import React from 'react';
import './movieDetail.css';

const MovieDetail = ({ movie }) => {
  if (!movie) {
    return <div className="movie-detail">No movie selected</div>;
  }

  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Ratings,
    Metascore,
    imdbRating,
    imdbVotes,
    imdbID,
    Type,
    DVD,
    BoxOffice,
    Production,
    Website,
    Poster
  } = movie;

  return (
    <div className="movie-detail">
      <img src={Poster} alt={Title} />
      <h2>{Title}</h2>
      <p><strong>Year:</strong> {Year}</p>
      <p><strong>Rated:</strong> {Rated}</p>
      <p><strong>Released:</strong> {Released}</p>
      <p><strong>Runtime:</strong> {Runtime}</p>
      <p><strong>Genre:</strong> {Genre}</p>
      <p><strong>Director:</strong> {Director}</p>
      <p><strong>Writer:</strong> {Writer}</p>
      <p><strong>Actors:</strong> {Actors}</p>
      <p><strong>Plot:</strong> {Plot}</p>
      <p><strong>Language:</strong> {Language}</p>
      <p><strong>Country:</strong> {Country}</p>
      <p><strong>Awards:</strong> {Awards}</p>
      {Ratings && (
        <div>
          <p><strong>Ratings:</strong></p>
          <ul>
            {Ratings.map((rating, index) => (
              <li key={index}>{rating.Source}: {rating.Value}</li>
            ))}
          </ul>
        </div>
      )}
      <p><strong>Metascore:</strong> {Metascore}</p>
      <p><strong>IMDb Rating:</strong> {imdbRating}</p>
      <p><strong>IMDb Votes:</strong> {imdbVotes}</p>
      <p><strong>IMDb ID:</strong> {imdbID}</p>
      <p><strong>Type:</strong> {Type}</p>
      <p><strong>DVD:</strong> {DVD}</p>
      <p><strong>Box Office:</strong> {BoxOffice}</p>
      <p><strong>Production:</strong> {Production}</p>
      <p><strong>Website:</strong> {Website}</p>
    </div>
  );
};

export default MovieDetail;
