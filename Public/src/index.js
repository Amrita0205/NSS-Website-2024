import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home'; 
import NotFound from './views/not-found'; 
import Announcement_page from './views/announcement_page'; 
import Hours_page from './views/hours_page';  


const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route path="/announcements" element={<Announcement_page />} />
        <Route path="/hours" element={<Hours_page />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};


const rootElement = document.getElementById('app'); 
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
