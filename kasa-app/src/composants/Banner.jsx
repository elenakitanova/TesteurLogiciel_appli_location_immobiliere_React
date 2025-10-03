import React from 'react';
import './styles/banner.css';
import defaultBanner from '../assets/images/bannerhome.png';

/**
 * Banner réutilisable
 * @param {string} imageUrl    - URL ou import de l'image (défaut: banner home)
 * @param {string} title       - Titre affiché (si vide/undefined, pas de titre)
 * @param {boolean} overlay    - Affiche l'overlay sombre (défaut: true)
 * @param {string} alt         - Texte alternatif de l'image (défaut: "Bannière")
 * @param {string} height      - Hauteur fixe (ex: "223px") si tu veux surcharger le CSS
 */
export default function Banner({
  imageUrl = defaultBanner,
  title,
  overlay = true,
  alt = 'Paysage de forêt et de montagnes',
  height,
}) {

  return (
    <div className="banner" style={height ? { height } : undefined}>
      <img src={imageUrl} alt={alt} className="banner-image" />
      {overlay && <div className="banner-overlay" aria-hidden="true" />}
      {title ? <h1 className="banner-title">{title}</h1> : null}
    </div>
  );
}
