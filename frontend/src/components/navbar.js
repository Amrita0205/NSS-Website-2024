import React from "react";
import { Link } from 'react-router-dom';
import "./navbar.css";

const Navbar = () => {
    return (
        <header className="navbar-container">
            <nav className="navbar-navbar-interactive">
                <div className="navbar-logo-container">
                <img
                    alt="NSS IIIT Raichur"
                    src="https://students.iiitr.ac.in/assets/images/club/nss-inverted.png"
                    className="navbar-image1"
                />
                <span className="navbar-logo-text">NSS IIIT Raichur</span>
                </div>
                <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
                    <ul className="navbar-links1">
                        <li>
                            <Link to="/#Intro" className="thq-link thq-body-small">Home</Link>
                        </li>
                        <li>
                            <Link to="/#About" className="thq-link thq-body-small">About Us</Link>
                        </li>
                        <li>
                            <Link to="/#Hero" className="thq-link thq-body-small">Gallery</Link>
                        </li>
                        <li>
                            <Link to="/#Contact" className="thq-link thq-body-small">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/#CTA" className="thq-link thq-body-small">Announcements</Link>
                        </li>
                    </ul>

                    <div className="navbar-buttons1">
                        <Link to="/hours" className="navbar-action11 thq-button-animated thq-button-filled">  
                            <span className="thq-body-small">Hours Portal</span>
                        </Link> 
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
