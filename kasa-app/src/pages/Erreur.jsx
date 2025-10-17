import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Erreur.css';

export default function Erreur() {
  return (
    <main className="erreur-page" aria-labelledby="erreur-code">
      {/* Le code d'erreur géant */}
      <h1 id="erreur-code" className="erreur-code">404</h1>

      {/* Le message sous le 404 */}
      <p className="erreur-message">
        Oups! La page que vous demandez n'existe pas.
      </p>

      {/* Le lien de retour vers la home */}
      <Link to="/" className="erreur-link">
        Retourner sur la page d’accueil
      </Link>
    </main>
  );
}
