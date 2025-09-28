import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser , FiLock, FiEye, FiEyeOff } from "react-icons/fi"; 
const backnend = process.env.REACT_APP_URL;

function Lo() {
  const [nh, setNh] = useState({
    name: "",
    pass: ""
  });
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const Po = (e) => {
    setNh({ ...nh, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!nh.name.trim() || !nh.pass.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const b = await axios.post(`${backnend}/login1`, nh);
      setRes(b.data);

      if (b.data.token) {
        localStorage.setItem("token", b.data.token);
        navigate("/");
      } else {
        setError(b.data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.logo}>
          <h1 style={styles.logoText}>🎬 MovieHub</h1>
          <p style={styles.logoSubtext}>Sign in to your account</p>
        </div>

        <form onSubmit={submit} style={styles.form}>
          {error && <div style={styles.errorMessage}>{error}</div>}

          <div style={styles.inputGroup}>
            <FiUser  style={styles.inputIcon} />
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={nh.name}
              onChange={Po}
              style={styles.input}
              required
              disabled={loading}
              aria-label="Username"
            />
          </div>

          <div style={styles.inputGroup}>
            <FiLock style={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              name="pass"
              placeholder="Password"
              value={nh.pass}
              onChange={Po}
              style={styles.input}
              required
              disabled={loading}
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.togglePassword}
              disabled={loading}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button type="submit" style={{ ...styles.button, ...(loading && styles.buttonLoading) }} disabled={loading}>
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Don't have an account? <a href="/register" style={styles.link}>Sign up here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d1b69 100%)",
    padding: "1rem",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "420px",
    animation: "fadeInUp 0.6s ease-out",
  },
  logo: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#fff",
  },
  logoText: {
    fontSize: "clamp(2rem, 5vw, 2.5rem)",
    fontWeight: "700",
    margin: "0 0 0.5rem 0",
    background: "linear-gradient(135deg, #e50914, #ff2e63)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  logoSubtext: {
    fontSize: "1rem",
    color: "#aaa",
    margin: 0,
    fontWeight: "400",
  },
  form: {
    background: "rgba(28, 28, 28, 0.95)",
    backdropFilter: "blur(20px)",
    padding: "2.5rem",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  errorMessage: {
    backgroundColor: "rgba(229, 9, 20, 0.2)",
    color: "#ff6b6b",
    padding: "0.75rem",
    borderRadius: "8px",
    borderLeft: "4px solid #e50914",
    fontSize: "0.9rem",
    textAlign: "center",
    animation: "shake 0.5s ease-in-out",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "1rem",
    color: "#888",
    zIndex: 1,
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "1rem 1rem 1rem 3rem",
    margin: "0",
    border: "2px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    fontSize: "1rem",
    backgroundColor: "rgba(46, 46, 46, 0.8)",
    color: "#fff",
    outline: "none",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  inputFocus: {
    borderColor: "#e50914",
    boxShadow: "0 0 0 3px rgba(229, 9, 20, 0.1)",
    backgroundColor: "rgba(46, 46, 46, 0.9)",
  },
  inputDisabled: {
    opacity: "0.6",
    cursor: "not-allowed",
  },
  togglePassword: {
    position: "absolute",
    right: "1rem",
    background: "none",
    border: "none",
    color: "#888",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "50%",
    transition: "color 0.3s ease",
    zIndex: 1,
  },
  togglePasswordHover: {
    color: "#e50914",
    backgroundColor: "rgba(229, 9, 20, 0.1)",
  },
  button: {
    padding: "1rem",
    background: "linear-gradient(135deg, #e50914, #ff2e63)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    position: "relative",
    overflow: "hidden",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(229, 9, 20, 0.4)",
  },
  buttonLoading: {
    opacity: "0.8",
    cursor: "not-allowed",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    textAlign: "center",
    marginTop: "1rem",
  },
  footerText: {
    fontSize: "0.9rem",
    color: "#aaa",
    margin: 0,
  },
  link: {
    color: "#e50914",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  linkHover: {
    color: "#ff2e63",
    textDecoration: "underline",
  },
};

// Global animations (add to your index.css or use a styled-components approach)
const globalStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  /* Focus styles for accessibility */
  input:focus {
    border-color: #e50914 !important;
    box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1) !important;
  }

  button:focus {
    outline: 2px solid #e50914;
    outline-offset: 2px;
  }
`;

// To apply global styles, add <style>{globalStyles}</style> in your root or use CSS file
// For now, assuming you add it to App.css or similar

export default Lo;
