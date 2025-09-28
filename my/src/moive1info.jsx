import React, { useEffect, useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import App3 from "./reco";

export const Ap1 = createContext();
const backend = process.env.REACT_APP_URL;

function Jk() {
  const { state } = useLocation();
  const { npa1 } = state || {};
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${backend}/item1/${npa1}`);
        setData(res.data);
      } catch {
        console.error("Fetch error");
      }
    };
    if (npa1) fetchData();
  }, [npa1]);

  if (!data) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <img src={data.banner} alt="Banner" style={styles.bannerImg} />
        <div style={styles.heroOverlay}></div>
        <h1 style={styles.title}>{data.name}</h1>
      </section>

      <section style={styles.content}>
        <div style={styles.posterWrapper}>
          <img src={data.image} alt={data.name} style={styles.poster} />
        </div>

        <div style={styles.details}>
          <p style={styles.description}>{data.info}</p>

          <div style={styles.metaBox}>
            <p><strong>Genre:</strong> {data.genre || "Action / Drama"}</p>
            <p><strong>Rating:</strong> {data.rating || "⭐⭐⭐⭐☆"}</p>
            <p><strong>Release Year:</strong> {data.year || "2024"}</p>
          </div>

          <div style={styles.gallery}>
            {data.gallery?.map((src, i) => src && (
              <img key={i} src={src} alt={`Still ${i + 1}`} style={styles.galleryImg} />
            ))}
          </div>
        </div>
      </section>

      <Ap1.Provider value={data.name}>
        <App3 />
      </Ap1.Provider>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#0a0a0a",
    fontFamily: "Poppins, sans-serif",
    color: "#eee",
    minHeight: "100vh",
  },
  loading: {
    color: "#fff",
    padding: "2rem",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  hero: {
    position: "relative",
    height: "80vh",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    overflow: "hidden",
  },
  bannerImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    filter: "brightness(0.5)",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)",
    zIndex: 1,
  },
  title: {
    zIndex: 2,
    fontSize: "4rem",
    fontWeight: "800",
    marginBottom: "2rem",
    color: "#fff",
    textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
    textAlign: "center",
    width: "100%",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "-100px auto 0",
    zIndex: 5,
    position: "relative",
  },
  posterWrapper: {
    flex: "0 0 320px",
    display: "flex",
    justifyContent: "center",
  },
  poster: {
    width: "100%",
    height: "480px",
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 16px 40px rgba(0,0,0,0.8)",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  details: {
    flex: "1 1 340px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  },
  description: {
    fontSize: "1.15rem",
    lineHeight: 1.7,
    color: "#ddd",
  },
  metaBox: {
    backgroundColor: "#111",
    borderLeft: "4px solid #e50914",
    padding: "1rem",
    borderRadius: "8px",
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#eee",
  },
  gallery: {
    display: "flex",
    gap: "1rem",
    overflowX: "auto",
    paddingTop: "1rem",
  },
  galleryImg: {
    width: "100%",
    maxWidth: "280px",
    height: "auto",
    maxHeight: "180px",
    objectFit: "cover",
    borderRadius: "12px",
    backgroundColor: "#222",
    padding: "4px",
    transition: "transform 0.3s ease",
  },
};

export default Jk;
