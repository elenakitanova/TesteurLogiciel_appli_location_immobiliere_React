// src/composants/Hote.jsx
import React from 'react';
import './styles/Hote.css';

export default function Hote({ name, picture, align = 'right' }) {
  // aligne à droite ou à gauche, sans toucher au style typographique
  const alignClass = align === 'left' ? 'hote--left' : 'hote--right';

  return (
    <div className={`hote ${alignClass}`}>
      <div className="hote__name">{name}</div>
      <img className="hote__avatar" src={picture} alt={name || 'Hôte'} />
    </div>
  );
}
