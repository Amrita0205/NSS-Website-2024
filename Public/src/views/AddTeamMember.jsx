import React, { useState, useEffect } from 'react';
import TeamMemberCard from '../components/TeamMemberCard';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import './AddTeamMember.css';

const AddTeamMember = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchedTeamMembers = [
      { name: 'John Doe', position: 'Developer', batch: '2020', email: 'john@example.com', image: 'https://via.placeholder.com/150' },
      { name: 'Jane Smith', position: 'Designer', batch: '2019', email: 'jane@example.com', image: 'https://via.placeholder.com/150' },
      { name: 'Michael Lee', position: 'Product Manager', batch: '2021', email: 'michael@example.com', image: 'https://via.placeholder.com/150' },
    ];

    setTeamMembers(fetchedTeamMembers);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    batch: '',
    email: '',
    image: null,
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.position ||
      !formData.batch ||
      !formData.email ||
      !formData.image
    ) {
      setError('All fields are required. Please fill in all details.');
      return;
    }

    const imageUrl = URL.createObjectURL(formData.image);

    setTeamMembers([
      ...teamMembers,
      { name: formData.name, position: formData.position, batch: formData.batch, email: formData.email, image: imageUrl },
    ]);

    setFormData({
      name: '',
      position: '',
      batch: '',
      email: '',
      image: null,
    });

    setError('');
    alert('Form successfully submitted!');
  };

  const handleEdit = (email, updatedData) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === email ? { ...member, ...updatedData } : member
      )
    );
  };

  const handleDelete = (email) => {
    setTeamMembers((prevMembers) => prevMembers.filter((member) => member.email !== email));
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
            <label htmlFor="name" className="label">Name</label>
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
            <label htmlFor="position" className="label">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Enter position"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="batch" className="label">Batch</label>
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
            <label htmlFor="email" className="label">Email</label>
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
            <label htmlFor="image" className="label">Image</label>
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
