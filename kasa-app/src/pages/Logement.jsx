// src/pages/Logement.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slideshow from '../composants/Slideshow.jsx';
import Hote from '../composants/Hote.jsx';
import TitreLieu from '../composants/TitreLieu.jsx';
import Etoiles from '../composants/Etoiles.jsx';
import Tag from '../composants/Tag.jsx';
import Collapse from '../composants/Collapse.jsx';
import './styles/Logement.css';

export default function Logement() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProperty() {
      try {
        const res = await fetch(`http://localhost:8080/api/properties/${id}`);

        if (res.status === 404) {
          navigate('/404', { replace: true });
          return;
        }
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        if (!cancelled) setProperty(data);
      } catch {
        navigate('/404', { replace: true });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProperty();
    return () => { cancelled = true; };
  }, [id, navigate]);

  if (loading) {
    return <main className="logement-page">Chargement...</main>;
  }

  if (!property) return null;

  const images = Array.isArray(property.pictures) ? property.pictures : [];
  const rating = Math.max(0, Math.min(5, parseInt(property?.rating, 10) || 0));

  return (
    <main className="logement-page">
      {/* Slideshow */}
      <Slideshow images={images} altBase={property?.title || 'Photo logement'} />

      {/* Barre d’info sous le slider */}
      <section className="logement-header" aria-label="Informations du logement">
        {/* Colonne gauche : Titre + Lieu + Tags */}
        <div className="header-left">
          <TitreLieu title={property.title} location={property.location} />
          <div className="tags-row">
            {(property.tags || []).map((t, i) => (
              <Tag key={`${t}-${i}`} text={t} />
            ))}
          </div>
        </div>

        {/* Colonne droite : Hôte (haut) + Étoiles (bas) */}
        <div className="header-right">
          <Hote name={property?.host?.name} picture={property?.host?.picture} align="right" />
          <div className="etoiles">
            <Etoiles rating={rating} />
          </div>
        </div>
      </section>

      {/* Deux collapses */}
      <section className="logement-collapses" aria-label="Description et équipements">
        <Collapse
          title="Description"
          content={property?.description || ''}
        />
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
