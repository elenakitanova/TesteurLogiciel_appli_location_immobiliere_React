import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Card.css';

/* Au clic, on navigue vers /logement/:id (détails du logement)
 * Props :
 * - property : { id, title, cover } (au minimum)
 */

const Card = ({ property }) => {
  return (
    // Link = lien interne (React Router), permet la navigation interne → pas de rechargement de page
    // On construit l'URL de détail avec l'id du logement
    <Link to={`/logement/${property.id}`} className="card-link">
      {/* article = bloc de contenu autonome (sémantique HTML) */}
      <article className="card">
        {/* Image de couverture du logement */}
        <img
          src={property.cover}          // URL de l'image
          alt={property.title}          // texte alternatif (accessibilité)
          className="card-image"
        />
        {/* Calque d’overlay (dégradé/assombrissement), stylé en CSS */}
        <div className="card-overlay"></div>

        {/* Affichage du titre du logement, affiché par-dessus l'image */}
        <h2 className="card-title">{property.title}</h2>
      </article>
    </Link>
  );
};

export default Card;