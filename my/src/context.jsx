import React, { useState, useEffect, useContext, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import App3 from "./reco";

export const Ap = createContext();
const backnend=process.env.REACT_APP_URL
function Si() {
  const { state } = useLocation();
  const { nnw } = state || {};
  const [productDetails, setProductDetails] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (nnw) {
      const fetchDetails = async () => {
        try {
          const res = await axios.get(`${backnend}/item/${nnw}`);
          setProductDetails(res.data);
        } catch (err) {
          console.error("Error fetching product:", err);
        }
      };
      fetchDetails();
    }
  }, [nnw]);

  useEffect(() => {
    if (selectedId) {
      navigate("/book", { state: { id: selectedId } });
    }
  }, [selectedId, navigate]);

  if (!productDetails)
    return (
      <div style={{ color: "#fff", padding: "2rem", textAlign: "center" }}>
        <h4>Loading movie details...</h4>
      </div>
    );

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <img src={productDetails.banner} alt="Banner" style={styles.bannerImg} />
        <div style={styles.heroOverlay}></div>

        <div style={styles.heroContent}>
          <div style={styles.heroInner}>
            <img
              src={productDetails.image}
              alt={productDetails.text}
              style={styles.poster}
            />
            <div style={styles.details}>
              <h2 style={styles.title}>{productDetails.text}</h2>
              <div style={styles.badges}>
                <span style={styles.badge}>2D</span>
                <span style={styles.badge}>Telugu</span>
              </div>
              <p style={styles.description}>
                Enjoy an immersive cinematic experience with this blockbuster movie in stunning 2D.
              </p>
              <button
                style={styles.button}
                onClick={() => setSelectedId(productDetails._id)}
              >
                🎟️ Watch Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section style={styles.recommendSection}>
        <Ap.Provider value={productDetails.text}>
          <App3 />
        </Ap.Provider>
      </section>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#080808",
    fontFamily: "Poppins, sans-serif",
    color: "#eaeaea",
    minHeight: "100vh",
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
  },
  bannerImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,10,10,0.95), rgba(0,0,0,0.4))",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "1100px",
    padding: "2rem 1rem",
  },
  heroInner: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  },
  poster: {
    width: "100%",
    maxWidth: "220px",
    height: "auto",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
  },
  details: {
    textAlign: "center",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  badges: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#e50914",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "1rem",
  },
  description: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#ccc",
    marginBottom: "1.5rem",
  },
  button: {
    backgroundColor: "#e50914",
    border: "none",
    borderRadius: "25px",
    padding: "0.75rem 2rem",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  recommendSection: {
    padding: "3rem 1rem",
    backgroundColor: "#0e0e0e",
  },
};

export default Si;
