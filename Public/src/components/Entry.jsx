import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "../components/Entry.css"; // Import the new CSS file
import { useNavigate } from 'react-router-dom';

const Entry = () => {
  const navigate = useNavigate();

  return (
    <div className="Entry-container">
      <Navbar />
      
      <main className="main-content">
        <h1 className="main-content-header">Welcome</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#4b6cb7",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#182848")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4b6cb7")}
            onClick={() => navigate('/login_f')}
          >
            Enter as Secretary/Teacher
          </button>

          <button
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#4b6cb7",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#182848")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4b6cb7")}
            onClick={() => navigate('/login')}
          >
            Enter as Student
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Entry;
