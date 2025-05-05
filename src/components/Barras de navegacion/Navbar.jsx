import { useAuth } from "@/context/AuthContext";
import { useLoginFirebase } from "../../hooks/useLoginFirebase";
import { FaUserCircle } from "react-icons/fa";

export default function AdminNavbar() {
  const { role } = useAuth();
  const { logout } = useLoginFirebase();
  const { nombre } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      {/* Título del panel */}
      <h2 className="text-sm sm:text-base text-sky-800 font-semibold">
        Panel Reclutador
      </h2>

      {/* Saludo + ícono */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700 hidden sm:inline">
          ¡Bienvenida, {nombre || "Usuario"}!
        </span>
        <FaUserCircle className="text-sky-800 text-2xl" />

        <button
          onClick={logout}
          className="hidden sm:block px-4 py-1 text-sm text-white bg-red-600 rounded-full hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
