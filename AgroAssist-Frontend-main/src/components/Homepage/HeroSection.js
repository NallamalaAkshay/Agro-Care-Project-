// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';  // CSS for styling

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Empowering Farmers with Technology</h1>
        <p>AgriApp provides the tools, resources, and knowledge farmers need to succeed in modern agriculture.</p>
        <div className="cta-buttons">
          <a href="/products" className="cta-button">Explore Crops</a>
          <a href="/equipment" className="cta-button cta-secondary">Find Equipment</a>
        </div>
      </div>

      <div className="hero-details">
        <div className="detail-item">
          <img src="/path-to-your-icon1.png" alt="Crops" />
          <h3>Find Best Crops</h3>
          <p>Learn about various crops and their growing conditions to maximize your harvest.</p>
        </div>

        <div className="detail-item">
          <img src="/path-to-your-icon2.png" alt="Equipment" />
          <h3>Advanced Equipment</h3>
          <p>Explore modern farm equipment to enhance productivity and reduce labor.</p>
        </div>

        <div className="detail-item">
          <img src="/path-to-your-icon3.png" alt="Weather" />
          <h3>Weather Forecast</h3>
          <p>Stay informed with real-time weather updates to optimize your farming schedule.</p>
        </div>
      </div>

      <div className="hero-description">
        <p>
          At Agroassist, we believe that technology can transform the way agriculture is done. 
          Our platform provides farmers with cutting-edge solutions to make informed decisions, 
          improve crop yield, and reduce operational costs.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
