import React, { useState } from "react";

function Np() {
  const [new1, setNew1] = useState({
    name: "",
    pass: ""
  });

  const [success, setSuccess] = useState(false);

  const submit1 = (e) => {
    setNew1({ ...new1, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Creating Account:", new1.name, new1.pass);
    setSuccess(true);
    setNew1({ name: "", pass: "" }); // Clear form
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter Username"
          onChange={submit1}
          value={new1.name}
          style={styles.input}
        />
        <input
          type="password"
          name="pass"
          placeholder="Enter Password"
          onChange={submit1}
          value={new1.pass}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Create Account
        </button>
        {success && (
          <p style={styles.success}>✅ Account created successfully!</p>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    padding: "1rem",
  },
  form: {
    backgroundColor: "#1e1e1e",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.6)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontFamily: "Poppins, sans-serif",
  },
  input: {
    padding: "0.8rem 1rem",
    marginBottom: "1rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#2e2e2e",
    color: "#fff",
    outline: "none",
  },
  button: {
    padding: "0.8rem 1rem",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  success: {
    marginTop: "1rem",
    color: "#4caf50",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "1rem",
  }
};

export default Np;
