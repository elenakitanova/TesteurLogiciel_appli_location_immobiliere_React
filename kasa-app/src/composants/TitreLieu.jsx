import React from 'react';
import './styles/TitreLieu.css';

export default function TitreLieu({ title, location, className = '' }) {
    // On fusionne la classe de base "titre-lieu" avec d’éventuelles classes passées par le parent
  return (
    <div className={`titre-lieu ${className}`}>
         {/* Titre principal du logement */}
      <h1 className="titre-lieu__title">{title}</h1>

      {/* Localisation (ville / région) */}
      <p className="titre-lieu__location">{location}</p>
    </div>
  );
}


