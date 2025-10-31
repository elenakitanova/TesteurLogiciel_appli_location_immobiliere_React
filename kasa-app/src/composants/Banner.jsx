import React from 'react';
// Feuille de style dédiée au composant (gère tailles, positions, overlay…)
import './styles/banner.css';
// Image par défaut utilisée si aucune image n’est fournie en prop
import defaultBanner from '../assets/images/bannerhome.png';

/**
 * Composant Banner réutilisable
 * Props :
 * - imageUrl : image à afficher (import ou URL). Par défaut : banner home
 * - title    : texte affiché au centre de la bannière (facultatif)
 * - overlay  : voile sombre au-dessus de l'image. Si non fourni, on l’active seulement s’il y a un titre.
 * - height   : hauteur forcée de la bannière (ex: "223px") si besoin de surcharger le CSS
 * - alt      : texte alternatif de l’image (par défaut : paysage)
 */
export default function Banner({
  imageUrl = defaultBanner,                             // valeur par défaut si imageUrl n’est pas fourni
  title,                                                // titre (si vide → on n’affiche rien)
  overlay,                                              // pas de valeur par défaut : on décidera via showOverlay
  alt = 'Paysage de forêt et de montagnes',             // texte alternatif par défaut
  height,                                               // permet d’imposer une hauteur inline
}) {
  // Règle : si "overlay" n’est pas précisé, on l’active uniquement s’il y a un titre
  const showOverlay = overlay ?? Boolean(title);

  return (
    // Conteneur de la bannière. Si "height" est défini, on applique un style inline { height }.
    <div className="banner" style={height ? { height } : undefined}>
      {/* L’image de fond de la bannière */}
      <img src={imageUrl} alt={alt} className="banner-image" />

      {/* Voile sombre : présent si overlay === true OU si overlay est omis et qu’un titre existe */}
      {showOverlay && <div className="banner-overlay" aria-hidden="true" />}

      {/* Titre centré : affiché uniquement si "title" est fourni */}
      {title ? <h1 className="banner-title">{title}</h1> : null}
    </div>
  );
}


