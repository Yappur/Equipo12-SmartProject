import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const { isAuthenticated, role } = useAuth();

  return (
    <nav className="bg-[#14599A] text-white h-16 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto h-full flex justify-between items-center px-4 sm:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <h1 className="text-white font-bold">Gestión de ofertas</h1>
        </NavLink>

        {/* Enlaces desktop */}
        <div className="hidden sm:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold underline"
                : "hover:text-gray-200 transition"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/galeria/vacantes"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold underline"
                : "hover:text-gray-200 transition"
            }
          >
            Vacantes
          </NavLink>
          {isAuthenticated && (
            <>
              {/* Opciones específicas para admins */}
              {role === "admin" && (
                <>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white font-semibold underline"
                        : "hover:text-gray-200 transition"
                    }
                  >
                    Vista Admin
                  </NavLink>
                </>
              )}

              {(role === "admin" || role === "user") && (
                <NavLink
                  to="/crear/vacante"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold underline"
                      : "hover:text-gray-200 transition"
                  }
                >
                  Crear Vacante
                </NavLink>
              )}
            </>
          )}

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#14599A] transition font-medium"
            >
              Cerrar sesión
            </button>
          ) : (
            <NavLink
              to="/login"
              className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#14599A] transition font-medium"
            >
              Iniciar sesión
            </NavLink>
          )}
        </div>

        {/* Botón hamburguesa móvil */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="sm:hidden bg-[#14599A] px-4 pb-4 space-y-2">
          <NavLink to="/" className="block" onClick={() => setMenuOpen(false)}>
            Inicio
          </NavLink>
          <NavLink
            to="/galeria/vacantes"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            Vacantes
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/admin"
              className="block"
              onClick={() => setMenuOpen(false)}
            >
              Vista Admin
            </NavLink>
          )}

          {isAuthenticated && (
            <>
              {/* Opciones de admin en móvil */}
              {role === "admin" && (
                <>
                  <NavLink
                    to="/admin"
                    className="block"
                    onClick={() => setMenuOpen(false)}
                  >
                    Vista Admin
                  </NavLink>
                </>
              )}

              {(role === "admin" || role === "user") && (
                <NavLink
                  to="/crear/vacante"
                  className="block"
                  onClick={() => setMenuOpen(false)}
                >
                  Crear Vacante
                </NavLink>
              )}
            </>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="block border border-white px-4 py-2 rounded hover:bg-white hover:text-[#14599A] transition font-medium"
            >
              Cerrar sesión
            </button>
          ) : (
            <NavLink
              to="/login"
              className="block border border-white px-4 py-2 rounded hover:bg-white hover:text-[#14599A] transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar sesión
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
