import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLoginFirebase } from "../../hooks/useLoginFirebase";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { User, LogOut } from "lucide-react";

export default function AdminNavbar() {
  const { role, nombre, profileImg, loading } = useAuth();
  const { logout } = useLoginFirebase();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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

  // Efecto para resetear los estados de imagen cuando cambia profileImg
  useEffect(() => {
    if (profileImg) {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [profileImg]);

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const isValidImageUrl =
    profileImg && typeof profileImg === "string" && profileImg.trim() !== "";

  if (loading) {
    return (
      <header className="w-full bg-white shadow-sm border-b border-gray-200 px-4 py-6 flex justify-between items-center sticky top-0 z-20">
        <h2 className="text-sm sm:text-base text-sky-800 font-semibold">
          Cargando...
        </h2>
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 px-4 py-6 flex justify-between items-center sticky top-0 z-20">
      <h2 className="text-sm sm:text-base text-sky-800 font-semibold">
        Panel {role === "admin" ? "Super Administrador" : "de Recursos Humanos"}
      </h2>

      <div className="flex items-center gap-3 sm:gap-4" ref={dropdownRef}>
        <span className="text-sm text-gray-700 hidden sm:inline">
          ¡Bienvenido/a, {""}
          <span className="font-bold">{nombre || "Usuario"}</span>!
        </span>

        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative flex items-center justify-center flex-shrink-0"
          aria-label="Menú de usuario"
        >
          {isValidImageUrl && !imageError ? (
            <>
              <img
                src={profileImg}
                alt="Perfil"
                className="h-10 w-10 rounded-full object-cover border border-gray-200"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-full">
                  <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </>
          ) : (
            <FaUserCircle className="text-sky-800 text-4xl" />
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-4 top-20 flex flex-col gap-2 z-50 w-full max-w-[220px]">
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
