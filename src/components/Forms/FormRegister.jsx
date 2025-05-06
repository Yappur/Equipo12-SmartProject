import React, { useState, useEffect } from "react";
import axiosConfig from "../../helpers/axios.config";
import Modal from "../Modal";

const FormRegister = () => {
  const [usuario, setUsuario] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmarPassword: "",
    phoneNumber: "",
    role: "user",
  });

  const [cargando, setCargando] = useState(false);
  const [errors, setErrors] = useState({});

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (errors.serverError) {
      setModalMessage(errors.serverError);
      setErrorModal(true);
    }
  }, [errors]);

  const showSuccessMessage = (message) => {
    setModalMessage(message || "Registro exitoso");
    setSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

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

  const validarTelefono = (phoneNumber) => {
    const regex = /^\+[1-9]\d{6,14}$/;
    return regex.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpieza específica para phoneNumber (solo permitir números y +)
    if (name === "phoneNumber") {
      const cleanedValue = value.replace(/[^\d+]/g, "");
      setUsuario({
        ...usuario,
        [name]: cleanedValue,
      });
    } else {
      setUsuario({
        ...usuario,
        [name]: value,
      });
    }

    if (errors[`error${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors((prev) => ({
        ...prev,
        [`error${name.charAt(0).toUpperCase() + name.slice(1)}`]: false,
      }));
    }
  };

  // Validación del formulario antes de enviar
  const validateForm = () => {
    const {
      displayName,
      email,
      role,
      password,
      confirmarPassword,
      phoneNumber,
    } = usuario;
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

    if (!role || role === "") {
      newErrors.errorRole = "Por favor, selecciona un rol";
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

    if (!phoneNumber) {
      newErrors.errorPhoneNumber = "Por favor, ingresa tu número de teléfono";
      isValid = false;
    } else if (!validarTelefono(phoneNumber)) {
      newErrors.errorPhoneNumber =
        "El número debe comenzar con + seguido del código de país y tener al menos 8 dígitos en total";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setCargando(true);

      const datosProcesados = {
        displayName: usuario.displayName.trim(),
        email: usuario.email.trim(),
        password: usuario.password,
        role: usuario.role,
        phoneNumber: usuario.phoneNumber.trim(),
      };

      const response = await axiosConfig.post(
        "/auth/register",
        datosProcesados
      );

      showSuccessMessage(
        "El usuario se ha registrado correctamente. Dirígete a la pantalla de candidatos para visualizar los detalles del candidato o generar cambios"
      );

      setUsuario({
        displayName: "",
        email: "",
        password: "",
        confirmarPassword: "",
        phoneNumber: "",
        role: "user",
      });
    } catch (err) {
      console.error("Error completo:", err);

      let mensajeError = "Error al registrar usuario";

      if (
        err.response?.data?.mensaje?.includes("teléfono") ||
        err.response?.status === 400
      ) {
        mensajeError =
          "El formato del número de teléfono es incorrecto. Debe incluir el código de país precedido por + y el número sin espacios ni guiones.";
      } else if (err.response?.data?.mensaje) {
        mensajeError = err.response.data.mensaje;
      }

      setErrors({
        serverError: mensajeError,
      });

      setModalMessage(mensajeError);
      setErrorModal(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-white w-full text-gray-700 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-md shadow-md border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        {/* Perfil a la izquierda */}
        <div className="w-full lg:w-1/3 bg-gray-100 flex flex-col items-center justify-center p-10 border-r">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A8.003 8.003 0 0112 16a8.003 8.003 0 016.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold">Nombre</p>
          <p className="text-sm text-gray-500">Rol</p>
        </div>

        {/* Formulario */}
        <div className="w-full lg:w-2/3 p-10">
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">
            Crear nuevo usuario
          </h2>

          {errors.serverError && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {errors.serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">
                  Nombre y Apellido<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={usuario.displayName}
                  onChange={handleChange}
                  placeholder="Escribe aquí"
                  className={`w-full border ${
                    errors.errorDisplayName
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md p-2`}
                />
                {errors.errorDisplayName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorDisplayName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Número de Teléfono<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={usuario.phoneNumber}
                  onChange={handleChange}
                  placeholder="+5491123456789"
                  className={`w-full border ${
                    errors.errorPhoneNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md p-2`}
                />
                <p className="text-gray-500 text-xs mt-1">
                  Debe incluir el símbolo + y el código de país (ej: +54 para
                  Argentina) sin espacios ni guiones
                </p>
                {errors.errorPhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorPhoneNumber}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Rol<span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={usuario.role}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.errorRole ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2`}
                >
                  <option value="">Elige tu rol</option>
                  <option value="user">Reclutador</option>
                  <option value="admin">Super Admin</option>
                </select>
                {errors.errorRole && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorRole}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">
                  E-mail<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                  placeholder="Ingresa tu email"
                  className={`w-full border ${
                    errors.errorEmail ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2`}
                />
                {errors.errorEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorEmail}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Contraseña<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={usuario.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  className={`w-full border ${
                    errors.errorPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2`}
                />
                {errors.errorPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Repetir Contraseña<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmarPassword"
                  value={usuario.confirmarPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className={`w-full border ${
                    errors.errorConfirmarPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md p-2`}
                />
                {errors.errorConfirmarPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorConfirmarPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                className="px-5 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="px-5 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-60"
              >
                {cargando ? "Procesando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={successModal}
        onClose={handleCloseSuccessModal}
        tipo="success"
        titulo="Registro exitoso"
        mensaje={modalMessage}
        btnPrimario="Aceptar"
        accionPrimaria={handleCloseSuccessModal}
      />

      <Modal
        isOpen={errorModal}
        onClose={handleCloseErrorModal}
        tipo="error"
        titulo="Error de registro"
        mensaje={modalMessage}
        btnPrimario="Entendido"
        accionPrimaria={handleCloseErrorModal}
      />
    </div>
  );
};

export default FormRegister;
