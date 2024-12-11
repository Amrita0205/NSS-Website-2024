import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./navbar.css";
import "./footer.css";
import "./App.css";

const Entry = () => {
  return (
    <div className="App">
      <Navbar />

      <main className="main-content" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ marginBottom: "40px" }}>Welcome</h1>
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
            onClick={() => alert("Secretary/Teacher login selected")}
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
            onClick={() => alert("Student login selected")}
          >
            Enter as Student
          </button>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Entry;
