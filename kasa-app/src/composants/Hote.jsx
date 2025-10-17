import React from 'react';
import './styles/Hote.css';

export default function Hote({
  name = '',
  picture = '',
  size = 64,          // taille de l’avatar en px (desktop)
  align = 'right',    // 'left' | 'right' (aligne le bloc)
  className = '',
}) {
  // fallback si pas d'image
  const fallback =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="100%" height="100%" fill="%23E3E3E3"/><circle cx="128" cy="96" r="56" fill="%23CFCFCF"/><rect x="48" y="168" width="160" height="60" rx="30" fill="%23CFCFCF"/></svg>';

  // coupe le nom en 2 lignes (prénom / nom) si possible
  const [first, ...rest] = (name || '').trim().split(' ');
  const displayName = (
    <>
      <span>{first || ''}</span>
      {rest.length > 0 && <br />}
      <span>{rest.join(' ')}</span>
    </>
  );

  return (
    <div
      className={`hote ${align === 'right' ? 'hote--right' : 'hote--left'} ${className}`}
      style={{ '--avatar-size': `${size}px` }}
    >
      <div className="hote__name">{displayName}</div>
      <img
        className="hote__avatar"
        src={picture || fallback}
        alt={name ? `Hôte : ${name}` : 'Hôte'}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
