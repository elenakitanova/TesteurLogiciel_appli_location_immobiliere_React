import React from 'react';
import './styles/banner.css';
import bannerImage from '../assets/images/bannerhome.png';

const Banner = () => {
  return (
    <div className="banner">
      <img
        src={bannerImage}
        alt="Paysage de forêt et de montagnes"
        className="banner-image"
      />
      <div className="banner-overlay"></div>
      
      <h1 className="banner-title">
        Chez vous, partout et ailleurs
      </h1>
    </div>
  );
};

export default Banner;