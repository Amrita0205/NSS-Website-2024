import React from 'react';
import './intro.css';

const Intro = () => {
    return (
        <div className="intro-container">
            <div className="intro-content">
                <div className="logo-container">
                    <img src="https://students.iiitr.ac.in/assets/images/club/nss-inverted.png" alt="Logo" className="logo" />
                </div>
                <div className="text-container">
                    <h1>NSS IIIT Raichur</h1>
                    <p>NOT ME BUT YOU</p>
                </div>
            </div>
        </div>
    );
};

export default Intro;
