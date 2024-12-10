import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CalendarIcon, UserGroupIcon, UserAddIcon, ClockIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-black text-white flex flex-col items-center justify-center h-28 mt-32">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Welcome!</h1>
        <p className="text-lg font-light opacity-80">UserName</p>
      </div>

      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="container mx-auto p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-8">
              <div className="flex-shrink-0 w-full lg:w-1/2 max-w-lg ">
                <img
                  src="https://via.placeholder.com/400"
                  alt="Dashboard Illustration"
                  className="rounded-full shadow-lg w-[400px] h-[400px] mt-12"
                />
              </div>


              <div className="w-full lg:w-1/2 grid grid-cols-1 gap-8">
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:transition transform hover:scale-105 hover:w-[420px] hover:h-[120px] border border-blue-400 w-[400px] h-[100px]">
                  <Link to="/" className="block h-full">
                    <div className="flex items-center mb-4">
                      <CalendarIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Manage Events</h2>
                    </div>
                    <p className="text-sm opacity-80">
                      View, edit, and manage events.
                    </p>
                  </Link>
                </div>

                <div
                  className="bg-green-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover: transition transform hover:scale-105 hover:w-[420px] hover:h-[120px] border border-blue-400 w-[400px] h-[100px]"
                >
                  <Link to="/addteammember" className="block h-full">

                    <div className="flex items-center mb-4">
                      <UserGroupIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Add Team Members</h2>
                    </div>
                    <p className="text-sm opacity-80">
                      Add new members to NSS team according to their roles.
                    </p>
                  </Link>
                </div>


                <div
                  className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover: transition transform hover:scale-105 hover:w-[420px] hover:h-[120px] border border-blue-400 w-[400px] h-[100px]"
                >
                  <Link to="/" className="block h-full">

                    <div className="flex items-center mb-4">
                      <UserAddIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Register Student</h2>
                    </div>
                    <p className="text-sm opacity-80">
                      Register students into the system.
                    </p>
                  </Link>
                </div>

                <div
                  className="bg-red-600 text-white p-6 rounded-lg shadow-lg cursor-pointer hover: transition transform hover:scale-105 hover:w-[420px] hover:h-[120px] border border-blue-400 w-[400px] h-[100px]"
                >
                  <Link to="/" className="block h-full">

                    <div className="flex items-center mb-4">
                      <ClockIcon className="h-8 w-8 mr-4 text-white" />
                      <h2 className="text-2xl font-bold">Add Students' Hours</h2>
                    </div>
                    <p className="text-sm opacity-80">
                      Add the hours spent by students.
                    </p>
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
