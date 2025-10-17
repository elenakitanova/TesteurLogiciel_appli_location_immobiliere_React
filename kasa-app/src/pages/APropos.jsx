import React from 'react';
import Banner from '../composants/Banner.jsx';
import Collapse from '../composants/Collapse.jsx';
import './styles/APropos.css';
import Bannerapropos from '../assets/images/Bannerapropos.png'; 

/**
 * Données statiques de la page "À propos".
 * Chaque item alimente un <Collapse /> : un titre + un texte.
 * (On les laisse hors du composant pour éviter de recréer le tableau à chaque rendu.)
 */
const aboutData = [
  {
    id: 'fiabilite', // clé unique pour React (utilisée comme "key" dans la liste)
    title: 'Fiabilité',
    content:
      'Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées par nos équipes.',
  },
  {
    id: 'respect',
    title: 'Respect',
    content:
      'La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou perturbateur entraîne une exclusion de notre plateforme.',
  },
  {
    id: 'service',
    title: 'Service',
    content:
      'La qualité du service est au coeur de notre engagement chez Kasa. Nous veillons à ce que chaque interaction, que ce soit avec nos hôtes ou nos locataires, soit empreinte de respect et de bienveillance.',
  },
  {
    id: 'securite',
    title: 'Sécurité',
    content:
      'La sécurité est la priorité de Kasa, aussi bien pour nos hôtes, que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien aux hôtes comme les locataires, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes',
  },
];

export default function APropos() {
  return (
    // Conteneur principal de la page "À propos" (sert surtout au layout/CSS)
    <div className="apropos-page">
      {/*
        Bannière spécifique à la page À propos :
        - imageUrl : on passe l’image locale importée
        - overlay={false} : on désactive le voile sombre si ton composant le gère
      */}
      <Banner imageUrl={Bannerapropos} overlay={false} alt="Bannière À propos" />

      {/*
        Conteneur des sections 
        liste de Collapse rendus à partir de aboutData
      */}
      <section className="apropos-container" aria-label="Informations à propos de Kasa">
        <div className="collapse-list">
          {/*
            On “map” le tableau aboutData pour générer un <Collapse /> par item
            - key={id} : indispensable pour les listes React (améliore les performances et évite des warnings)
            - title / content : props attendues par le composant Collapse
          */}
          {aboutData.map(({ id, title, content }) => (
            <Collapse key={id} title={title} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
}





