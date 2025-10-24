import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams = lire l'id dans l'URL ; useNavigate = redirection
import Slideshow from '../composants/Slideshow.jsx';
import Hote from '../composants/Hote.jsx';
import TitreLieu from '../composants/TitreLieu.jsx';
import Etoiles from '../composants/Etoiles.jsx';
import Tag from '../composants/Tag.jsx';
import Collapse from '../composants/Collapse.jsx';
import './styles/Logement.css';

/** La page : 
 * 1. Récupère le paramètre d'URL dynamique (:id) via useParams().
 * 2. Lance l'appel API ciblé GET /api/properties/:id.
 * 3. Gère la redirection 404 si l'ID n'est pas trouvé (via useNavigate).
 */
export default function Logement() {
  // 1) Extraction du paramètre id présent dans l'URL et du hook de navigation. Exemple : /logement/123 → id = "123"
  const { id } = useParams();

  // Fonction pour gérer les redirections programmatiques, permet de rediriger (ici vers /404 en cas d’ID invalide)
  const navigate = useNavigate();

  // État pour stocker la fiche de logement (null initialement) et l'état de chargement
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Au montage (et à chaque changement d’id), on va chercher la fiche du logement
   */
  useEffect(() => {
    async function fetchProperty() {
      try {
        // Appel API ciblé utilisant l'ID récupéré : GET /api/properties/:id
        const res = await fetch(`http://localhost:8080/api/properties/${id}`);

        // 2. Gestion d'erreur critique : Redirection 404
        // Point de contrôle crucial : si la réponse n'est pas OK, on considère l’id invalide → on redirige /404
        if (!res.ok) {
          navigate('/404', { replace: true }); // Redirection en cas d'ID inconnu
          return;
        }

        // Réponse OK → on lit le JSON et on le met en state
        const data = await res.json();
        setProperty(data);
      } catch {
        // En cas d'erreur réseau ou de parsing, on redirige également vers la page 404
        navigate('/404', { replace: true });
      } finally {
        // Dans tous les cas, on coupe l’indicateur de chargement
        setLoading(false);
      }
    }

    // L'effet se ré-exécute uniquement si l'ID dans l'URL change
    fetchProperty();
  }, [id, navigate]); // Dépendances : s'exécute si l'ID ou l'objet navigate change, navigate (pour la stabilité du hook)

  // Pendant le chargement : petit message (placeholder)
  if (loading) {
    return <main className="logement-page">Chargement...</main>;
  }

  // Par sécurité : si on arrive ici sans data (ex: redirection déjà partie), on ne rend rien
  if (!property) return null;

  // --- Données prêtes pour l’affichage ---

  // Liste d’images pour le diaporama (tableau vide si absent)
  // Préparation des props : Assurer qu'elles sont des tableaux/nombres valides
  const images = property.pictures || [];

  // On convertit simplement en nombre
  const rating = Number(property.rating) || 0;

  // --- Rendu de la page de détail ---
{/* Composition de la page avec les props extraites de 'property' */}
  return (
    <main className="logement-page"> 
    
      {/*
        1) Diaporama (Slideshow)
        - Reçoit la liste des images et un texte alt de base (le titre)
        - Gère en interne les flèches (index) et le compteur 1/N / la navigation cyclique 
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
          {/* Tags : itération */}

          {/* Tags : badges sur une ligne, scrollables si trop nombreux */}
          <div className="tags-row">
            {/* Mapping des tags avec une clé unique */}
            {(property.tags || []).map((t, i) => (
              <Tag key={`${t}-${i}`} text={t} />
            ))}
          </div>
        </div>

        {/* Colonne droite : Hôte + Étoiles */}
        <div className="header-right">
          {/* {/* Hôte (Nom + photo de l’hôte )*/} 
          <div className="hote">
            <div className="hote-name">{property?.host?.name}</div>
            <img
              className="hote-picture"
              src={property?.host?.picture}
              alt={property?.host?.name}
            />
          </div>

           {/* Génération des étoiles basée sur le rating */}
            {/* Note en étoiles (0 à 5) */}
          <div className="etoiles">
            <Etoiles rating={rating} />
            {/* prop 'rating' est convertie en nombre */}
          </div>
        </div>
      </section>

      {/*
        3) Deux sections déroulantes (COLLAPSE) : Description et Équipements
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
