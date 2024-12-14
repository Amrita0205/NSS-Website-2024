import React, { useState } from 'react';
import EditDeleteDialog from './EditDeleteDialog';
import './TeamMemberCard.css'

const TeamMemberCard = ({ name, email, position, batch, image, onEdit, onDelete }) => {
  const [dialogData, setDialogData] = useState(null);

  const handleEdit = () => {
    setDialogData({
      action: 'edit',
      name,
      email,
      position,
      batch,
    });
  };

  const handleDelete = () => {
    setDialogData({
      action: 'delete',
      name,
      email,
    });
  };

  const handleDialogClose = () => {
    setDialogData(null);
  };

  const handleEditSubmit = (updatedData) => {
    onEdit(email, updatedData);
    setDialogData(null); // Close dialog after edit
  };

  const handleDeleteSubmit = () => {
    onDelete(email);
    setDialogData(null); // Close dialog after delete
  };

  return (
    <>
      <div className="team-member-card">
        <div className="team-member-image-container">
          <img
            className="team-member-image"
            src={image || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
        </div>
        <div className="team-member-details">
          <h1 className="team-member-name">{name || 'Name'}</h1>
          <p className="team-member-position">{position || 'Position'}</p>
          <p className="team-member-batch">{batch || 'Batch'}</p>
        </div>
        <div className="card-divider"></div>

        <button className="team-member-email-btn">
          <span>{email || 'Email'}</span>
        </button>

        <div className="card-action-buttons">
          <button
            onClick={handleEdit}
            className="edit-btn"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>

      {dialogData && (
        <EditDeleteDialog
          data={dialogData}
          onClose={handleDialogClose}
          onEdit={handleEditSubmit}
          onDelete={handleDeleteSubmit}
        />
      )}
    </>
  );
};

export default TeamMemberCard;
