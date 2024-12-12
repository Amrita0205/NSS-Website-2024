import React from 'react';
import './Card.css'

function Card(props) {
  return (
    <div className="card-container">
      <div className="card-image-container">
        <img
          className="card-image"
          src={props.image || "https://via.placeholder.com/150"}
          alt="Profile"
        />
      </div>
      <div className="card-details">
        <h1 className="card-name">{props.name || "Name"}</h1>
        <p className="card-position">{props.position || "Position"}</p>
        <p className="card-batch">{props.batch || "Batch"}</p>
      </div>

      <div className="card-divider"></div>

      <button className="card-button">
        <span>{props.email || "Email"}</span>
      </button>
    </div>
  );
}

export default Card;
