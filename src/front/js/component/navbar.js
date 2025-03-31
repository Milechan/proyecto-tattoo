import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center w-100">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">LOGO TATTOO MATCH</span>
        </Link>
        <input type="text" className="form-control w-50" placeholder="Buscar..." aria-label="Buscar" />
        <div>
          <Link to="/demo">
            <button className="btn btn-primary img-profile">foto perfil</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
