import React from 'react';

/**
 * Etoiles
 * - rating : nombre de 0 à 5
 * - Affiche 5 étoiles, remplies jusqu’à "rating"
 */
export default function Etoiles({ rating = 0, size = 24 }) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));
  // S'assure que la note est bien entre 0 et 5

  return (
    <div className="etoiles-strip" aria-label={`Note : ${value} sur 5`}>
        {/* Crée un tableau de 5 éléments pour itérer */}
      {Array.from({ length: 5 }).map((_, i) => {
        // Logique de remplissage : Si l'index i est inférieur à la note, l'étoile est remplie
        const filled = i < value;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ verticalAlign: 'middle', marginLeft: i ? 6 : 0 }}
          >
            <path
              d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 8.8l6.5-.9L12 2z"
              fill={filled ? '#FF6060' : '#E3E3E3'}
            />
          </svg>
        );
      })}
    </div>
  );
}

