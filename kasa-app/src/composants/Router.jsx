import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the pages
import Accueil from '../pages/Accueil';
import APropos from '../pages/APropos';
import Erreur from '../pages/Erreur';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/apropos" element={<APropos />} />
      <Route path="/logement/:id" element={<div>Page de logement</div>} /> 
      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}

export default AppRouter;