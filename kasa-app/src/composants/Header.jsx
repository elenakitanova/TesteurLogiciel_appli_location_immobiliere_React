import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/LOGO-Kasa-Header.svg';
import './styles/Header.css';

function Header() {
  return (
    <div className="header-wrapper"> {/* le conteneur qui enveloppe le header pour le centrage */}
      <header className="header">
        <img src={logo} alt="Logo de Kasa" className="logo" />
        <nav className="navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Accueil
          </NavLink>
          <NavLink 
            to="/apropos" 
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            À Propos
          </NavLink>
        </nav>
      </header>
    </div>
  );
}

export default Header;