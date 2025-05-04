import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoLogin from "@/assets/img/imgfigma.png";
import { useLoginFirebase } from "@/hooks/useLoginFirebase";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [success, setSuccess] = useState(null);
  const { login, error, cargando } = useLoginFirebase();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const resultado = await login({ email, password });
    if (resultado) {
      setSuccess("¡Inicio de sesión exitoso!");
    }
  };

  return (
    <div className="poppins min-h-screen bg-white flex items-center justify-center p-4 ">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-8 md:p-12 text-black flex flex-col justify-center">
            <h1 className="text-5xl text-center mb-2 drop-shadow">
              Talent Match
            </h1>

            <div className="flex items-center text-gray-400 mb-6">
              <div className="flex-grow h-px bg-white/20" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2.5 mt-1 bg-gray-200 border border-white/30 rounded-md placeholder-gray-600 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                  placeholder="Ingresa tu correo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2.5 mt-1 bg-gray-200 border border-white/30 rounded-md placeholder-gray-600 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-[#152d53]" />
                  Recuérdame
                </label>
              </div>

              <button
                type="submit"
                className="inter text-xl w-1/2 flex items-center justify-center mx-auto bg-[#152d53] hover:bg-[#181f31] text-white font-semibold py-2.5 rounded-md transition shadow"
                disabled={cargando}
              >
                {cargando ? "Iniciando..." : "Iniciar Sesión"}
              </button>

              {success && (
                <p className="text-green-400 text-sm mt-2">{success}</p>
              )}

              {error && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-lg w-[90vw] max-w-md animate-fade-in backdrop-blur-sm">
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <div className="absolute inset-0 rounded-full bg-red-100 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-white text-2xl">✖</span>
                        </div>
                      </div>
                    </div>
                    <h2 className="text-red-700 font-semibold text-lg mb-1">
                      Algún dato está incorrecto
                    </h2>
                    <h2 className="text-red-700 font-semibold text-lg mb-1">
                      Inténtelo nuevamente o cambie la contraseña
                    </h2>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}
              <div>
                <a
                  href="*"
                  className="hover:underline flex items-center justify-center"
                >
                  ¿Has olvidado tu contraseña?
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden md:block rounded-xl overflow-hidden shadow-2xl h-120">
          <img
            src={logoLogin || "/placeholder.svg"}
            alt="Talent Match"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
