import logoLinkedin from "@/assets/img/logo-linkedin.png";

function LoginPage() {
  return (
    <div className="min-h-screen bg-[#00254B] flex items-center justify-center p-4">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 shadow-2xl backdrop-blur-md">

        {/* Formulario */}
        <div className="p-8 md:p-12 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Bienvenido de nuevo a{" "}
            <span className="text-[#008080] drop-shadow">???</span>
          </h2>
          <p className="text-gray-300 text-center mb-6">Accede a tu cuenta</p>

          {/* Botón LinkedIn */}
          <button className="flex items-center justify-center w-full border border-white/20 rounded-md py-2.5 px-4 text-white bg-[#14599A]/30 hover:bg-[#14599A]/50 transition mb-6">
            <img src={logoLinkedin} alt="Logo LinkedIn" className="w-5 h-5 mr-3" />
            Iniciar sesión con LinkedIn
          </button>

          {/* Separador */}
          <div className="flex items-center text-gray-400 mb-6">
            <div className="flex-grow h-px bg-white/20" />
            <span className="px-3 text-sm">O</span>
            <div className="flex-grow h-px bg-white/20" />
          </div>

          {/* Formulario */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300">Correo Electrónico</label>
              <input
                type="email"
                className="w-full p-2.5 mt-1 bg-white/10 border border-white/30 rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                placeholder="Ingresa tu correo"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Contraseña</label>
              <input
                type="password"
                className="w-full p-2.5 mt-1 bg-white/10 border border-white/30 rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#008080]" />
                Recuérdame
              </label>
              <a href="#" className="text-[#008080] hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008080] hover:bg-[#006666] text-white font-semibold py-2.5 rounded-md text-sm transition shadow"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="text-gray-300 mt-6 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-[#008080] hover:underline">Regístrate</a>
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
