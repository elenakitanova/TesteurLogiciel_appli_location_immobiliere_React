import React from 'react';
import logo from '../assets/images/LOGO-Kasa-Footer.svg';
import './styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Logo de Kasa" className="footer-logo" />
        <p className="footer-text">© 2020 Kasa. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;