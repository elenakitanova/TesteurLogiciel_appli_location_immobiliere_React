import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Card.css';

/* Composant utilisé dans une boucle sur la page d'Accueil {properties.map((p) => (
 * Composant interactif → Au clic, on navigue vers /logement/:id (détails du logement)
 * Props : la page d'Accueil passe à card l'objet de données property 
 * qui contient au minimum l'id, le title et le cover
 */

const Card = ({ property }) => {
  return (
    // Utilise la librairie React Router et la balise <Link> pour créer 
    // dynamiquement l'URL de la page de détail en injectant l'id du logement dans l'adresse 
    // => pas de rechargement de page
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