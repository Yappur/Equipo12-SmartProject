import React, { useState } from "react";
import axiosConfig from "../../helpers/axios.config";

const FormRegister = () => {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (usuario.password !== usuario.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setCargando(true);
      setError("");

      // Realizar la petición POST con axios
      const response = await axiosConfig.post("/auth/register", {
        email: usuario.email,
        password: usuario.password,
      });
      setMensaje("Usuario registrado correctamente");
      // Limpiar el formulario después de un registro exitoso
      setUsuario({
        email: "",
        password: "",
        confirmarPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al registrar usuario");
      console.error("Error:", err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#00254B] text-white flex items-center justify-center p-4">
      {/* Eliminado el grid-cols-2 que estaba causando el espacio vacío */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden w-full max-w-md shadow-2xl backdrop-blur-md">
        <div className="p-8 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Crea un Usuario en{" "}
            <span className="text-[#008080] drop-shadow">???</span>
          </h2>
          <p className="text-gray-300 text-center mb-6">
            ¡Solicita acceso a un Reclutador!
          </p>

          <div className="flex items-center text-gray-400 mb-6">
            <div className="flex-grow h-px bg-white/20" />
          </div>

          {/* Mostramos mensajes de éxito o error */}
          {mensaje && (
            <div className="bg-green-500/20 text-green-300 p-3 rounded-md mb-4 text-center">
              {mensaje}
            </div>
          )}
          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          {/* Formulario conectado al estado y handlers */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-300">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
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
                value={usuario.password}
                onChange={handleChange}
                className="w-full p-2.5 mt-1 bg-white/10 border border-white/30 rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmarPassword"
                value={usuario.confirmarPassword}
                onChange={handleChange}
                className="w-full p-2.5 mt-1 bg-white/10 border border-white/30 rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                placeholder="Confirma tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#008080] hover:bg-[#006666] text-white font-semibold py-2.5 rounded-md text-sm transition shadow"
            >
              {cargando ? "Procesando..." : "Registrar Usuario"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
