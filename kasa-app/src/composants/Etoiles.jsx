import React from 'react';
import './styles/Etoiles.css';

function Star({ filled, size = 24, title, colorFilled = '#FF6060', colorEmpty = '#E3E3E3' }) {
  // Icône étoile (path Material Design), colorée via fill
  return (
    <svg
      className="star"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <title>{title}</title>
      <path
        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
        fill={filled ? colorFilled : colorEmpty}
      />
    </svg>
  );
}

/**
 * Étoiles
 * @param {number|string} rating   - Note 0..5 (string dans l'API → on convertit)
 * @param {number} size            - Taille d’une étoile (px). Défault ~24px (maquette 24.75)
 * @param {number} gap             - Espace entre étoiles (px). Défault 12px (maquette ~18px)
 * @param {number} width           - Largeur du bloc (px). Défault 196 (maquette)
 * @param {number} height          - Hauteur du bloc (px). Défault 36 (maquette)
 */
export default function Etoiles({
  rating = 0,
  size = 24,
  gap = 12,
  width = 196,
  height = 36,
  className = '',
}) {
  const value = Math.max(0, Math.min(5, parseInt(rating, 10) || 0)); // clamp 0..5
  const max = 5;

  return (
    <div
      className={`etoiles ${className}`}
      role="img"
      aria-label={`Note ${value} sur ${max}`}
      style={{ width: `${width}px`, height: `${height}px`, gap: `${gap}px` }}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          filled={i < value}
          size={size}
          title={i < value ? 'Étoile remplie' : 'Étoile vide'}
        />
      ))}
    </div>
  );
}
