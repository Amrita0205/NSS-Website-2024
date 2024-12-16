import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home';
import NotFound from './views/not-found';
import Announcement_page from './views/announcement_page';
import Hours_page from './views/hours_page';
import Signup from './components/Signup';
import Login from './components/Login';
import Entry from './components/Entry';
import './views/App.css'
import App from './views/App';
import Dashboard from './views/Dashboard';
import StudentHours from './views/StudentHours';
import AddTeamMember from './views/AddTeamMember';
import ManageEvents from './views/ManageEvents';
import Login_F from './components/Login_F';
import ChecKHoursPage from './components/ChecKHoursPage';
import NssPage from './components/NssPage';
import HoursPortal from './components/HoursPortal';
import {BigCard} from './components/Bigcard';
import CheckAttendance from './components/CheckAttendance';
import EventDetail1 from './components/EventDetail1';
import EventDetail2 from './components/EventDetail2';
import EventDetail3 from './components/EventDetail3';
import EventDetail4 from './components/EventDetail4';







const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/announcements" element={<Announcement_page />} />
        <Route path="/hours" element={<Hours_page />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studenthours" element={<StudentHours />} />
        <Route path="/addteammember" element={<AddTeamMember />} />
        <Route path="/manageevents" element={<ManageEvents />} />
        <Route path="/login_f" element={<Login_F />} />
        <Route path="/checkhours" element={<ChecKHoursPage />} />
        <Route path="/nss" element={<NssPage />} />
        <Route path="/hoursportal" element={<HoursPortal />} />
        <Route path="/bigcard" element={<BigCard />} />
        <Route path="/checkattendance" element={<CheckAttendance />} />
        <Route path="/event1" element={<EventDetail1 />} />
        <Route path="/event2" element={<EventDetail2 />} />
        <Route path="/event3" element={<EventDetail3 />} />
        <Route path="/event4" element={<EventDetail4 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById('root'); // Changed to 'root' to match main.jsx
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
