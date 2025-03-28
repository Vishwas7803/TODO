import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === "user0@gmail.com" && password === "pass") {
      alert("✅ Login successful!");
      navigate("/home");
    } else {
      alert("❌ Invalid email or password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <h1 style={styles.title}>🚀 Welcome Back</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          {/* Hints */}
          <div style={styles.hints}>
            <p>💡 <strong>Email:</strong> user0@gmail.com</p>
            <p>🔑 <strong>Password:</strong> pass</p>
          </div>

          <button type="submit" style={styles.button}>Login →</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg,rgb(27, 208, 39),rgb(26, 193, 238))", 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    padding: "20px",
  },

  glassCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
    maxWidth: "450px",
    width: "100%",
    animation: "fadeIn 0.8s ease",
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "all 0.3s ease",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "5px",
    fontWeight: "bold",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    
    ":focus": {
      border: "1px solid #4caf50",
      boxShadow: "0 0 10px #4caf50",
    },

    ":hover": {
      borderColor: "#4caf50",
    }
  },

  hints: {
    padding: "12px",
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "10px",
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.6",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s ease",
    
    ":hover": {
      background: "rgba(0, 0, 0, 0.1)",
    }
  },

  button: {
    padding: "14px 30px",
    background: "linear-gradient(135deg, #4CAF50, #388e3c)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "background 0.3s ease, transform 0.3s ease",
    
    ":hover": {
      background: "linear-gradient(135deg, #388e3c, #2e7d32)",
      transform: "translateY(-5px)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
    }
  },

  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(-20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" }
  }
};

export default Login;
