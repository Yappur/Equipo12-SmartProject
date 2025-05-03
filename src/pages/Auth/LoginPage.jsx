import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoLinkedin from "@/assets/img/logo-linkedin.png";
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
    <div className="min-h-screen bg-[#00254B] flex items-center justify-center p-4 pt-16">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 shadow-2xl backdrop-blur-md">
        <div className="p-8 md:p-12 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Bienvenido de nuevo a{" "}
            <span className="text-[#008080] drop-shadow">TalentMatch</span>
          </h2>
          <p className="text-gray-300 text-center mb-6">Accede a tu cuenta</p>

          <div className="flex items-center text-gray-400 mb-6">
            <div className="flex-grow h-px bg-white/20" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-300">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-2.5 mt-1 bg-white/10 border border-white/30 rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                placeholder="Ingresa tu correo"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Contraseña</label>
              <input
                type="password"
                name="password"
                className="w-full p-2.5 mt-1 bg-white/10 border border-white/30 rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#008080]" />
                Recuérdame
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008080] hover:bg-[#006666] text-white font-semibold py-2.5 rounded-md text-sm transition shadow"
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
                    Algun dato está incorrecto
                  </h2>
                  <h2 className="text-red-700 font-semibold text-lg mb-1">
                    Intentelo nuevamente o cambie la contraseña
                  </h2>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}
            <div className="flex items-center text-gray-400 mt-2">
              <div className="flex-grow h-px bg-white/20" />
            </div>
            <div>
              <a
                href="*"
                className="text-[#008080] hover:underline flex items-center justify-center"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>

        <div className="hidden md:block bg-[#14599A] w-full h-full">
          {/* Aquí irá el banner */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
