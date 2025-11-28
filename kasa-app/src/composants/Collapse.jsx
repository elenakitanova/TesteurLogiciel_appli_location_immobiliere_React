import React, { useState } from 'react';
import './styles/Collapse.css';

export default function Collapse({ title, content }) {
  // État local  : gère si le collapse est ouvert ou fermé
  // True = ouvert / false = fermé
  const [isOpen, setIsOpen] = useState(false); // setIsOpen est le bouton de contrôle pour changer cet état

  return (
    // Conteneur du bloc (garde l’espacement entre plusieurs collapses)
    <div className="collapse-wrapper">
      
      {/* Bande cliquable qui change l'état local :
          On toggle l’état au clic : Si c'était false (fermé), ça devient true (ouvert) => 
          => Si c'était true, ça redevient false */}
      <button
        className={`collapse-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        type="button"
        aria-expanded={isOpen}
      >
        {/* Titre à gauche */}
        <span className="collapse-title">{title}</span>

        {/* Icône chevron à droite (SVG inline).
            Une seule icône "chevron vers le haut", rotation via CSS */}
        <span className="collapse-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M18 15l-6-6-6 6"   // chevron UP
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Contenu déroulant */}
      <div className={`collapse-content ${isOpen ? 'open' : ''}`}>
        {/* La classe 'open' déclenche les animations CSS */}
        <div className="collapse-text-content">
          {content}
        </div>
      </div>
    </div>
  );
}




