import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#14599A] text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Sección izquierda: logo + links */}
        <div className="flex items-center space-x-6">
          <NavLink to="/">
            <img className="h-8" src="" alt="Logo" />
          </NavLink>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/admin/panelUsuarios">Usuarios</NavLink>
          <NavLink to="/admin/crearUsuario">crearUsuario</NavLink>
        </div>

        {/* Sección derecha: login */}
        <div>
          <NavLink
            to="/login"
            className="border border-white px-4 py-2 rounded hover:bg-[#072a4b] transition"
          >
            Iniciar sesión
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
