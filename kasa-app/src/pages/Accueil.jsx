// src/pages/Accueil.jsx
import React, { useState, useEffect } from 'react';
import Banner from '../composants/Banner.jsx';
import Card from '../composants/Card.jsx';
import './styles/Accueil.css';

/**
 * Page d’accueil
 * - Récupère la liste des logements depuis l’API.
 * - Affiche une bannière + une grille de cartes.
 */
export default function Accueil() {
  // State : la liste des logements à afficher
  const [properties, setProperties] = useState([]);
  // State : indicateur de chargement (pendant l’appel API)
  const [loading, setLoading] = useState(true);
  // State : message d’erreur simple si l’appel échoue
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel API (version simple) déclenché au montage de la page
    fetch('http://localhost:8080/api/properties')
      .then((res) => {
        // Si le serveur ne répond pas en 2xx, on lève une erreur
        if (!res.ok) throw new Error('Erreur réseau/serveur');
        // Sinon on lit la réponse JSON
        return res.json();
      })
      .then((data) => {
        // On s’attend à un tableau → sinon on force un tableau vide
        setProperties(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        // On stocke un message d’erreur lisible
        setError(e.message);
      })
      .finally(() => {
        // Dans tous les cas, on sort du mode "chargement"
        setLoading(false);
      });
  }, []); // [] = ne s’exécute qu’une fois au premier rendu

  // État "chargement" : simple placeholder texte
  if (loading) {
    return <div className="text-center py-8">Chargement des propriétés…</div>;
  }

  // État "erreur" : message utilisateur simple
  if (error) {
    return <div className="text-center py-8 text-red-500">Erreur : {error}</div>;
  }

  // Rendu principal de la page
  return (
    <div className="accueil-page">
      {/* Bannière statique en haut de page */}
      <Banner
        title="Chez vous, partout et ailleurs"
        overlay
        alt="Paysage de forêt et de montagnes"
      />

      {/* Grille des logements (cartes) */}
      <section className="gallery-container">
        <div className="card-grid">
          {properties.length > 0 ? (
            // On génère une Card par logement
            properties.map((p) => (
              // key = p.id (on suppose l’API stable renvoie bien un id)
              <Card key={p.id} property={p} />
            ))
          ) : (
            // aucun logement à afficher
            <p className="text-center text-gray-500 col-span-full">
              Aucune propriété trouvée.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
