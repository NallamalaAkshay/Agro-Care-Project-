// src/components/NewsletterSection.js
import React from 'react';
import './NewsletterSection.css';

const NewsletterSection = () => {
  return (
    <section className="newsletter">
      <div className="container">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter to get the latest updates and resources for your farm.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
