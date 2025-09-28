import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const backnend = process.env.REACT_APP_URL;

function Movie() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 3; 

  const handleMovieClick = (id) => {
    navigate("/get", { state: { nnw: id } });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backnend}/take`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching product list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="netflix-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="netflix-container">
     
      <section className="content-section">
        <h3 className="section-title">ADOLESCENCE</h3>
        
       
        <div className="pagination-controls">
          <button 
            className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          
          <span className="page-indicator">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="movies-grid">
          {currentItems.map((product, index) => (
            <div
              key={product._id}
              className="movie-card"
              onClick={() => handleMovieClick(product._id)}
            >
              <div className="card-image-container">
                <img
                  src={product.image}
                  alt={product.text}
                  className="card-image"
                />
                <div className="card-overlay">
                  <div className="play-button">
                    <FaPlay />
                  </div>
                  <div className="card-info">
                    <h4 className="card-title">{product.text}</h4>
                    <div className="card-meta">
                      <span className="rating">
                        <FaStar /> {(8.2 + index * 0.1).toFixed(1)}
                      </span>
                      <span className="year">2024</span>
                      <span className="duration">2h 15m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pagination Controls */}
        <div className="pagination-controls bottom-controls">
          <button 
            className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          
          <span className="page-indicator">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Movie;