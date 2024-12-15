import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { CalendarIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { UserAddIcon,ClipboardListIcon } from '@heroicons/react/outline'; 
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome!</h1>
        <p className="dashboard-username">UserName</p>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-main">
          <div className="dashboard-content">
            <div className="dashboard-layout">
              <div className="dashboard-image-container">
                <img
                  src="/images/nss-inverted.png"
                  className="dashboard-image"
                  alt="Profile"
                />
              </div>

              <div className="dashboard-cards-column">
                <div className="dashboard-card card-blue">
                  <Link to="/manageevents" className="dash-card-link">
                    <div className="card-header">
                      <CalendarIcon className="card-icon" />
                      <h2 className="dash-card-title">Manage Events</h2>
                    </div>
                    {/* <p className="dash-card-description">
                      View, edit, and manage events.
                    </p> */}
                  </Link>
                </div>

                <div className="dashboard-card card-green">
                  <Link to="/addteammember" className="dash-card-link">
                    <div className="card-header">
                      <UserGroupIcon className="card-icon" />
                      <h2 className="dash-card-title">Add Team Members</h2>
                    </div>
                    {/* <p className="dash-card-description">
                      Add new members to NSS team according to their roles.
                    </p> */}
                  </Link>
                </div>

                <div
                  className="dashboard-card card-yellow"
                >
                  <Link to="/signup" className="dash-card-link">

                    <div className="card-header">
                      <UserAddIcon className="card-icon" />
                      <h2 className="dash-card-title">Register Students</h2>
                    </div>
                    {/* <p className="dash-card-description">
                     Register students into the system those in NSS club.
                    </p> */}
                  </Link>
                </div>

                <div className="dashboard-card card-red">
                  <Link to="/studenthours" className="dash-card-link">
                    <div className="card-header">
                      <ClockIcon className="card-icon" />
                      <h2 className="dash-card-title">Add Students' Hours</h2>
                    </div>
                    {/* <p className="dash-card-description">
                      Add the hours spent by students.
                    </p> */}
                  </Link>
                </div>

                <div className="dashboard-card card-blue">
                  <Link to="/checkattendance" className="dash-card-link">
                    <div className="card-header">
                      <ClipboardListIcon className="card-icon" />
                      <h2 className="dash-card-title">Check Attendance</h2>
                    </div>
                    {/* <p className="dash-card-description">
                      .
                    </p> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
