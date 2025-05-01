import React, { useState } from "react";
import axiosConfig from "../../helpers/axios.config";

const FormRegister = () => {
  const [usuario, setUsuario] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmarPassword: "",
    role: "user",
  });

  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errors, setErrors] = useState({});

  // Función para validar el formato del correo electrónico
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Función para validar la seguridad de la contraseña
  const validarPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });

    if (errors[`error${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors((prev) => ({
        ...prev,
        [`error${name.charAt(0).toUpperCase() + name.slice(1)}`]: false,
      }));
    }
  };

  // Validación del formulario antes de enviar
  const validateForm = () => {
    const { displayName, email, password, confirmarPassword } = usuario;
    const newErrors = {};
    let isValid = true;

    const validarNombre = (nombre) => {
      const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
      return regex.test(nombre.trim());
    };
    

    if (!displayName || displayName.trim() === "") {
      newErrors.errorDisplayName = "Por favor, ingresa tu nombre y apellido";
      isValid = false;
    } else if (!validarNombre(displayName)) {
      newErrors.errorDisplayName =
        "El nombre solo debe contener letras y espacios, sin números ni símbolos";
      isValid = false;
    }
    




    if (!email || !validarEmail(email)) {
      newErrors.errorEmail = "Por favor, ingresa un email válido";
      isValid = false;
    }

    if (!password || !validarPassword(password)) {
      newErrors.errorPassword =
        "La contraseña debe tener al menos 8 caracteres, una letra y un número";
      isValid = false;
    }

    if (!confirmarPassword || password !== confirmarPassword) {
      newErrors.errorConfirmarPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      setCargando(true);

      const response = await axiosConfig.post("/auth/register", {
        displayName: usuario.displayName,
        email: usuario.email,
        password: usuario.password,
        role: usuario.role,
      });

      console.log("Datos enviados:", usuario);

      setMensaje("Dirigete a la pantalla de candidatos para vizualizar los detalles del candidato o general cambios");
      setUsuario({
        displayName: "",
        email: "",
        password: "",
        confirmarPassword: "",
      });
      setTimeout(() => {
        setMensaje("");  // Limpiar el mensaje de éxito
      }, 5000);
    } catch (err) {
      setErrors({
        serverError:
          err.response?.data?.mensaje || "Error al registrar usuario",
      });
      console.error("Error:", err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#00254B] text-white flex items-center justify-center p-4">
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

          {/* Mostramos el mensaje de éxito */}
{mensaje && (
  <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-lg w-[90vw] max-w-md animate-fade-in backdrop-blur-sm">
      <div className="w-16 h-16 mx-auto mb-4 relative">
        <div className="absolute inset-0 rounded-full bg-green-100 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-2xl">✔</span> {/* Icono de check */}
          </div>
        </div>
      </div>
      <h2 className="text-green-700 font-semibold text-lg mb-1">¡El candidadato se ha registrado correctamente!</h2>
      <p className="text-green-600 text-sm">{mensaje}</p>
    </div>
  </div>
)}

          {/* Mostramos error general del servidor */}
          {errors.serverError && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4 text-center">
              {errors.serverError}
            </div>
          )}

          {/* Formulario conectado al estado y handlers */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="flex text-sm text-gray-300 items-center">
                Nombre/s y Apellido/s
              </label>
              <input
                type="text"
                name="displayName"
                value={usuario.displayName}
                onChange={handleChange}
                className={`w-full p-2.5 mt-1 bg-white/10 border rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none ${
                  errors.errorDisplayName ? "border-red-500" : "border-white/30"
                }`}
                placeholder="Ingresa Nombre y Apellido"
              />
              {errors.errorDisplayName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.errorDisplayName}
                </p>
              )}
            </div>
            <div>
              <label className="flex text-sm text-gray-300 items-center">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                className={`w-full p-2.5 mt-1 bg-white/10 border rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none ${
                  errors.errorEmail ? "border-red-500" : "border-white/30"
                }`}
                placeholder="Ingresa tu correo"
              />
              {errors.errorEmail && (
                <p className="text-red-400 text-xs mt-1">{errors.errorEmail}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="flex text-sm text-gray-300 items-center">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={usuario.password}
                onChange={handleChange}
                className={`w-full p-2.5 mt-1 bg-white/10 border rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none ${
                  errors.errorPassword ? "border-red-500" : "border-white/30"
                }`}
                placeholder="Contraseña (mínimo 8 caracteres, incluir letra y número)"
              />
              {errors.errorPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.errorPassword}
                </p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="flex text-sm text-gray-300 items-center">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmarPassword"
                value={usuario.confirmarPassword}
                onChange={handleChange}
                className={`w-full p-2.5 mt-1 bg-white/10 border rounded-md placeholder-gray-400 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none ${
                  errors.errorConfirmarPassword
                    ? "border-red-500"
                    : "border-white/30"
                }`}
                placeholder="Confirma tu contraseña"
              />
              {errors.errorConfirmarPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.errorConfirmarPassword}
                </p>
              )}
            </div>

            <div>
              <label className="flex text-sm text-gray-300 items-center">
                Rol
              </label>
              <select
                name="role"
                value={usuario.role}
                onChange={handleChange}
                className="w-full p-2.5 mt-1 bg-white border rounded-md text-black text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none border-white/30"
              >
                <option value="user">Reclutador</option>
                <option value="admin">Super Admin</option>
              </select>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#008080] hover:bg-[#006666] text-white font-semibold py-2.5 rounded-md text-sm transition shadow disabled:opacity-70 disabled:cursor-not-allowed"
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
