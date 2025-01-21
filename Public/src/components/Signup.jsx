import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaIdBadge } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    roll_no: "",
    email: "",
    role: "student",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/v1/student/add", formData, {
        withCredentials: true,
      });
      setMessage(response.data.message);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gradient-to-br from-purple-200 via-blue-300 to-blue-500">
  <div className="w-screen bg-white shadow-xl rounded-lg px-8 py-12">
    <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Register Student</h2>
    {message && (
      <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4 rounded mb-6">
        {message}
      </div>
    )}
    {error && (
      <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded mb-6">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-inner">
        <FaUser className="text-gray-400 mr-3" />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full bg-transparent focus:outline-none text-black"
          placeholder="First Name"
          required
        />
      </div>
      <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-inner">
        <FaUser className="text-gray-400 mr-3" />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full bg-transparent focus:outline-none text-black"
          placeholder="Last Name"
          required
        />
      </div>
      <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-inner">
        <FaIdBadge className="text-gray-400 mr-3" />
        <input
          type="text"
          name="roll_no"
          value={formData.roll_no}
          onChange={handleChange}
          className="w-full bg-transparent focus:outline-none text-black"
          placeholder="Roll Number"
        />
      </div>
      <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-inner">
        <FaEnvelope className="text-gray-400 mr-3" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-transparent focus:outline-none text-black"
          placeholder="Email Address"
          required
        />
      </div>
      <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-inner">
        <FaLock className="text-gray-400 mr-3" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-transparent focus:outline-none text-black"
          placeholder="Password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-500 hover:to-purple-500 focus:ring-4 focus:ring-blue-300 transition"
      >
        Register
      </button>
    </form>
  </div>
</div>

  );
};

export default Signup;
