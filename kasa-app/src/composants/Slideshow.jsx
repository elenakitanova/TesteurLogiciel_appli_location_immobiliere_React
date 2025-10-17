import React, { useState, useMemo, useCallback } from 'react';
import './styles/Slideshow.css';

/**
 * Slideshow
 * @param {string[]} images - URLs absolues des images
 * @param {string} altBase  - Préfixe pour alt (ex: "Photo logement")
 * @param {string} height   - Hauteur forcée (ex: "415px") sinon CSS
 */
export default function Slideshow({ images = [], altBase = 'Photo logement', height }) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  if (!Array.isArray(images) || total === 0) return null;

  const goNext = useCallback(() => setIndex(i => (i + 1) % total), [total]);
  const goPrev = useCallback(() => setIndex(i => (i - 1 + total) % total), [total]);

  const currentSrc = useMemo(() => images[index], [images, index]);
  const showControls = total > 1; // flèches + compteur uniquement si > 1

  return (
    <div
      className="slideshow"
      style={height ? { height } : undefined}
      role="region"
      aria-label="Galerie photos du logement"
      tabIndex={0}
      onKeyDown={(e) => {
        if (!showControls) return;
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
      }}
    >
      <img
        src={currentSrc}
        alt={`${altBase} ${index + 1}/${total}`}
        className="slideshow-image"
        draggable="false"
      />

      {showControls && (
        <>
          {/* Flèche gauche */}
          <button
            className="slideshow-arrow left"
            onClick={goPrev}
            aria-label="Image précédente"
            type="button"
          >
            <svg viewBox="0 0 48 48" className="arrow-svg" aria-hidden="true" focusable="false">
              <path
                d="M28 36 L16 24 L28 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </button>

          {/* Flèche droite */}
          <button
            className="slideshow-arrow right"
            onClick={goNext}
            aria-label="Image suivante"
            type="button"
          >
            <svg viewBox="0 0 48 48" className="arrow-svg" aria-hidden="true" focusable="false">
              <path
                d="M20 12 L32 24 L20 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </button>

          {/* Compteur centré (ex: 1/4) */}
          <div className="slideshow-counter" aria-live="polite">
            {index + 1}/{total}
          </div>
        </>
      )}
    </div>
  );
}


