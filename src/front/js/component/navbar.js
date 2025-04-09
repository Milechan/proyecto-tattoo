import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import profilePic from "../../img/foto_perfil.webp";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
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
          <li><Link to="/" onClick={closeAll}>Inicio</Link></li>
          <li><Link to="/perfil" onClick={closeAll}>Perfil</Link></li>
          <li><Link to="/notifications" onClick={closeAll}>Notificaciones</Link></li>
          <li><Link to="/configuracion" onClick={closeAll}>Configuración</Link></li>
          <li><Link to="/about" onClick={closeAll}>Quiénes Somos</Link></li>
          <li><Link to="/logout" onClick={closeAll}>Cerrar Sesión</Link></li>
          <li className="dropdown-container"> {/* Añadimos un contenedor para el dropdown */}
            <div className="dropdown-toggle" onClick={toggleDropdown}>
              Categorías
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/category/neotradicional" onClick={closeAll}>Neotradicional</Link></li>
                <li><Link to="/category/geeks" onClick={closeAll}>Geeks</Link></li>
                <li><Link to="/category/minimalista" onClick={closeAll}>Minimalista</Link></li>
                <li><Link to="/category/black-out" onClick={closeAll}>Black-out</Link></li>
                <li><Link to="/category/realismo" onClick={closeAll}>Realismo</Link></li>
              </ul>
            )}
          </li>

        </ul>
      </div>
    </>
  );
};