import React, { useState, useEffect } from 'react';

const EditDeleteDialog = ({ data, onClose, onEdit, onDelete }) => {
  const [formData, setFormData] = useState({
    name: data.name,
    position: data.position,
    batch: data.batch,
    email: data.email,
  });

  useEffect(() => {
    if (data.action === 'edit') {
      setFormData({
        name: data.name,
        position: data.position,
        batch: data.batch,
        email: data.email,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    onEdit(formData);
  };

  const handleSubmitDelete = () => {
    onDelete(data.email);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{data.action === 'edit' ? 'Edit Member' : 'Delete Member'}</h2>
        
        {data.action === 'edit' ? (
          <form onSubmit={handleSubmitEdit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
            <div>
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
            <div>
              <label>Batch</label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p>Are you sure you want to delete {data.name}?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDeleteDialog;
