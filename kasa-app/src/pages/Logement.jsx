import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';// useParams = lire l'id présent dans l'URL ; useNavigate = rediriger vers une autre page
import Slideshow from '../composants/Slideshow.jsx';
import Hote from '../composants/Hote.jsx';
import TitreLieu from '../composants/TitreLieu.jsx';
import Etoiles from '../composants/Etoiles.jsx';
import Tag from '../composants/Tag.jsx';
import Collapse from '../composants/Collapse.jsx';
import './styles/Logement.css';

 /**
 * Page Logement
 * - Récupère l'id du logement depuis l'URL
 * - Va chercher les infos du logement auprès de l'API
 * - Si l'id n'existe pas → redirige vers la page 404
 * - Affiche : le diaporama de photos, les infos du logement, puis 2 blocs déroulants
 */

export default function Logement() {
  // Récupération de l'ID fourni dans l'URL (ex: /logement/abc123)
  const { id } = useParams();
  // Permet d'aller vers une autre page par code, ici redirection vers page 404
  const navigate = useNavigate();

  const [property, setProperty] = useState(null); // State local 
  // property = les données du logement récupérées depuis l'API
  const [loading, setLoading] = useState(true); // State local 
   //loading = indicateur de chargement (spinner/placeholder)

   /**
   * Au premier affichage (et si l'id change), on va chercher les données du logement
   * Si on quitte la page avant la fin, on évite de mettre à jour l'état
   */

  useEffect(() => {
    // Flag anti-fuite mémoire : évite setState si le composant est démonté
    let cancelled = false; // "vrai" si on quitte la page avant la fin du fetch

    async function fetchProperty() {
         // Fonction asynchrone qui va chercher la fiche logement
      try {
        const res = await fetch(`http://localhost:8080/api/properties/${id}`);
        // Appel API pour récupérer le logement par ID
        
        if (res.status === 404) {
        // Cas particulier : l'API dit "404 = pas trouvé" → redirection page d'erreur
          navigate('/404', { replace: true });
          return;
        }
        if (!res.ok) {
            // Toute autre réponse non OK → on déclenche une erreur
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json(); 
        // Transforme la réponse en JSON 
        if (!cancelled) setProperty(data);
        // on enregistre les données si on est encore sur la page
      } catch {
        navigate('/404', { replace: true });
        // En cas d'erreur réseau / serveur / id invalide → redirection 404
      } finally {
        // on coupe l'état "chargement"
        if (!cancelled) setLoading(false);
      }
    }

    fetchProperty();
    // Lance le chargement
    return () => { cancelled = true; };
    // Si on quitte la page : on marque l'appel comme "annulé"
  }, [id, navigate]);

  if (loading) {
    return <main className="logement-page">Chargement...</main>;
     // Pendant le chargement : petit message
  }

  if (!property) return null;
  // Sécurité : si rien à afficher (ex: redirection déjà faite), on ne rend rien

  // Normalisation des données :
  // Photos à afficher dans le diaporama (tableau vide si rien)
  const images = Array.isArray(property.pictures) ? property.pictures : [];
  const rating = Math.max(0, Math.min(5, parseInt(property?.rating, 10) || 0));
  // Note convertie proprement en entier entre 0 et 5 pour le composant Etoiles
  
  return (
    // Contenu principal de la page "Logement"
    <main className="logement-page">
      {/* Slideshow */}
      <Slideshow images={images} altBase={property?.title || 'Photo logement'} />

      {/* Barre d'infos sous le carrousel :
        - à gauche : titre du logement, ville/région, tags
        - à droite : infos de l'hôte (nom + photo) puis la note sous forme d'étoiles */}
      <section className="logement-header" aria-label="Informations du logement">
        
        <div className="header-left">
            {/* Colonne gauche : Titre + Lieu + Tags */}
             
          <TitreLieu title={property.title} location={property.location} />
           {/* Titre du logement + localisation (ex: Paris, Île-de-France) */}
          
          <div className="tags-row">
            {/* Liste des tags/badges du logement (affichés sur une ligne, défilables si trop nombreux) */}
            {(property.tags || []).map((t, i) => (
              <Tag key={`${t}-${i}`} text={t} />
            ))}
          </div>
        </div>

        {/* Colonne droite : Hôte (haut) + Étoiles (bas) */}
        <div className="header-right">
          <Hote name={property?.host?.name} picture={property?.host?.picture} align="right" />
          {/* Carte hôte : nom et photo du propriétaire/gestionnaire du logement */}
          
          <div className="etoiles">
            {/* Note du logement représentée par 0 à 5 étoiles */}
            <Etoiles rating={rating} />
          </div>
        </div>
      </section>

      {/* Deux collapses repliables : description du logement et équipements disponibles */}
      <section className="logement-collapses" aria-label="Description et équipements">
        {/* Bloc "Description" : texte de présentation du logement */}
        <Collapse
          title="Description" 
          content={property?.description || ''} 
        />
        {/* Bloc "Équipements" : liste des équipements (affichés en puces) */}
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
