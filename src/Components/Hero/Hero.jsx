// components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './hero.css';  

const Hero = () => {
  return (
    <div className="hero-container">
      <h1>Welcome to Our E-Commerce Store</h1>
      <p>Discover a wide range of products and shop conveniently from your home.</p>
      <Link to="/products" className="cta-button">
        Explore Products
      </Link>
    </div>
  );
};

export default Hero;
