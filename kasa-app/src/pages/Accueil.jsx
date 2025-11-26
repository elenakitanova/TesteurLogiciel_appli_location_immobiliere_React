import React, { useState, useEffect } from 'react';
import Banner from '../composants/Banner.jsx';
import Card from '../composants/Card.jsx';
import './styles/Accueil.css';

/**
 * Page d’accueil
 * - Récupère la liste des logements depuis l’API.
 * - Affiche une bannière + une grille de cartes.
 */

// 1. Initialisation des états
export default function Accueil() {
  // Hook useState : Stocke la liste des logements après l'appel API
  const [properties, setProperties] = useState([]); // L'état principal qui stock les données
  // Hook useState : Indique l'état de chargement initial (true au départ)
  const [loading, setLoading] = useState(true); // UX
  // Hook useState : message d’erreur simple si l’appel échoue / stocke une éventuelle erreur de fetch
  const [error, setError] = useState(null); // Gestion d'erreur

// 2. Récupération des données au montage (un seul appel)
  useEffect(() => {
    // Appel API déclenché au montage de la page / effet déclenché une seule fois au montage du composant (grâce à [])
    fetch('http://localhost:8080/api/properties')
      .then((res) => {
        // Logique de gestion des erreurs si le serveur ne répond pas (codes non-2xx)
        if (!res.ok) throw new Error('Erreur réseau/serveur');
        // Sinon on lit la réponse JSON
        return res.json();
      })
      .then((data) => {
        // Met à jour l'état avec les données récupérées On s’attend à un tableau → sinon on force un tableau vide
        setProperties(data);
      })
      .catch((e) => {
        // Capture et affiche l'erreur si le fetch échoue 
        setError(e.message);
      })
      .finally(() => {
        // Termine l'état de chargement, peu importe le succès ou l'échec
        setLoading(false);
      });
  }, []); //[] : assure l'exécution unique au montage


  // 3. Rendu conditionnel des états (loading/error)
  if (loading) {
    return <div>Chargement des propriétés…</div>;
  } // Affichage conditionnel de l'état "chargement"

  if (error) {
  return (
    <div>
      Erreur : {error}
    </div>
  );
}// Affichage conditionnel de l'état "erreur"


  // 4. Rendu principal de l apage (utilisation des composants)
  return (
    <div className="accueil-page">
      {/* Bannière statique en haut de page */}
      <Banner
        title="Chez vous, partout et ailleurs"  // Le titre est passé en prop
        alt="Paysage de forêt et de montagnes"
      />

      {/* Génération de la Grille des logements (cartes) */}
      <section className="gallery-container">
        <div className="card-grid">
          {properties.length > 0 ? (
            // On boucle sur le tableau complet de logemment et on génère
            // une Card par logement
            properties.map((p) => (
              // On passe l'objet de données complet (property={p}) à
              // chaque carte avec une clé unique
              <Card key={p.id} property={p} />
            ))
          ) : (
            // aucun logement à afficher
            <p>
              Aucune propriété trouvée.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
