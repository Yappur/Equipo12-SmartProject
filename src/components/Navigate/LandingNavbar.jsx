import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LandingNavbar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#00598A] shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 font-poppins">
      <h1
        className="text-white font-bold text-2xl tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        TalentMatch
      </h1>

      {/* Hamburguesa */}
      <div className="md:hidden z-50">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú desktop */}
      <div className="hidden md:flex items-center gap-3">
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
              onClick={() => navigate("/galeria/vacantes")}
              className="px-5 py-2 rounded-full text-white border border-white hover:bg-white hover:text-[#00598A] transition duration-200"
            >
              Vacantes
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

      {/* Menú móvil */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00598A]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6 text-white text-lg md:hidden animate-fade-in-up z-40">
          {/* Título TalentMatch */}
          <h1
            className="text-white font-bold text-3xl tracking-wide mb-6 cursor-pointer"
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            TalentMatch
          </h1>

          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/perfil");
                setMenuOpen(false);
              }}
              className="px-6 py-3 rounded-full bg-white text-[#00598A] font-semibold hover:bg-gray-100 transition"
            >
              Ir a mi perfil
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/galeria/vacantes")}
                className="px-5 py-2 rounded-full text-white border border-white hover:bg-white hover:text-[#00598A] transition duration-200"
              >
                Vacantes
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="px-4 py-3 rounded-full bg-white text-[#00598A] font-semibold hover:bg-gray-100 transition"
              >
                Iniciar Sesión
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
