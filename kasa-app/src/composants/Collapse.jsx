import React, { useState } from 'react';
import './styles/Collapse.css';

/**
 * Composant Collapse (liste déroulante) — version simplifiée
 * - Props :
 *    - title   : texte de l’entête
 *    - content : contenu à afficher quand c’est ouvert (string ou JSX)
 * - Fonctionnement :
 *    - Un état local isOpen qui bascule au clic.
 *    - On ajoute la classe 'open' au header et au contenu quand c’est ouvert,
 *      ce qui déclenche les styles/animations dans le CSS.
 */
export default function Collapse({ title, content }) {
  // État local : true = ouvert / false = fermé
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Conteneur du bloc (garde l’espacement entre plusieurs collapses)
    <div className="collapse-wrapper">
      {/*
        Bouton d’entête :
        - On toggle l’état au clic.
        - La classe 'open' enlève l’arrondi bas quand c’est ouvert (via CSS).
      */}
      <button
        className={`collapse-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        type="button"
      >
        {/* Titre à gauche */}
        <span className="collapse-title">{title}</span>

        {/* Icône chevron à droite (SVG inline). Haut si ouvert, bas sinon. */}
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? (
            // Chevron vers le haut
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M18 15l-6-6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // Chevron vers le bas
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </button>

      {/*
        Contenu déroulant :
        - La classe 'open' passe de max-height:0 à une grande valeur + opacity:1 (voir CSS).
        - On rend 'content' tel quel (string ou JSX), enveloppé dans un conteneur avec padding.
      */}
      <div className={`collapse-content ${isOpen ? 'open' : ''}`}>
        <div className="collapse-text-content">
          {content}
        </div>
      </div>
    </div>
  );
}



