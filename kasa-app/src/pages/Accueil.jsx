import React, { useState, useEffect } from 'react';
import Banner from '../composants/Banner.jsx';
import Card from '../composants/Card.jsx';
import './styles/Accueil.css';

const Accueil = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/properties');
        if (!response.ok) throw new Error('Erreur de réseau ou de serveur.');
        const data = await response.json();
        setProperties(Array.isArray(data) ? data : (data?.data ?? []));
        console.log('properties[0] =', data?.[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div className="text-center py-8">Chargement des propriétés...</div>;
  if (error)   return <div className="text-center py-8 text-red-500">Erreur : {error}</div>;

  return (
    <div className="accueil-page">
      {/* Bannière statique (image par défaut du composant) */}
      <Banner
        title="Chez vous, partout et ailleurs"
        overlay
        alt="Paysage de forêt et de montagnes"
      />

      {/* Galerie de propriétés */}
      <section className="gallery-container">
        <div className="card-grid">
          {properties.length > 0 ? (
            properties.map((property) => (
              <Card key={property.id || property._id} property={property} />
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
