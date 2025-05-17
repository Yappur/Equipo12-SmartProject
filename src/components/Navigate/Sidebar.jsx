import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Home, Briefcase, Users, User, Menu, X } from "lucide-react";
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
        {
          title: "Candidatos",
          icon: Users,
          path: "/reclutador/CandidatosTable",
        },
        { title: "Reclutadores", icon: Users, path: "/admin/panelUsuarios" },
      ];
    } else if (role === "user") {
      return [
        ...baseItems,
        {
          title: "Vacantes",
          icon: Briefcase,
          path: "/reclutador/vacantes",
        },
        {
          title: "Candidatos",
          icon: Users,
          path: "/reclutador/candidatosPorReclutador",
        },
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

  const handleOverlayClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#00254B] text-white p-2 rounded-md shadow"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={handleOverlayClick}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ duration: 0.3, type: "tween" }}
            className="fixed z-45 top-0 left-0 w-64 h-screen bg-[#00254B] text-white shadow-lg p-6 md:hidden overflow-y-auto flex flex-col"
          >
            <div className="mt-11 mb-4 font-semibold text-[48px] tracking-wide">
              <span className="text-white">Talent </span>
              <span className="text-[#F88623] italic">Match</span>
            </div>

            <nav className="flex flex-col flex-1">
              <div className="space-y-2 text-lg font-medium flex-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-md transition mt-auto "
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
                  className="flex items-center gap-3 p-3 rounded-md transition mt-auto "
                >
                  <User className="w-5 h-5" />
                  Mi Perfil
                </NavLink>
              )}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 md:h-screen md:w-64 bg-[#00254B] text-white shadow-lg overflow-y-auto z-50">
        <div className="p-6 flex flex-col h-full">
          <div className="mt-10 mb-4">
            <h1 className="font-semibold text-2xl tracking-wide">
              <Link to="/" className="flex gap-2">
                <span className="text-white font-semibold">Talent</span>
                <span className="text-orange-400 italic font-semibold">
                  Match
                </span>
              </Link>
            </h1>
          </div>

          <nav className="text-lg font-medium flex flex-col flex-1">
            <div className="space-y-4 flex-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className="flex items-center gap-3 p-3 rounded-md transition mt-auto "
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </NavLink>
              ))}
            </div>

            {isAuthenticated && (
              <NavLink
                to="/perfil"
                className="flex items-center gap-3 p-3 rounded-md transition mt-auto "
              >
                <User className="w-5 h-5" />
                Mi Perfil
              </NavLink>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
