import React from 'react';
import Banner from '../composants/Banner.jsx';
import Collapse from '../composants/Collapse.jsx';
import './styles/APropos.css';
import Bannerapropos from '../assets/images/Bannerapropos.png'; 


// TBLEAU STATIQUE, Données statiques pour les 4 accordéons
// Chaque item alimente un <Collapse /> : un titre + un texte
// On les laisse hors du composant pour éviter de recréer le tableau à chaque rendu
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
      
      <Banner imageUrl={Bannerapropos} overlay={false} alt="Bannière À propos" /> 
      {/* Utilisation conditionnelle de BANNER (overlay=false) => on désactive le voile sombre 
      imageUrl : on passe l’image locale importée
      */}

      <section className="apropos-container" aria-label="Informations à propos de Kasa">
        {/*
        Conteneur des sections 
        liste de COLLAPSE rendus à partir de aboutData
      */}
        <div className="collapse-list">
          {/*
          Mapping des données statiques du le tableau aboutData et boucle dessus 
          pour générer les 4 COLLAPSE => un <Collapse /> par item
          chaque instance est créée en passant le key={id} et les chaînes de caractères des props "title" et "content du tableau
          */}
          {aboutData.map(({ id, title, content }) => (
            <Collapse key={id} title={title} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
}





