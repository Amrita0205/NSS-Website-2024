import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./App.css";



const App = () => {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
      <div className="button-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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

        <div
          style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}
        >
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top image"
              src="/images/IMG_0640.JPG"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Tree Plantation</h5>
              <p className="card-text">
                As part of our commitment to the environment, NSS volunteers actively participate
                in tree plantation drives to enhance green cover and promote ecological balance.
              </p>
            </div>
          </div>

          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src="/images/DSC09571.JPG"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">NSS Cleaning Drive 1</h5>
              <p className="card-text">
                A clean campus for a better tomorrow! NSS volunteers organize cleaning drives to
                ensure a hygienic and eco-friendly environment.
              </p>
            </div>
          </div>

          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src="/images/DSC09569.JPG"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">NSS Cleaning Drive 2</h5>
              <p className="card-text">
                Continuing the mission for cleanliness, volunteers conducted another cleaning drive,
                emphasizing waste segregation and community awareness.
              </p>
            </div>
          </div>

          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src="/images/DSC09262.JPG"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Orphanage Visit</h5>
              <p className="card-text">
                Spreading smiles and making memories, NSS volunteers visit orphanages to spend
                quality time with children and provide essential resources.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
