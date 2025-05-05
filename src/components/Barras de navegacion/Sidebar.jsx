import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Briefcase, Users, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { title: "Inicio", icon: Home, path: "/" },
    { title: "Vacantes", icon: Briefcase, path: "/galeria/vacantes" },
    { title: "Candidatos", icon: Users, path: "/candidatos" },
    { title: "Perfil", icon: User, path: "/perfil" },
  ];

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#00254B] text-white p-2 rounded-md shadow"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar animado en móviles */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
            className="fixed z-40 top-0 left-0 w-64 h-screen bg-[#00254B] text-white shadow-lg p-6 md:hidden"
          >
            <div className="mb-8">
              <h2 className="text-xl font-bold">Talent Match</h2>
            </div>

            <nav className="space-y-2 text-lg font-medium">
              {menuItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-md transition ${
                      isActive
                        ? "bg-[#008080] text-white"
                        : "hover:bg-[#008080]/70"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </NavLink>
              ))}
            </nav>

            {isAuthenticated && (
              <button
                onClick={logout}
                className="mt-auto flex items-center gap-2 text-sm text-white border border-white px-4 py-2 rounded hover:bg-red-500/80 transition"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar fijo en pantallas grandes */}
      <aside className="hidden md:fixed md:flex flex-col w-64 bg-[#00254B] text-white shadow-lg p-6 h-screen top-0 left-0 z-30">
      <div className="mb-8">
          <h2 className="text-xl font-bold">Talent Match</h2>
        </div>

        <nav className="space-y-2 text-lg font-medium">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition ${
                  isActive ? "bg-[#008080] text-white" : "hover:bg-[#008080]/70"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </NavLink>
          ))}
        </nav>

        {isAuthenticated && (
          <button
            onClick={logout}
            className="mt-auto flex items-center gap-2 text-sm text-white border border-white px-4 py-2 rounded hover:bg-red-500/80 transition"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
