import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LandingNavbar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md max-w-full px-4 py-4 flex items-center justify-around sticky top-0 z-50 font-poppins  ">
        <h1
          className=" font-bold text-2xl tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-gray-800">Talent </span>
          <span className="text-orange-500 italic">Match</span>
        </h1>

        {/* Hamburguesa */}
        <div className="md:hidden z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black">
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
              <Link
                to={"/About"}
                className="text-sm text-gray-800 border border-gray-800 rounded-full px-10 py-1.5 hover:bg-gray-300"
              >
                Quiénes somos
              </Link>
              <Link
                to="/galeria/vacantes"
                className="text-sm text-white bg-orange-500 rounded-full px-10 py-1.5 hover:bg-orange-600"
              >
                Ver vacantes
              </Link>
              <Link
                to="/login"
                className="text-sm text-white bg-blue-900 rounded-full px-10 py-1.5 hover:bg-blue-950"
              >
                Acceso reclutadores
              </Link>
            </>
          )}
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-300/50 backdrop-blur-sm flex flex-col items-center justify-center gap-6 text-white text-lg md:hidden animate-fade-in-up z-40">
            <h1
              className="text-white font-bold text-3xl tracking-wide mb-6 cursor-pointer"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              <span className="text-gray-800">Talent </span>
              <span className="text-orange-500 italic">Match</span>
            </h1>

            <>
              <Link
                to={"/about"}
                className="text-sm text-gray-800 rounded-full px-10 py-1.5 hover:bg-gray-300 bg-white"
              >
                Quiénes somos
              </Link>
              <Link
                to="/galeria/vacantes"
                className="text-sm text-white bg-orange-500 rounded-full px-10 py-1.5 hover:bg-orange-600"
              >
                Ver vacantes
              </Link>
              <Link
                to="/login"
                className="text-sm text-white bg-blue-900 rounded-full px-10 py-1.5 hover:bg-blue-950"
              >
                Acceso reclutadores
              </Link>
            </>
          </div>
        )}
      </nav>
    </>
  );
};

export default LandingNavbar;
