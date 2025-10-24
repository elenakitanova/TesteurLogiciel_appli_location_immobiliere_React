import React, { useState } from 'react'; // Importe React et le hook useState (pour mémoriser l’index de l’image affichée)
import './styles/Slideshow.css';

// - images : tableau d’URLs
// - height : (optionnel) force une hauteur via style inline
export default function Slideshow({ images = [], altBase = 'Photo logement', height }) {
  // État local gérant l'image affichée
  
  const [index, setIndex] = useState(0);
  // index = position de l’image courante dans le tableau "images"
  // setIndex = fonction pour changer cette position

  const total = Array.isArray(images) ? images.length : 0;
  // Nombre total d’images (si "images" n’est pas un tableau, total = 0)

  if (total === 0) return null;
  // Si aucune image, on n’affiche rien (évite un carrousel vide)

  const next = () => setIndex(i => (i + 1) % total);
  // Logique de navigation cyclique (le modulo %)
  // Passe à l’image suivante, et revient au début après la dernière (boucle)

  const prev = () => setIndex(i => (i - 1 + total) % total);
  // Logique de navigation cyclique (le modulo %)
  // Passe à l’image précédente, et va à la dernière si on est au début (boucle)

  const showControls = total > 1;
  // Affiche les flèches + compteur uniquement s’il y a plus d’une image

  // Rendu du carrousel
  return (
    // Conteneur principal du carrousel
    // - style(height) si la prop "height" est fournie (sinon, laisse le CSS gérer)
    <div className="slideshow" style={height ? { height } : undefined}>
      {/* Image courante (selon "index") */}
      <img
        src={images[index]}                       // Utilise l'index pour afficher l'image courante
        alt={`${altBase} ${index + 1}/${total}`}  // Alt dynamique : "Photo logement 2/5"
        className="slideshow-image"               // Classe pour le style (cover, etc.)
        draggable="false"                         // Empêche le « drag » d’image au clic
      />

      {/* Affichage conditionnel des contrôles (flèches et compteur) */}
      {showControls && (
        <>
          {/* Bouton flèche gauche (image précédente) */}
          <button className="slideshow-arrow left" type="button" onClick={prev}>
            {/* Icône SVG (chevron gauche) */}
            {/* width/height à 100% → le SVG occupe toute la zone du bouton, sans bloc 150x150 */}
            <svg viewBox="0 0 48 48" width="100%" height="100%">
              <path
                d="M28 36 L16 24 L28 12"   // Trois points reliés → chevron gauche
                fill="none"                 // Pas de remplissage (trait seulement)
                stroke="currentColor"       // Utilise la couleur courante (définie en CSS)
                strokeWidth="6"             // Épaisseur du trait
                strokeLinecap="butt"        // Extrémités du trait droites 
                strokeLinejoin="miter"      // Angles pointus 
              />
            </svg>
          </button>

          {/* Bouton flèche droite (image suivante) */}
          <button className="slideshow-arrow right" type="button" onClick={next}>
            {/* Icône SVG (chevron droit) */}
            <svg viewBox="0 0 48 48" width="100%" height="100%">
              <path
                d="M20 12 L32 24 L20 36"   // Trois points reliés → chevron droit
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />
            </svg>
          </button>

          {/* Compteur de position (ex: 1/4) */}
          <div className="slideshow-counter">
            {index + 1}/{total}
          </div>
        </>
      )}
    </div>
  );
}






