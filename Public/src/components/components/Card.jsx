import React from 'react';

function Card(props) {
  return (
<div className="w-[300px] h-[450px] bg-white shadow-xl rounded-lg overflow-hidden flex flex-col items-center p-6 my-10 transform shadow-4xl transition-all duration-300 hover:scale-105 hover:shadow-4xl border border-black">
<div className="flex justify-center p-4">
        <img
          className="h-48 w-48 object-cover rounded-full border-4 border-gray-200 transform transition-all duration-300 hover:scale-110"
          src={props.image||"https://via.placeholder.com/150"}
          alt="Profile"
        />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{props.name || "Name"}</h1>
        <p className="text-lg text-gray-500">{props.position || "Position"}</p>
        <p className="text-sm text-gray-400">{props.batch || "Batch"}</p>
      </div>

      <div className="h-1 bg-gray-300 my-6 w-full"></div>
      
      <button className="bg-blue-500 text-white hover:bg-blue-600 px-5 py-2 rounded-full flex items-center justify-center space-x-2 transition duration-300">
        <span>{props.email || "Email"}</span>
      </button>
    </div>
  );
}

export default Card;