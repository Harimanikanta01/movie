import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const backend = process.env.REACT_APP_URL;

function App() {
  const [data, setData] = useState([]);
  const [nn, setNn1] = useState("Login Success");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const searchTimeout = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backend}/get`);
        setData(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setNn1(null), 5000);
    return () => clearTimeout(timeout);
  }, [nn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout.current);
    const value = e.target.value;
    searchTimeout.current = setTimeout(() => {
      setSearch(value.trim());
    }, 300);
  };

  const firstItem = data[0];

  const fallbackImages = {
    hero: 'https://images.unsplash.com/photo-1616530940355-351fabd9526b?w=1200&h=600&fit=crop',
    card: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=500&fit=crop'
  };

  const filteredMovies = data.filter(item =>
    (item.text && item.text.toLowerCase().includes(search.toLowerCase())) ||
    (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="netmirror-app">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="netmirror-app">
        <div className="empty-state">Failed to load movies. Try again later.</div>
      </div>
    );
  }

  return (
    <div className="netmirror-app">
      <header className="netmirror-header">
        <nav className="netmirror-nav">
          <div className="nav-left">
            <h1 className="logo">MOVIEU</h1>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/movies">Movies</Link>
            </div>
          </div>
          <div className="nav-right">
            <div className="search-container">
              <input
                type="text"
                placeholder="Type here to search"
                className="search-input"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <div className="auth-section">
              {!token ? (
                <>
                  <Link to="/login" className="auth-btn login-btn">Login</Link>
                  <Link to="/create" className="auth-btn signup-btn">Sign Up</Link>
                </>
              ) : (
                <button className="auth-btn logout-btn" onClick={handleLogout}>Logout</button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <section className="hero-section">
        <div 
          className="hero-background"
          style={{ 
            backgroundImage: `url(${firstItem && !imageErrors['hero'] ? firstItem.image : fallbackImages.hero})` 
          }}
        ></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="hero-title">{firstItem ? firstItem.text : "Welcome to NETMIRROR"}</h2>
          <p className="hero-subtitle">Stream Now</p>
          <p className="hero-description">
            {firstItem ? firstItem.description || "Discover amazing stories and unforgettable characters." : "Your ultimate destination for movies and TV series."}
          </p>
          <div className="hero-buttons">
            <button className="play-btn">
              <span>▶</span> Play
            </button>
            <button className="info-btn">
              More info
            </button>
          </div>
        </div>
      </section>

      <section style={{marginLeft:"95px"}} className="movies-section">
        <h2>Trending Movies</h2>
        <div className="movies-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((item, idx) => (
              <div style={{margin:"40px"}} key={idx} className="movie-card">
                <img 
                  src={!imageErrors[idx] ? item.image : fallbackImages.card}
                  alt={item.text}
                  onError={() => handleImageError(idx)}
                />
                <div className="movie-overlay">
                  <h3>{item.text}</h3>
                  <button className="play-button">▶ Play</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No movies found for "{search}"</div>
          )}
        </div>
      </section>

      {token && nn && (
        <div className="alert-container">
          <Alert severity="success" className="custom-alert">{nn}</Alert>
        </div>
      )}
    </div>
  );
}

export default App;
