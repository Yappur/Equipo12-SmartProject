import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Briefcase, Users, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


const Sidebar = () => {
  const { isAuthenticated, logout } = useAuth();

  const menuItems = [
    { title: "Inicio", icon: Home, path: "/" },
    { title: "Vacantes", icon: Briefcase, path: "/galeria/vacantes" },
    { title: "Candidatos", icon: Users, path: "/candidatos" },
    { title: "Perfil", icon: User, path: "/perfil" },
  ];

  return (
<div className="w-64 bg-[#00254B] text-white shadow-lg flex flex-col p-6 h-full min-h-screen">

      {/* Logo o título */}
      <div className="mb-8">
        <h2 className="text-xl font-bold">Talent Match</h2>
      </div>

      {/* Links del menú */}
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

      {/* Acciones abajo */}
      {isAuthenticated && (
        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 text-sm text-white border border-white px-4 py-2 rounded hover:bg-red-500/80 transition"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      )}
    </div>
  );
};

export default Sidebar;
