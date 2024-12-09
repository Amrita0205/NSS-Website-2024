import React from 'react';
import './hero.css';

const Hero = () => {
  const fallbackImage = 'https://play.teleporthq.io/static/svg/default-img.svg';

  const images = [
    { src: 'image1.jpg', alt: 'Image 1 Description' },
    { src: 'image2.png', alt: 'Image 2 Description' },
    { src: 'image3.svg', alt: 'Image 3 Description' },
    { src: 'image4.jpg', alt: 'Image 4 Description' },
    { src: 'image5.png', alt: 'Image 5 Description' },
    { src: 'image6.svg', alt: 'Image 6 Description' },
    // Add more images as needed
  ];

  return (
    <div className="hero-header78">
      <div className="hero-content2">
        <div className="hero-scroll-container">
          {/* First Row (scrolling horizontally to the left) */}
          <div className="hero-row-container left-scroll">
            {images.map((image, index) => (
              <img
                key={index}
                alt={image.alt}
                src={image.src || fallbackImage}
                className="hero-placeholder-image thq-img-scale thq-img-ratio-1-1"
              />
            ))}
          </div>
          {/* Second Row (scrolling horizontally to the right) */}
          <div className="hero-row-container right-scroll">
            {images.map((image, index) => (
              <img
                key={index + images.length}
                alt={image.alt}
                src={image.src || fallbackImage}
                className="hero-placeholder-image thq-img-scale thq-img-ratio-1-1"
              />
            ))}
          </div>
          {/* Third Row (scrolling horizontally to the left) */}
          <div className="hero-row-container left-scroll">
            {images.map((image, index) => (
              <img
                key={index + 2 * images.length}
                alt={image.alt}
                src={image.src || fallbackImage}
                className="hero-placeholder-image thq-img-scale thq-img-ratio-1-1"
              />
            ))}
          </div>
          {/* Fourth Row (scrolling horizontally to the right) */}
          <div className="hero-row-container right-scroll">
            {images.map((image, index) => (
              <img
                key={index + 3 * images.length}
                alt={image.alt}
                src={image.src || fallbackImage}
                className="hero-placeholder-image thq-img-scale thq-img-ratio-1-1"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
