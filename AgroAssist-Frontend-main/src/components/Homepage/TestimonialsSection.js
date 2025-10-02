// src/components/TestimonialsSection.js
import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Farmers Say</h2>
        <div className="testimonial-items">
          <div className="testimonial-item">
            <p>"AgriApp has transformed the way I manage my farm. Their crop advisory services are top-notch!"</p>
            <h4>- John Doe, Farmer</h4>
          </div>
          <div className="testimonial-item">
            <p>"The real-time weather updates have saved me from so many potential crop losses. I highly recommend AgriApp."</p>
            <h4>- Jane Smith, Farmer</h4>
          </div>
          <div className="testimonial-item">
            <p>"AgriApp's farm management tools have made my life so much easier. I can now plan ahead with confidence."</p>
            <h4>- Robert Brown, Farm Owner</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
