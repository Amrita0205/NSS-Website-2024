import React, { useState, useEffect } from 'react';
import './hero.css';
import imageJson from './images.json';

const Hero = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchImages = () => {
            try {
                // Assuming imageJson contains image names like ["image1.jpg", "image2.jpg"]
                const imageList = imageJson; 
                const imagePaths = imageList.map((name) => `/images/${name}`);
                setImages(imagePaths);
                console.log("Images loaded:", imagePaths); // Debugging the paths
            } catch (error) {
                console.error('Error processing image data:', error);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        if (images.length > 1 && !isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [images, isPaused]);

    const openImageInNewTab = (imageSrc) => {
        window.open(imageSrc, '_blank');
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <div
            className="hero-carousel-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="hero-carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} className="hero-carousel-item">
                            <img
                                src={image}
                                alt={`Hero Image ${index + 1}`}
                                onClick={() => openImageInNewTab(image)}
                            />
                        </div>
                    ))
                ) : (
                    <p>Loading images...</p>
                )}
            </div>
        </div>
    );
};

export default Hero;
