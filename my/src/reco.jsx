import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Ap } from './context';
import { Ap1 } from './moive1info';

const TMDB_API_KEY = 'a770818b6e61daa96a51b851678a84b2';

function App3() {
  const [response, setResponse] = useState(null);
  const [movieDetails, setMovieDetails] = useState([]);
  const [error, setError] = useState('');

  const movieName1 = useContext(Ap);
  const movieName2 = useContext(Ap1);
  const movieName = movieName1 || movieName2;

  const fetchRecommendations = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/test1/', {
        movie_name: movieName,
      });
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Something went wrong! Please check the server or input.');
      setResponse(null);
    }
  };

  const fetchMovieDetails = async (movieTitles) => {
    try {
      const details = await Promise.all(
        movieTitles.map(async (title) => {
          try {
            const res = await axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`
            );
            const movie = res.data.results?.[0];
            return {
              title,
              poster: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image',
              rating: movie?.vote_average || 'N/A',
              year: movie?.release_date?.split('-')[0] || 'N/A',
            };
          } catch {
            return {
              title,
              poster: 'https://via.placeholder.com/300x450?text=Error',
              rating: 'N/A',
              year: 'N/A',
            };
          }
        })
      );
      setMovieDetails(details);
    } catch (err) {
      console.error('Failed to load posters', err);
    }
  };

  useEffect(() => {
    if (movieName) {
      fetchRecommendations();
    }
  }, [movieName]);

  useEffect(() => {
    if (response?.recommendations) {
      fetchMovieDetails(response.recommendations);
    }
  }, [response]);

  return (
    <div
      className="container py-5"
      style={{
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        minHeight: '100vh',
      }}
    >
      <h2 className="text-center text-warning mb-4 display-5 fw-bold">
        🎬 Recommended Movies
      </h2>

      {error && (
        <div className="alert alert-danger text-center fw-bold">{error}</div>
      )}

      <div className="row justify-content-center">
        {response?.recommendations &&
          response?.recommendations1 &&
          movieDetails.map((movie, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <div
                className="card h-100 text-white shadow"
                style={{
                  background: 'linear-gradient(to bottom right, #434343, #000000)',
                  borderRadius: '12px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 24px rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(255, 255, 255, 0.05)';
                }}
              >
                <img
                  src={movie.poster}
                  className="card-img-top"
                  alt={movie.title}
                  style={{
                    width: '100%',
                    height: '360px',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    objectFit: 'cover',
                  }}
                />
                <div className="card-body px-2 py-3">
                  <h6 className="card-title text-center fw-semibold mb-2">
                    {movie.title}
                  </h6>
                  <p className="text-center mb-1">
                    <span className="badge rounded-pill bg-danger">
                      {response.recommendations1[index]}
                    </span>
                  </p>
                  <p
                    className="text-center"
                    style={{
                      fontSize: '0.9rem',
                      color: '#1abc9c',
                      fontWeight: '500',
                    }}
                  >
                    ⭐ {movie.rating} | 📅 {movie.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App3;
