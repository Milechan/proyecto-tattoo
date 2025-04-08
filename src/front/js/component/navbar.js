import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import profilePic from "../../img/foto_perfil.webp";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container d-flex justify-content-between align-items-center w-100">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">LOGO TATTOO MATCH</span>
          </Link>
          <input
            type="text"
            className="form-control w-50"
            placeholder="Buscar..."
            aria-label="Buscar"
          />
          <div>
            <button className="profile-button" onClick={toggleMenu}>
              <img src={profilePic} className="img-profile" alt="Foto de perfil" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>×</button>
        <ul className="menu-list">
          <li><Link to="/perfil" onClick={toggleMenu}>Perfil</Link></li>
          <li><Link to="/notificaciones" onClick={toggleMenu}>Notificaciones</Link></li>
          <li><Link to="/categorias" onClick={toggleMenu}>Categorías</Link></li>
          <li><Link to="/configuracion" onClick={toggleMenu}>Configuración</Link></li>
          <li><Link to="/quienes-somos" onClick={toggleMenu}>Quiénes Somos</Link></li>
          <li><Link to="/logout" onClick={toggleMenu}>Cerrar Sesión</Link></li>
        </ul>
      </div>
    </>
  );
};
