import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import './App.css'; 
const backnend = process.env.REACT_APP_URL;

function Npas() {
  const [data, setData] = useState([]);
  const [len1, setLen1] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 3; 
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios(`${backnend}/movieg2`);
      setData(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if ((len1 + 1) * itemsPerPage < data.length) {
      setLen1((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (len1 > 0) {
      setLen1((prev) => prev - 1);
    }
  };

  const currentPageItems = data.slice(len1 * itemsPerPage, (len1 + 1) * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const isFirstPage = len1 === 0;
  const isLastPage = len1 === totalPages - 1;

  useEffect(() => {
    fetchData();
  }, []);

  const handleMovieClick = (product) => {
    if (product?._id) {
      navigate("/movie3", { state: { npa1: product._id } });
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading top content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>{error}</p>
        <button onClick={fetchData} style={styles.retryButton}>Retry</button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>No movies available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
          }

          .npas-container {
            padding: 40px 20px;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            position: relative;
            color: #e5e5e5;
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
          }

          .npas-title {
            text-align: center;
            font-weight: 700;
            font-size: clamp(1.8rem, 4vw, 2.8rem);
            margin-bottom: 30px;
            color: #ff2e63;
            letter-spacing: -0.02em;
            animation: fadeInUp 0.6s ease-out;
            user-select: none;
          }

          .pagination-info {
            text-align: center;
            margin-bottom: 20px;
            font-size: 0.95rem;
            color: #999;
            font-weight: 500;
          }

          .movie-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: rgba(31, 31, 31, 0.5);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(255, 46, 99, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: fadeInUp 0.8s ease-out;
          }

          @media (max-width: 768px) {
            .movie-list {
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 16px;
              padding: 15px;
            }
          }

          @media (max-width: 480px) {
            .movie-list {
              grid-template-columns: 1fr;
              max-width: 100%;
            }
          }

          .movie-card {
            background: linear-gradient(145deg, #292929, #1f1f1f);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            cursor: pointer;
            border: 1px solid rgba(255, 46, 99, 0.2);
            animation: fadeInUp 0.6s ease-out;
          }

          .movie-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 16px 40px rgba(255, 46, 99, 0.4);
            border-color: rgba(255, 46, 99, 0.5);
          }

          .movie-card img {
            width: 100%;
            height: 280px;
            object-fit: cover;
            display: block;
            transition: all 0.4s ease;
            filter: brightness(0.9) contrast(1.1);
          }

          .movie-card:hover img {
            filter: brightness(1.1) contrast(1.2);
            transform: scale(1.05);
          }

          .movie-info {
            padding: 16px;
            text-align: center;
          }

          .movie-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #fff;
            margin: 0 0 8px 0;
            line-height: 1.3;
            user-select: none;
          }

          .movie-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            color: #ccc;
            margin: 0;
          }

          .movie-rating {
            color: #ff2e63;
            font-weight: 500;
          }

          .movie-genre {
            font-size: 0.8rem;
            opacity: 0.8;
          }

          .nav-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            margin-top: 24px;
          }

          .nav-btn {
            background: linear-gradient(145deg, rgba(255, 46, 99, 0.2), rgba(255, 46, 99, 0.1));
            border: 1px solid rgba(255, 46, 99, 0.3);
            border-radius: 50%;
            padding: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #ff2e63;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            user-select: none;
          }

          .nav-btn:hover:not(:disabled) {
            background: linear-gradient(145deg, rgba(255, 46, 99, 0.4), rgba(255, 46, 99, 0.2));
            color: #fff;
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(255, 46, 99, 0.3);
          }

          .nav-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }

          .page-indicator {
            font-size: 0.9rem;
            color: #999;
            font-weight: 500;
            min-width: 60px;
            text-align: center;
          }

          /* Loading and Error Styles */
          .loading-container, .error-container, .empty-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 50vh;
            color: #e5e5e5;
            text-align: center;
            padding: 20px;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 46, 99, 0.2);
            border-top: 4px solid #ff2e63;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }

          .loading-text, .error-text, .empty-text {
            font-size: 1.1rem;
            color: #999;
            margin: 0;
          }

          .retry-button {
            background: #ff2e63;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            margin-top: 16px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s ease;
          }

          .retry-button:hover {
            background: #e0245e;
          }

          /* Shimmer for loading cards (optional enhancement) */
          .shimmer-card {
            background: linear-gradient(90deg, #1f1f1f 25%, #2a2a2a 50%, #1f1f1f 75%);
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
            height: 280px;
            border-radius: 16px;
          }
        `}
      </style>

      <div className="npas-container">
        <h3 className="npas-title">🎥 Top Content</h3>

        {totalPages > 1 && (
          <p className="pagination-info">
            Page {len1 + 1} of {totalPages} • Showing {currentPageItems.length} of {data.length} movies
          </p>
        )}

        <div className="movie-list" role="list">
          {currentPageItems.map((product) => {
            // Fallbacks assuming data might have genre, rating, year
            const genre = product.genre || "Action";
            const rating = product.rating || "⭐⭐⭐⭐";
            const year = product.year || "2024";

            return (
              <div 
                className="movie-card" 
                key={product._id} 
                role="listitem" 
                tabIndex={0}
                onClick={() => handleMovieClick(product)}
                onKeyDown={(e) => e.key === 'Enter' && handleMovieClick(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => { e.target.src = '/fallback-poster.jpg'; }} // Add a fallback image
                  loading="lazy" // Lazy load for performance
                />
                <div className="movie-info">
                  <h4 className="movie-title">{product.name}</h4>
                  <p className="movie-meta">
                    <span className="movie-rating">{rating}</span>
                    <span className="movie-genre">{genre} • {year}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="nav-container">
            <button 
              onClick={prev} 
              className="nav-btn" 
              disabled={isFirstPage}
              aria-label="Previous page"
            >
              <CiCircleChevLeft size={24} />
            </button>
            <span className="page-indicator">{len1 + 1} / {totalPages}</span>
            <button 
              onClick={next} 
              className="nav-btn" 
              disabled={isLastPage}
              aria-label="Next page"
            >
              <CiCircleChevRight size={24} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    backgroundColor: "#0a0a0a",
    color: "#e5e5e5",
  },
  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255, 46, 99, 0.2)",
    borderTop: "4px solid #ff2e63",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
  loadingText: {
    fontSize: "1.1rem",
    color: "#999",
    margin: 0,
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    backgroundColor: "#0a0a0a",
    color: "#e5e5e5",
    textAlign: "center",
    padding: "20px",
  },
  errorText: {
    fontSize: "1.1rem",
    color: "#ff6b6b",
    margin: "0 0 16px 0",
  },
  retryButton: {
    backgroundColor: "#ff2e63",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    backgroundColor: "#0a0a0a",
    color: "#e5e5e5",
    textAlign: "center",
    padding: "20px",
  },
  emptyText: {
    fontSize: "1.1rem",
    color: "#999",
    margin: 0,
  },
};

export default Npas;
