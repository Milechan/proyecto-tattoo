import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import profilePic from "../../img/foto_perfil.webp";
import logo_final from "../../img/logo_final.webp";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    closeAll();
    window.location.href = "/login";
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-light custom-navbar">
        <div className="container d-flex justify-content-between align-items-center w-100">
          <Link to="/">
            <img src={logo_final} alt="Logo Tattoo Match" className="navbar-logo" />
          </Link>
          <input
            type="text"
            className="form-control w-50"
            placeholder="Buscar..."
          />
          <div>
            <button className="profile-button" onClick={toggleMenu}>
              {isLoggedIn ? (
                <img src={profilePic} className="img-profile" alt="Foto de perfil" />
              ) : (
                <span className="hamburger-icon">☰</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>×</button>
        <ul className="menu-list">
          <li><Link to="/" onClick={closeAll}>Inicio</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/tattooer/:id" onClick={closeAll}>Perfil</Link></li>
              <li><Link to="/notifications" onClick={closeAll}>Notificaciones</Link></li>
              <li><Link to="/configuracion" onClick={closeAll}>Configuración</Link></li>
              <li className="dropdown-container">
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                  Categorías
                </div>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/category/Neotradicional" onClick={closeAll}>Neotradicional</Link></li>
                    <li><Link to="/category/Geeks" onClick={closeAll}>Geeks</Link></li>
                    <li><Link to="/category/Minimalista" onClick={closeAll}>Minimalista</Link></li>
                    <li><Link to="/category/Black-Out" onClick={closeAll}>Black-out</Link></li>
                    <li><Link to="/category/Realismo" onClick={closeAll}>Realismo</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/about" onClick={closeAll}>Quiénes Somos</Link></li>
              <li><Link to="#" onClick={handleLogout}>Cerrar Sesión</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={closeAll}>Iniciar Sesión</Link></li>
              <li><Link to="/register" onClick={closeAll}>Registrarse</Link></li>
              <li><Link to="/about" onClick={closeAll}>Quiénes Somos</Link></li>
              <li className="dropdown-container">
                <div className="dropdown-toggle" onClick={toggleDropdown}>
                  Categorías
                </div>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/category/Neotradicional" onClick={closeAll}>Neotradicional</Link></li>
                    <li><Link to="/category/Geeks" onClick={closeAll}>Geeks</Link></li>
                    <li><Link to="/category/Minimalista" onClick={closeAll}>Minimalista</Link></li>
                    <li><Link to="/category/Black-Out" onClick={closeAll}>Black-out</Link></li>
                    <li><Link to="/category/Realismo" onClick={closeAll}>Realismo</Link></li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
