import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">NSS Portal</h1>
      <nav>
        <Link to="/dashboard" className="px-4 hover:underline">Dashboard</Link>
        <Link to="/manage-events" className="px-4 hover:underline">Manage Events</Link>
        <Link to="/logout" className="px-4 hover:underline">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
