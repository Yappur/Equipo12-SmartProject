import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLoginFirebase } from "../../hooks/useLoginFirebase";
import { FaUserCircle } from "react-icons/fa";

export default function AdminNavbar() {
  const { role, nombre } = useAuth();
  const { logout } = useLoginFirebase();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Cerrar dropdown si se hace click afuera
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
    <header className="w-full bg-white shadow-sm border-b pl-4 py-6 flex justify-between items-center sticky top-0">
      <h2 className="text-sm sm:text-base text-sky-800 font-semibold">
        Panel {role === "admin" ? "de Administración" : "de Recursos Humanos"}
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
          <FaUserCircle className="text-sky-800 text-4xl right-3" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-12 bg-red-500 border rounded-4xl shadow-lg py-2 w-37 z-50 hover:bg-red-900 ">
            <button
              onClick={logout}
              className="block w-full text-center px-4 py-2 text-sm text-white "
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
