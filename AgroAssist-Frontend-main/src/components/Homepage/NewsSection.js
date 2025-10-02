// src/components/NewsSection.js
import React from 'react';
import './NewsSection.css';

const NewsSection = () => {
  return (
    <section className="news-section">
      <div className="container">
        <h2>Latest News</h2>
        <div className="news-items">
          <div className="news-item">
            <h3>Sustainable Farming Practices</h3>
            <p>Learn how modern sustainable farming practices can increase yields while protecting the environment.</p>
            <a href="/news/sustainable-farming">Read more</a>
          </div>
          <div className="news-item">
            <h3>Climate-Smart Agriculture</h3>
            <p>Explore innovative strategies that help farmers adapt to changing climate conditions.</p>
            <a href="/news/climate-smart-agriculture">Read more</a>
          </div>
          <div className="news-item">
            <h3>Advancements in Farm Equipment</h3>
            <p>Discover the latest developments in farm machinery and equipment to improve efficiency on your farm.</p>
            <a href="/news/farm-equipment">Read more</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
