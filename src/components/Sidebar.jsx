import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Briefcase, Users, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {/* Botón para abrir menú */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 left-5 z-50 p-2 bg-[#14599A] text-white rounded-full hover:bg-[#008080] transition"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Animado */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-[#00254B] text-white shadow-lg z-50 flex flex-col p-6"
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end mb-6 p-2 bg-[#008080] rounded-full hover:bg-[#14599A] transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Links del menú */}
            <nav className="space-y-4 text-lg font-medium">
              <NavLink
                to="/"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-[#008080]/70 transition"
              >
                <Home className="w-5 h-5" />
                Inicio
              </NavLink>
              <NavLink
                to="/vacantes"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-[#008080]/70 transition"
              >
                <Briefcase className="w-5 h-5" />
                Vacantes
              </NavLink>
              <NavLink
                to="/candidatos"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-[#008080]/70 transition"
              >
                <Users className="w-5 h-5" />
                Candidatos
              </NavLink>
              <NavLink
                to="/perfil"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-[#008080]/70 transition"
              >
                <User className="w-5 h-5" />
                Perfil
              </NavLink>
            </nav>

            {/* Acciones abajo */}
            {isAuthenticated && (
              <button
                onClick={logout}
                className="mt-auto text-sm text-white border border-white px-4 py-2 rounded hover:bg-red-500/80 transition"
              >
                Cerrar sesión
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
