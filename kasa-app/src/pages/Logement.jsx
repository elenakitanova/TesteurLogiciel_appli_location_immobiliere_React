import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams = lire l'id dans l'URL ; useNavigate = redirection
import Slideshow from '../composants/Slideshow.jsx';
import Hote from '../composants/Hote.jsx';
import TitreLieu from '../composants/TitreLieu.jsx';
import Etoiles from '../composants/Etoiles.jsx';
import Tag from '../composants/Tag.jsx';
import Collapse from '../composants/Collapse.jsx';
import './styles/Logement.css';

/**
 *  1) Récupérer l'id du logement depuis l'URL (ex: /logement/af6d2d48)
 *  2) Appeler l’API : GET /api/properties/:id
 *  3) Si l’id est inconnu → rediriger vers /404 (instruction du brief)
 *  4) Afficher le diaporama + le bandeau d’infos + 2 collapses
 */
export default function Logement() {
  // 1) id présent dans l'URL. Exemple : /logement/123 → id = "123"
  const { id } = useParams();

  // 2) navigate permet de rediriger (ici vers /404 en cas d’ID invalide)
  const navigate = useNavigate();

  // State local : la fiche logement et l’état de chargement
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Au montage (et à chaque changement d’id), on va chercher la fiche du logement
   * Version simple (pas de “cancel flag” ni d’optimisation avancée)
   */
  useEffect(() => {
    async function fetchProperty() {
      try {
        // Appel API : GET /api/properties/:id
        const res = await fetch(`http://localhost:8080/api/properties/${id}`);

        // Si l’API ne renvoie pas 2xx, on considère l’id invalide → /404
        if (!res.ok) {
          navigate('/404', { replace: true });
          return;
        }

        // Réponse OK → on lit le JSON et on le met en state
        const data = await res.json();
        setProperty(data);
      } catch {
        // Erreur réseau/serveur → on reste simple : redirection 404
        navigate('/404', { replace: true });
      } finally {
        // Dans tous les cas, on coupe l’indicateur de chargement
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id, navigate]);

  // Pendant le chargement : petit message (placeholder)
  if (loading) {
    return <main className="logement-page">Chargement...</main>;
  }

  // Par sécurité : si on arrive ici sans data (ex: redirection déjà partie), on ne rend rien
  if (!property) return null;

  // --- Données prêtes pour l’affichage ---

  // Liste d’images pour le diaporama (tableau vide si absent)
  const images = property.pictures || [];

  // Note : on convertit simplement en nombre (suffisant pour ce projet)
  const rating = Number(property.rating) || 0;

  // --- Rendu de la page ---

  return (
    <main className="logement-page">
      {/*
        1) Diaporama (Slideshow)
        - Reçoit la liste des images et un texte alt de base (le titre)
        - Gère en interne les flèches et le compteur 1/N (pas de clavier ici)
      */}
      <Slideshow images={images} altBase={property?.title || 'Photo logement'} />

      {/*
        2) Bandeau d’infos sous le diaporama
           Desktop : 
             - Colonne gauche : titre + lieu + tags
             - Colonne droite : hôte (nom + photo) + étoiles
           Mobile :
             - Empilé verticalement (géré via CSS)
      */}
      <section className="logement-header" aria-label="Informations du logement">
        {/* Colonne gauche : Titre/Lieu + Tags */}
        <div className="header-left">
          {/* Titre (ex: “Cozy loft…”) + Localisation (ex: “Paris, Île-de-France”) */}
          <TitreLieu title={property.title} location={property.location} />

          {/* Tags : badges sur une ligne, scrollables si trop nombreux */}
          <div className="tags-row">
            {(property.tags || []).map((t, i) => (
              <Tag key={`${t}-${i}`} text={t} />
            ))}
          </div>
        </div>

        {/* Colonne droite : Hôte + Étoiles */}
        <div className="header-right">
          {/* Nom + photo de l’hôte */}
          <div className="hote">
            <div className="hote-name">{property?.host?.name}</div>
            <img
              className="hote-picture"
              src={property?.host?.picture}
              alt={property?.host?.name}
            />
          </div>

          {/* Note en étoiles (0 à 5) */}
          <div className="etoiles">
            <Etoiles rating={rating} />
          </div>
        </div>
      </section>

      {/*
        3) Deux sections déroulantes (Collapse) : Description et Équipements
           - On réutilise le même composant que sur A Propos
      */}
      <section className="logement-collapses" aria-label="Description et équipements">
        {/* Texte de présentation du logement */}
        <Collapse title="Description" content={property?.description || ''} />

        {/* Liste des équipements (ul/li) */}
        <Collapse
          title="Équipements"
          content={
            <ul className="equip-list">
              {(property?.equipments || []).map((eq, i) => (
                <li key={`${eq}-${i}`}>{eq}</li>
              ))}
            </ul>
          }
        />
      </section>
    </main>
  );
}
