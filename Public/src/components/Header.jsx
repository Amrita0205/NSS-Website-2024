import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <header className="header-container">
      <h1 className="header-title">NSS Portal</h1>
      <nav className="header-nav">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/manageevents" className="nav-link">Manage Events</Link>
        {/* <Link to="/logout" className="nav-link">Logout</Link> */}
      </nav>
    </header>
  );
};

export default Header;
