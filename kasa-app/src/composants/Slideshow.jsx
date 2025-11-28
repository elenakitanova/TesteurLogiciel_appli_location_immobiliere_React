import React, { useState } from 'react'; // Importe React et le hook useState (pour mémoriser l’index de l’image affichée)
import './styles/Slideshow.css';

// - images : tableau d’URLs
// Reçoit le tableau de toutes les URLs d'images via la prop images depuis la page Logement
export default function Slideshow({ images = [], altBase = 'Photo logement' }) {
  // État local gérant l'image affichée, on commence à 0 (la première image)
  const [index, setIndex] = useState(0);
  // index = position de l’image courante dans le tableau "images"
  // setIndex = fonction pour changer cette position

  const total = images.length;
  // Je crée une variable locale "total" qui contient le nombre d’images dans le carrousel 

  // Mise en place de la LOGIQUE CYCLIQUE
  // Utilisation de l'opérateur modulo (%) permettant au Carrousel de boucler à l'infini
  const next = () => setIndex((i) => (i + 1) % total);
  // Avancer : passe à l’image suivante, et revient au début après la dernière (boucle)

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  // Reculer : passe à l’image précédente, et va à la dernière si on est au début (boucle)

  // AFFICHAGE CONDITIONNEL DES FLECHES ET DU COMPTEUR
  const showControls = total > 1;
  // Affiche les flèches + compteur uniquement s’il y a plus d’une image

  // RENDU DU CARROUSSEL
  return (
    // Conteneur principal du carrousel
    <div className="slideshow">
      {/* Image courante (selon "index") */}
      <img
        src={images[index]}                      // Utilise l'index pour afficher l'image courante
        alt={`${altBase} ${index + 1}/${total}`} // Alt dynamique : "Photo logement 1/5"
        className="slideshow-image"              // Classe pour le style (cover, etc.)
      />

      {/* Affichage conditionnel, utilisation de l'opérateur logique ET (&&) 
      des contrôles (flèches et compteur) */}
      {showControls && (
        <>
          {/* Bouton flèche gauche (image précédente) */}
          <button className="slideshow-arrow left" type="button" onClick={prev}>
            {/* Icône SVG (chevron gauche) */}
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







