import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './composants/Router';
import Header from './composants/Header';
import Footer from './composants/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Header />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
