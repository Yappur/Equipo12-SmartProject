import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLoginFirebase } from "../../hooks/useLoginFirebase";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { User, LogOut } from "lucide-react";

export default function AdminNavbar() {
  const { role, nombre, profileImg } = useAuth();
  const { logout } = useLoginFirebase();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 pl-4 py-6 flex justify-between items-center sticky top-0">
      <h2 className="text-sm sm:text-base text-sky-800 font-semibold md:pl-3 sm:pl-12">
        Panel {role === "admin" ? "Super Administrador" : "de Recursos Humanos"}
      </h2>

      <div
        className="relative flex items-center gap-3 sm:gap-4 mx-10"
        ref={dropdownRef}
      >
        <span className="text-sm text-gray-700 hidden sm:inline">
          ¡Bienvenido/a, {""}
          <span className="font-bold">{nombre || "Usuario"}</span>!
        </span>

        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {profileImg ? (
            <img
              src={profileImg}
              alt="Perfil"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <FaUserCircle className="text-sky-800 text-4xl right-3" />
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-12 flex flex-col gap-2 z-50 w-full max-w-[220px]">
            <Link
              to="/perfil"
              className="flex items-center gap-2 px-4 py-3 bg-[#0a2145] text-white rounded-full hover:bg-[#0a3060] transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Mi perfil</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-3 bg-[#0a2145] text-white rounded-full hover:bg-[#0a3060] transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
