import React from 'react';
import Card from './Card';

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
  },
  {
    name: "Navi Chowdhary",
    position: "NSS Boy's Representative",
    batch: "2022-26",
  },
  {
    name: "Praneetha",
    position: "NSS Girl's Representative",
    batch: "2021-25",
  },
  {
    name: "Y.Santosh",
    position: "Event Coordinator 1",
    batch: "2023-27",
  },
];

export const BigCard = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 w-full h-auto">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-full h-[600px] shadow-2xl mx-2.5 my-1 relative"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${card.imgUrl})`,
              filter: 'blur(15px)', // Apply blur effect to the image
            }}
          ></div>

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-black-600 text-4xl font-bold decoration-wavy mb-4">
              {card.position}
            </h1>
            <Card
              name={card.name}
              position={card.position}
              batch={card.batch}
              email={card.email}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
