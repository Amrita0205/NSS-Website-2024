import React from 'react';

const TeamMemberCard=(props) =>{
  // Handle Edit
  const handleEdit = () => {
    // Replace this with the logic to open an edit form/modal or navigate to an edit page.
    // For now, let's show an alert for demo purposes.
    alert(`Editing member: ${props.name}`);
    // You can use the props.id to identify the member in the database or in the state
  };

  // Handle Delete
  const handleDelete = () => {
    // Confirm before deleting
    const confirmation = window.confirm(`Are you sure you want to delete ${props.name}?`);
    if (confirmation) {
      // Perform delete action (remove the team member from the list or database)
      props.onDelete(props.id); // Calls the onDelete function passed from the parent component
    }
  };

  return (
    <div className="w-[275px] h-[400px] bg-white shadow-xl rounded-lg overflow-hidden flex flex-col items-center p-6 my-10 transform shadow-4xl transition-all duration-300 hover:scale-105 hover:shadow-4xl border border-black">
      <div className="flex justify-center p-4">
        <img
          className="h-36 w-36 object-cover rounded-full border-4 border-gray-200 transform transition-all duration-300 hover:scale-110"
          src={props.image || "https://via.placeholder.com/150"}
          alt="Profile"
        />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{props.name || "Name"}</h1>
        <p className="text-lg text-gray-500">{props.position || "Position"}</p>
        <p className="text-sm text-gray-400">{props.batch || "Batch"}</p>
      </div>
      <button className="bg-blue-500 text-white hover:bg-blue-600 px-5 py-2 rounded-full flex items-center justify-center space-x-2 transition duration-300">
        <span>{props.email || "Email"}</span>
      </button>

      {/* Edit and Delete buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleEdit}
          className="bg-green-400 text-white hover:bg-green-600 px-4 py-2 rounded-lg transition duration-300 w-[80px]"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-green-400 text-white hover:bg-green-600 px-4 py-2 rounded-lg transition duration-300 w-[80px]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TeamMemberCard;