import React from 'react';
import './styles/TitreLieu.css';

export default function TitreLieu({ title = '', location = '', className = '' }) {
  if (!title && !location) return null;

  return (
    <div className={`titre-lieu ${className}`}>
      {title && <h1 className="titre-lieu__title">{title}</h1>}
      {location && <p className="titre-lieu__location">{location}</p>}
    </div>
  );
}
