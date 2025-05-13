import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Briefcase, Users, User, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { isAuthenticated, role } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getHomeRoute = () => {
    switch (role) {
      case "admin":
        return "/admin";
      case "user":
        return "/reclutador";
      default:
        return "/";
    }
  };

  const getMenuItems = () => {
    const baseItems = [{ title: "Inicio", icon: Home, path: getHomeRoute() }];

    if (role === "admin") {
      return [
        ...baseItems,
        { title: "Vacantes", icon: Briefcase, path: "admin/panelVacantes" },
        { title: "Candidatos", icon: Users, path: "/reclutador/candidatos" },
        { title: "Reclutadores", icon: Users, path: "/admin/panelUsuarios" },
      ];
    } else if (role === "user") {
      return [
        ...baseItems,
        {
          title: "Mis Vacantes",
          icon: Briefcase,
          path: "/reclutador/vacantes",
        },
        { title: "Candidatos", icon: Users, path: "/reclutador/CandidatosTable" },
      ];
    } else {
      return baseItems;
    }
  };

  const menuItems = getMenuItems();

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4  z-40 bg-[#00254B] text-white p-2 rounded-md shadow"
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
            className="fixed z-30 top-0 left-0 w-64 h-screen bg-[#00254B] text-white shadow-lg p-6 md:hidden"
          >
            <div className="mt-11 mb-4 font-semibold text-2xl tracking-wide">
              <span className="text-white">Talent </span>
              <span className="text-orange-400 italic">Match</span>
            </div>

            <nav className="space-y-2 text-lg font-medium flex flex-col h-[calc(100%-8rem)]">
              <div className="flex-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-md transition"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </NavLink>
                ))}
              </div>

              {isAuthenticated && (
                <NavLink
                  to="/perfil"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-md transition"
                >
                  <User className="w-5 h-5" />
                  Mi Perfil
                </NavLink>
              )}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden md:fixed md:flex flex-col w-64 bg-[#00254B] text-white shadow-lg p-6 h-screen top-0 left-0 z-30">
        <div className="my-11">
          <h1 className="font-semibold text-2xl tracking-wide">
            {" "}
            <span className="text-white">Talent </span>
            <span className="text-orange-400 italic">Match</span>
          </h1>
        </div>

        <nav className="space-y-3 text-lg font-medium flex flex-col h-[calc(100%-8rem)]">
          <div className="flex-1 space-y-5">
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-md transition"
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </NavLink>
            ))}
          </div>

          {isAuthenticated && (
            <NavLink
              to="/perfil"
              className="flex items-center gap-3 p-3 rounded-md transition"
            >
              <User className="w-5 h-5" />
              Mi Perfil
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
