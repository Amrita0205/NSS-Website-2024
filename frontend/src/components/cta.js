import React from 'react';
import { Link } from 'react-router-dom';
import './cta.css';

const CTA = () => {
  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="cta-accent2-bg">
          <div className="cta-accent1-bg">
            <div className="cta-container2">
              <div className="cta-content">
                <span className="thq-heading-2">ANNOUNCEMENTS</span>
              </div>
              <div className="cta-actions">
                <Link to="/announcements" className="thq-button-filled cta-button">
                  Click Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
