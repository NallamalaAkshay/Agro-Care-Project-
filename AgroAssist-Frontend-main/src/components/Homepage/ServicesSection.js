// src/components/ServicesSection.js
import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  return (
    <section className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="service-items">
          <div className="service-item">
            <h3>Farm Management</h3>
            <p>
              Get access to tools and resources that help you manage your farm operations efficiently, 
              from planting to harvesting.
            </p>
          </div>
          <div className="service-item">
            <h3>Crop Advisory</h3>
            <p>
              Receive expert advice on which crops to grow based on soil health, weather conditions, 
              and market demand.
            </p>
          </div>
          <div className="service-item">
            <h3>Weather Forecasting</h3>
            <p>
              Stay informed with accurate weather predictions to make timely decisions for your farming activities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
