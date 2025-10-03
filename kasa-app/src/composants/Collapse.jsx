// src/composants/Collapse.jsx
import React, { useState, useMemo } from 'react';
import './styles/Collapse.css';

// Icônes chevrons en SVG inline (aucune dépendance)
const ChevronDown = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronUp = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Composant réutilisable de liste déroulante (Collapse)
 * @param {string} title
 * @param {React.ReactNode} content
 */
export default function Collapse({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const sectionId = useMemo(() => {
    const base = typeof title === 'string' ? title : 'section';
    return 'collapse-' + base.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }, [title]);

  const contentClassName = `collapse-content ${isOpen ? 'open' : ''}`;
  const renderedContent = typeof content === 'string' ? <p>{content}</p> : content;

  return (
    <div className="collapse-wrapper">
      <button
        className={`collapse-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(v => !v)}
        aria-expanded={isOpen}
        aria-controls={sectionId}
        type="button"
      >
        <span className="collapse-title">{title}</span>
        <span className="collapse-icon" aria-hidden="true">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
      </button>

      <div id={sectionId} className={contentClassName}>
        <div className="collapse-text-content">
          {renderedContent}
        </div>
      </div>
    </div>
  );
}


