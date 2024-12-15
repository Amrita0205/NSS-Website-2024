import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CalendarIcon, UserGroupIcon, UserAddIcon, ClockIcon, ClipboardListIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-black text-white flex flex-col items-center justify-center py-16 mt-32 h-[130px]">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Welcome!</h1>
        <p className="text-lg font-light opacity-80">UserName</p>
      </div>

      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-8">
              
              <div className="flex-shrink-0 w-full lg:w-1/3 max-w-lg text-center">
                <img
                  src="https://via.placeholder.com/400"
                  alt="Profile"
                  className="rounded-full shadow-lg w-[300px] h-[300px] mx-auto mb-8"
                />
              </div>

              <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:transition transform hover:scale-105 hover:w-[350px] hover:h-[90px] border border-blue-400 w-[340px] h-[80px]">
                  <Link to="/managevents" className="block h-full">
                    <div className="flex items-center mb-4">
                      <CalendarIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Manage Events</h2>
                    </div>
                  </Link>
                </div>

                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:transition transform hover:scale-105 hover:w-[350px] hover:h-[90px] border border-blue-400 w-[340px] h-[80px]">
                  <Link to="/addteammember" className="block h-full">
                    <div className="flex items-center mb-4">
                      <UserGroupIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Add Team Members</h2>
                    </div>
                  </Link>
                </div>

                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:transition transform hover:scale-105 hover:w-[350px] hover:h-[90px] border border-blue-400 w-[340px] h-[80px]">
                  <Link to="/" className="block h-full">
                    <div className="flex items-center mb-4">
                      <UserAddIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Register Students</h2>
                    </div>
                  </Link>
                </div>

                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:transition transform hover:scale-105 hover:w-[350px] hover:h-[90px] border border-blue-400 w-[340px] h-[80px]">
                  <Link to="/studentshours" className="block h-full">
                    <div className="flex items-center mb-4">
                      <ClockIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Add Students' Hours</h2>
                    </div>
                  </Link>
                </div>

                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:transition transform hover:scale-105 hover:w-[350px] hover:h-[90px] border border-blue-400 w-[340px] h-[80px]">
                  <Link to="/checkattendance" className="block h-full">
                    <div className="flex items-center mb-4">
                      <ClipboardListIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Check Attendance</h2>
                    </div>
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
