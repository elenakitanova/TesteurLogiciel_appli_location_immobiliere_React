import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import des pages
import Accueil from '../pages/Accueil';
import APropos from '../pages/APropos';
import Erreur from '../pages/Erreur';
import Logement from '../pages/Logement';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/apropos" element={<APropos />} />
      <Route path="/logement/:id" element={<Logement />} />
      <Route path="*" element={<Erreur />} />
      <Route path="/404" element={<Erreur />} />
    </Routes>
  );
}

export default AppRouter;