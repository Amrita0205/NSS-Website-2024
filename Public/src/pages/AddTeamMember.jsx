import React, { useState, useEffect } from 'react';
import TeamMemberCard from '../components/TeamMemberCard';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <div className="bg-black text-white flex flex-col items-center justify-center h-28 mt-32">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Manage Team</h1>
      </div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-black shadow-2xl mt-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add New Team Member
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Enter position"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-1">
              Batch
            </label>
            <input
              type="text"
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              placeholder="Enter batch"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-28 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center mt-10">
            <h3 className="text-3xl font-bold text-gray-800 tracking-wide border-b-4 border-blue-500 inline-block pb-2">
              Current Team Members
            </h3>
          </div>

          <div className="flex flex-wrap gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <TeamMemberCard
                  {...member}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddTeamMember;


