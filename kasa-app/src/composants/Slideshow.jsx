import React, { useState } from 'react'; // useState : stocker l’index de l’image courante
import './styles/Slideshow.css'; // styles du carrousel

/**
 * Props :
 *  - images : tableau d’URLs d’images (ex: ['a.jpg','b.jpg'])
 *  - altBase : texte de base pour l’attribut alt (ex: "Photo logement")
 *  - height : hauteur fixe optionnelle (ex: "415px") si besoin de surcharger le CSS
 *
 * Fonctionnalités :
 *  - flèches gauche/droite (avec boucle quand on arrive au bout)
 *  - navigation clavier (← →) quand le carrousel a le focus
 *  - compteur "1/N"
 *  - si une seule image → pas de flèches, pas de compteur
 */
export default function Slideshow({ images = [], altBase = 'Photo logement', height }) {
  // index de l’image affichée
  const [index, setIndex] = useState(0);

  // nombre total d’images (si images n’est pas un tableau, total = 0)
  const total = images?.length ?? 0;

  // aucun visuel à afficher → on ne rend rien
  if (!total) return null;

  // passe à l’image suivante (et revient à la 1re après la dernière)
  function goNext() {
    setIndex((i) => (i + 1) % total);
  }

  // passe à l’image précédente (et va à la dernière si on est à la 1re)
  function goPrev() {
    setIndex((i) => (i - 1 + total) % total);
  }

  // on montre les contrôles seulement s’il y a plus d’une image
  const showControls = total > 1;

  return (
    <div
      className="slideshow"                           // conteneur principal
      style={height ? { height } : undefined}         // permet de forcer la hauteur si prop fournie
      role="region"                                   // accessibilité : zone distincte
      aria-label="Galerie photos du logement"         // label lisible par les lecteurs d’écran
      tabIndex={0}                                    // rend le div focusable (pour capter les flèches clavier)
      onKeyDown={(e) => {                             // navigation clavier
        if (!showControls) return;
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft')  goPrev();
      }}
    >
      {/* Image courante (en fonction de l’index) */}
      <img
        src={images[index]}
        alt={`${altBase} ${index + 1}/${total}`}      // alt dynamique "Photo logement 2/5"
        className="slideshow-image"
        draggable="false"                              // évite le drag de l’image au clic
      />

      {/* Flèches + compteur visibles seulement s’il y a > 1 image */}
      {showControls && (
        <>
          {/* Flèche gauche (image précédente) */}
          <button
            className="slideshow-arrow left"
            onClick={goPrev}
            aria-label="Image précédente"             // accessibilité
            type="button"
          >
            {/* Icône de flèche (traits carrés, plus épais) */}
            <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
              <path
                d="M28 36 L16 24 L28 12"             // chevron gauche
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="butt"                  // bouts carrés (pas arrondis)
                strokeLinejoin="miter"                // angles pointus (miroir de la maquette)
                vectorEffect="non-scaling-stroke"     // épaisseur constante au redimensionnement
              />
            </svg>
          </button>

          {/* Flèche droite (image suivante) */}
          <button
            className="slideshow-arrow right"
            onClick={goNext}
            aria-label="Image suivante"
            type="button"
          >
            <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
              <path
                d="M20 12 L32 24 L20 36"             // chevron droit
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </button>

          {/* Compteur centré : "imageCourante / total" */}
          <div className="slideshow-counter" aria-live="polite">
            {index + 1}/{total}
          </div>
        </>
      )}
    </div>
  );
}





