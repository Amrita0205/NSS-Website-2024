import React, { useState, useEffect } from 'react';
import './EditDeleteDialog.css'


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
    <div className="edit-delete-dialog">
      <div className="dialog-content">
        <h2 className="dialog-title">
          {data.action === 'edit' ? 'Edit Member' : 'Delete Member'}
        </h2>
        
        {data.action === 'edit' ? (
          <form onSubmit={handleSubmitEdit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Batch</label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div className="dialog-actions">
              <button
                type="button"
                onClick={onClose}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-center-paragraph">Are you sure you want to delete {data.name}?</p>
            <div className="dialog-actions">
              <button
                onClick={onClose}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitDelete}
                className="delete-btn"
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
