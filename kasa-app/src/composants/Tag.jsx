import React from 'react';
import './styles/Tag.css';

export default function Tag({ text }) {
// classe .tag pour le style; On récupère directement la valeur text envoyée au composant
  return <span className="tag">{text}</span>; 
 // le composant affiche simplement un <span> avec la classe tag, et dedans on met le texte reçu 
}

