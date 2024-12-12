import React from 'react';
import Card from './Card';
import './BigCard.css'

// Import local images
import img1 from '../assets/DSC09172.JPG';
import img2 from '../assets/DSC09549.JPG';
import img3 from '../assets/IMG_0684.JPG';
import img4 from '../assets/IMG_0917.JPG';
import img5 from '../assets/IMG_0642.JPG';

const cardData = [
  {
    name: "Naman Vikram",
    position: "NSS Secretary",
    batch: "2021-25",
    imgUrl: img1,
  },
  {
    name: "Navi Chowdhary",
    position: "NSS Boy's Representative",
    batch: "2022-26",
    imgUrl: img2,
  },
  {
    name: "Praneetha",
    position: "NSS Girl's Representative",
    batch: "2021-25",
    imgUrl: img3,
  },
  {
    name: "Y.Santosh",
    position: "Event Coordinator 1",
    batch: "2023-27",
    imgUrl: img4,
  },
];

export const BigCard = () => {
  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div key={index} className="card-item">
          {/* Background Image */}
          <div
            className="card-background"
            style={{
              backgroundImage: `url(${card.imgUrl})`,
            }}
          ></div>

          {/* Card Content */}
          <div className="card-content">
            <h1 className="card-position">{card.position}</h1>
            <Card name={card.name} position={card.position} batch={card.batch} />
          </div>
        </div>
      ))}
    </div>
  );
};
