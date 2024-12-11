import React from "react";
import "./Footer.css"; // Optional: Add custom styles

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row text-center">
          {/* Logo Section */}
          <div className="col-md-4 mb-3">
            <img
              src="path-to-logo.png"
              alt="Logo"
              style={{ width: "60px", height: "auto" }}
            />
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>
              <a
                href="mailto:gensec_1@iiitr.ac.in"
                className="text-light text-decoration-none"
              >
                gensec_1@iiitr.ac.in
              </a>
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://iiitr.ac.in"
                  className="text-light text-decoration-none"
                >
                  IIIT Raichur
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light text-decoration-none"
                >
                  PR Council
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-12 mt-4">
            <h5>Social Media</h5>
            <div>
              <a
                href="#"
                className="text-light mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                className="text-light mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-light mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-light mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="#"
                className="text-light mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="col-md-12 mt-4">
            <p className="mb-0">
              Copyright © 2022 Gymkhana IIIT Raichur | Design: Web Team IIITR
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
