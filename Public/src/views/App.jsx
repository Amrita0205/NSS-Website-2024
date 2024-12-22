import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CTA from "../components/cta";
import "./App.css";



const App = () => {
  return (
    <div className="app-container app-page">
      <Navbar />

      <main className="main-content">
        <div className="button-container">
          <Link to="/hours">
            <button className="custom-button">Check Hours</button>
          </Link>
          <Link to="/nss">
            <button className="custom-button">NSS Constitution</button>
          </Link>
          <Link to="/hoursportal">
            <button className="custom-button">User Dashboard</button>
          </Link>
        </div>

        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default App;
