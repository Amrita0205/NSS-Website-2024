import React from 'react';
import './Card.css'

const Card = ({image,name,position,batch,email}) => {
  return (
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
    </div>
  );
}

export default Card;
