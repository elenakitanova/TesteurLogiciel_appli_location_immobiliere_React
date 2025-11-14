import React from 'react';
import './styles/banner.css';
// Image par défaut utilisée si aucune image n’est fournie en prop
import defaultBanner from '../assets/images/bannerhome.png';

/**
 * Props Flexibles :
 * - imageUrl : image à afficher (import ou URL). Par défaut : banner home
 * - title
 * - overlay  
 * - alt      
 */
export default function Banner({
  imageUrl = defaultBanner,       // valeur par défaut si imageUrl n’est pas fourni
  title,                         // titre (si vide => on n’affiche rien)
  overlay,                       // pas de valeur par défaut : on décidera via showOverlay
  alt = 'Paysage de forêt et de montagnes', // texte alternatif par défaut                                            
}) {

  // Affichage conditionnel : utilisation de l'opérateur de coalescence nulle (??) 
  //si "overlay" n’est pas précisé => on l’active uniquement s’il y a un titre
  const showOverlay = overlay ?? Boolean(title);

  return (
    // Conteneur de la bannière
    <div className="banner">
      <img src={imageUrl} alt={alt} className="banner-image" />

      {/* Affichage conditionnel : utilisation de l'opérateur logique &&
    overlay présent si overlay === true OU si overlay est omis et qu’un titre existe */}
      {showOverlay && <div className="banner-overlay" aria-hidden="true" />}

      {/* Affichage conditionnel : utilisation de l'Opérateur Ternaire =>
        le Titre <h1> n’est rendu que si title est fourni/non vide */}
      {title ? <h1 className="banner-title">{title}</h1> : null}
    </div>
  );
}


