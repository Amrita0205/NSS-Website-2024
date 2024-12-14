import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false); 

  const scrollToSection = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      const navbarHeight = document.querySelector('.navbar-container')?.offsetHeight || 0;

      if (element) {
        window.scrollTo({
          top: element.offsetTop - navbarHeight,
          behavior: 'smooth',
        });
      }
    }, 0);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); 
  };

  return (
    <header className="navbar-container">
      <nav className="navbar-navbar-interactive">
        <div className="navbar-logo-container">
          <img
            alt="NSS IIIT Raichur"
            src="/images/nss-inverted.png"
            className="navbar-image1"
          />
          <span className="navbar-logo-text">NSS IIIT Raichur</span>
        </div>
        <div className="navbar-desktop-menu">
          <ul className="navbar-links1">
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("Intro")}
              >
                Home
              </span>
            </li>
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("About")}
              >
                About Us
              </span>
            </li>
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("Hero")}
              >
                Gallery
              </span>
            </li>
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("Contact")}
              >
                Contact Us
              </span>
            </li>
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("CTA")}
              >
                Announcements
              </span>
            </li>
            <li className="navbar-dropdown">
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={toggleDropdown} 
              >
                Our Team
              </span>
              {isDropdownOpen && (
                <ul className="navbar-dropdown-menu">
                  <li>
                    <Link to="/bigcard" className="navbar-link">Team 2024-25</Link>
                  </li>
                  <li>
                    <Link to="/team/year2" className="navbar-link">Team 2023-24</Link>
                  </li>
                  <li>
                    <Link to="/team/year3" className="navbar-link">Team 2022-23</Link>
                  </li>
                  <li>
                    <Link to="/team/year4" className="navbar-link">Team 2021-22</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <div className="navbar-buttons1">
            <Link
              to="/entry"
              className="navbar-action11 thq-button-animated thq-button-filled"
            >
              <span className="thq-body-small">Hours Portal</span>
            </Link>
          </div>
        </div>

        <div className="navbar-mobile-menu-icon" onClick={toggleMobileMenu}>
          <span className="navbar-mobile-menu-icon-bar"></span>
          <span className="navbar-mobile-menu-icon-bar"></span>
          <span className="navbar-mobile-menu-icon-bar"></span>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-close-menu" onClick={toggleMobileMenu}>
            &times;
          </div>
          <ul className="navbar-links2">
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("Intro")}
              >
                Home
              </span>
            </li>
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("About")}
              >
                About Us
              </span>
            </li>
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("Hero")}
              >
                Gallery
              </span>
            </li>
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("Contact")}
              >
                Contact Us
              </span>
            </li>
            <li>
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={() => scrollToSection("CTA")}
              >
                Announcements
              </span>
            </li>

            <li className="navbar-dropdown">
              <span
                className="thq-link thq-body-small"
                role="button"
                onClick={toggleDropdown} 
              >
                Our Team
              </span>
              {isDropdownOpen && (
                <ul className="navbar-dropdown-menu">
                  <li>
                    <Link to="/team/year1" className="navbar-link">Team 2024-25</Link>
                  </li>
                  <li>
                    <Link to="/team/year2" className="navbar-link">Team 2023-24</Link>
                  </li>
                  <li>
                    <Link to="/team/year3" className="navbar-link">Team 2022-23</Link>
                  </li>
                  <li>
                    <Link to="/team/year4" className="navbar-link">Team 2021-22</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <div className="navbar-buttons1">
            <Link
              to="/entry"
              className="navbar-action11 thq-button-animated thq-button-filled"
            >
              <span className="thq-body-small">Hours Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
