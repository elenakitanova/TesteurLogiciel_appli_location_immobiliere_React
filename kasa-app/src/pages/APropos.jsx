import React from 'react';
import Banner from '../composants/Banner.jsx';
import Collapse from '../composants/Collapse.jsx';
import './styles/APropos.css';
import Bannerapropos from '../assets/images/Bannerapropos.png'; 

const aboutData = [
  {
    id: 'fiabilite',
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
      'La qualité du service est au coeur de notre engagement chez Kaza. Nous veillons à ce que chaque interaction, que ce soit avec nos hôtes ou nos locataires, soit empreinte de respect et de bienveillance.',
  },
  {
    id: 'securite',
    title: 'Sécurité',
    content:
      'La sécurité est la priorité de Kasa, aussi bien pour nos hôtes, que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien aux hôtes comem les locataires, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes',
  },
];

export default function APropos() {
  return (
    <div className="apropos-page">
      {/* Bannière A Propos : image locale, pas de titre, pas d’overlay */}
      <Banner imageUrl={Bannerapropos} overlay={false} alt="Bannière À propos" />

      {/* Conteneur équivalent à la home (marges/largeur/padding) */}
      <section className="apropos-container" aria-label="Informations à propos de Kasa">
        <div className="collapse-list">
          {aboutData.map(({ id, title, content }) => (
            <Collapse key={id} title={title} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
}




