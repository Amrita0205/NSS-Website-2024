import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamMemberCard from "../components/TeamMemberCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AddTeamMember.css";

const AddTeamMember = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    image: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch current team members from the backend API
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("/api/v1/admin/all");
        setTeamMembers(response.data.admins);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch team members.");
      }
    };

    fetchTeamMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.role ||
      !formData.batch ||
      !formData.email ||
      !formData.image
    ) {
      setError("All fields are required. Please fill in all details.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post("/api/v1/admin/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setTeamMembers([...teamMembers, response.data.admin]);
        setFormData({
          name: "",
          role: "",
          email: "",
          image: null,
        });
        setError("");
        alert("Form successfully submitted!");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Failed to add team member.");
    }
  };

  const handleEdit = async (_id, updatedData) => {
    try {
      const response = await axios.put(
        `/api/v1/admin/update/${_id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setTeamMembers((prevMembers) =>
          prevMembers.map((member) =>
            member._id === _id ? { ...member, ...updatedData } : member
          )
        );
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Failed to edit team member.");
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`/api/v1/admin/delete/${_id}`);

      if (response.status === 200) {
        setTeamMembers((prevMembers) =>
          prevMembers.filter((member) => member._id !== _id)
        );
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Failed to delete team member.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="header-container">
        <h1 className="header-title">Manage Team</h1>
      </div>
      <div className="form-container">
        <h2 className="form-title">Add New Team Member</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="label">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Enter role"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="batch" className="label">
              Batch
            </label>
            <input
              type="text"
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              placeholder="Enter batch"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="label">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="input-field"
            />
          </div>
          <div className="form-button-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="team-container">
        <h3 className="team-title">Current Team Members</h3>
        <div className="team-members-list">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card-container">
              <TeamMemberCard
                {...member}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddTeamMember;
