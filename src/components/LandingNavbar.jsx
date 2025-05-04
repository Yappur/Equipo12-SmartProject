import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function LandingNavbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-[#00598A] shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <h1
        className="text-white font-bold text-2xl tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        TalentMatch
      </h1>

      {/* Botones condicionales */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <button
            onClick={() => navigate("/perfil")}
            className="px-5 py-2 rounded-full bg-white text-[#00598A] font-semibold hover:bg-gray-100 transition duration-200"
          >
            Ir a mi perfil
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/registro")}
              className="px-5 py-2 rounded-full text-white border border-white hover:bg-white hover:text-[#00598A] transition duration-200"
            >
              Registrarse
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full bg-white text-[#00598A] font-semibold hover:bg-gray-100 transition duration-200"
            >
              Iniciar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
