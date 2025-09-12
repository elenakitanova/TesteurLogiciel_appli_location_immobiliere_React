import React, { useState, useEffect } from 'react';
import Banner from '../composants/Banner.jsx';
import Card from '../composants/Card.jsx';
import './styles/Accueil.css'; // Importation de la feuille de style pour la page

const Accueil = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données de l'API
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/properties');
        if (!response.ok) {
          throw new Error('Erreur de réseau ou de serveur.');
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Chargement des propriétés...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Erreur : {error}</div>;
  }
  
  // Utiliser l'image de la première propriété pour la bannière
  const bannerImage = properties.length > 0 ? properties[0].cover : 'https://placehold.co/1240x223';

  return (
    <div className="accueil-page">
      {/* Composant de bannière */}
      <Banner imageUrl={bannerImage} />

      {/* Section pour la galerie de cartes des propriétés */}
      <section className="gallery-container">
        <div className="card-grid">
          {/* On utilise .map() pour afficher une Card pour chaque propriété */}
          {properties.length > 0 ? (
            properties.map((property) => (
              <Card key={property.id} property={property} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">Aucune propriété trouvée.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Accueil;