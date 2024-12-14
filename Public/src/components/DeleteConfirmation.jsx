import React from 'react';
import './DeleteConfirmation.css'

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, eventTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-content">
        <h2 className="modal-title">Confirm Delete</h2>
        <p className="delete-modal-paragraph">
          Are you sure you want to delete the event{" "}
          <strong>{eventTitle}</strong>?
        </p>
        <div className="modal-actions">
          <button
            type="button"
            onClick={onClose}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
