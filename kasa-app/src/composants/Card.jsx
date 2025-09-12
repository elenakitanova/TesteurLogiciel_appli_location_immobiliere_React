import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Card.css';

const Card = ({ property }) => {
  return (
    <Link to={`/logement/${property.id}`} className="card-link">
      <article className="card">
        <img
          src={property.cover}
          alt={property.title}
          className="card-image"
        />
        <div className="card-overlay"></div>
        <h2 className="card-title">{property.title}</h2>
      </article>
    </Link>
  );
};

export default Card;