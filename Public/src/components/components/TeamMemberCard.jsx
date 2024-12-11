import React, { useState } from 'react';
import EditDeleteDialog from './EditDeleteDialog';

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
      <div className="w-[275px] h-[450px] bg-white shadow-xl rounded-lg overflow-hidden flex flex-col items-center p-6 my-10 transform shadow-4xl transition-all duration-300 hover:scale-105 hover:shadow-4xl border border-black">
        <div className="flex justify-center p-4">
          <img
            className="h-36 w-36 object-cover rounded-full border-4 border-gray-200 transform transition-all duration-300 hover:scale-110"
            src={image || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-gray-800">{name || 'Name'}</h1>
          <p className="text-lg text-gray-500">{position || 'Position'}</p>
          <p className="text-sm text-gray-400">{batch || 'Batch'}</p>
        </div>
        <div className="h-[8px] bg-gray-300 my-6 w-full"></div>

        <button className="bg-green-400 text-white hover:bg-green-400 px-5 py-2 rounded-8 flex items-center justify-center space-x-2 transition duration-300">
          <span>{email || 'Email'}</span>
        </button>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300 w-[80px]"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300 w-[80px]"
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
