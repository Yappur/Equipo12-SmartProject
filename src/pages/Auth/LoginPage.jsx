import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoLinkedin from "@/assets/img/logo-linkedin.png";
import { useLoginFirebase } from "@/hooks/useLoginFirebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const { login, error, cargando } = useLoginFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await login({ email, password });
    if (resultado) {
      setSuccess("¡Inicio de sesión exitoso!");
      setTimeout(() => {
        navigate("/admin");
      }, 1200); // Delay de 1.2s para que vea el mensaje
    }
  };

  return (
    <div className="min-h-screen bg-[#00254B] flex items-center justify-center p-4 pt-16">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 shadow-2xl backdrop-blur-md">
        <div className="p-8 md:p-12 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Bienvenido de nuevo a{" "}
            <span className="text-[#008080] drop-shadow">Gestion</span>
          </h2>
          <p className="text-gray-300 text-center mb-6">Accede a tu cuenta</p>

          <button className="flex items-center justify-center w-full border border-white/20 rounded-md py-2.5 px-4 text-white bg-[#14599A]/30 hover:bg-[#14599A]/50 transition mb-6">
            <img
              src={logoLinkedin}
              alt="Logo LinkedIn"
              className="w-5 h-5 mr-3"
            />
            Iniciar sesión con LinkedIn
          </button>

          <div className="flex items-center text-gray-400 mb-6">
            <div className="flex-grow h-px bg-white/20" />
            <span className="px-3 text-sm">O</span>
            <div className="flex-grow h-px bg-white/20" />
          </div>

          {/* Formulario funcional */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-300">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full p-2.5 mt-1 bg-white/10 border border-white/30 rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Contraseña</label>
              <input
                type="password"
                className="w-full p-2.5 mt-1 bg-white/10 border border-white/30 rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#008080]" />
                Recuérdame
              </label>
              <a href="#" className="text-[#008080] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008080] hover:bg-[#006666] text-white font-semibold py-2.5 rounded-md text-sm transition shadow"
              disabled={cargando}
            >
              {cargando ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            {/* 🟢 Mensaje de éxito */}
            {success && (
              <p className="text-green-400 text-sm mt-2">{success}</p>
            )}

            {/* 🔴 Mensaje de error */}
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </form>

          <p className="text-gray-300 mt-6 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-[#008080] hover:underline">
              Regístrate
            </a>
          </p>
        </div>

        {/* Imagen decorativa */}
        <div className="hidden md:block bg-[#14599A] w-full h-full">
          {/* Aquí irá el banner */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
