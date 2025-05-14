import { useState, useEffect, useRef } from "react";
import axiosConfig from "../../helpers/axios.config";
import Modal from "../Modals/Modal";
import { uploadProfileImage } from "../../firebase/Upload/uploadProfileImage";
import editarImagenIcon from "../../assets/img/editarImagenIcon.svg";

const FormRegister = () => {
  const [usuario, setUsuario] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmarPassword: "",
    phoneNumber: "",
    role: "",
  });

  const [cargando, setCargando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fileInputRef = useRef(null);

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

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  // Comentar función de validación de teléfono
  const validarTelefono = (phoneNumber) => {
    // const regex = /^\+[1-9]\d{6,14}$/;
    // return regex.test(phoneNumber);
    return true; // Siempre devuelve true para evitar validación
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpieza específica para phoneNumber (ahora permitimos cualquier formato)
    if (name === "phoneNumber") {
      // const cleanedValue = value.replace(/[^\d+]/g, "");
      const cleanedValue = value; // Mantener el valor como se ingresa
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

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Manejador para cuando se selecciona un archivo
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        setErrors({
          ...errors,
          errorPhotoUrl: "El archivo debe ser una imagen",
        });
        return;
      }

      // Crear una URL para previsualizar la imagen
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      // Subir la imagen a Firebase
      setSubiendoImagen(true);
      const photoUrl = await uploadProfileImage(file);

      // Actualizar el estado con la URL de la imagen
      setUsuario({
        ...usuario,
        photoUrl,
      });

      // Limpiar cualquier error previo
      if (errors.errorPhotoUrl) {
        setErrors({
          ...errors,
          errorPhotoUrl: false,
        });
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setErrors({
        ...errors,
        errorPhotoUrl: "Error al subir la imagen. Inténtalo de nuevo.",
      });
    } finally {
      setSubiendoImagen(false);
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
    } 
    // Comentar la validación específica del formato
    /* else if (!validarTelefono(phoneNumber)) {
      newErrors.errorPhoneNumber =
        "El número debe comenzar con + seguido del código de país y tener al menos 8 dígitos en total";
      isValid = false;
    } */

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
        photoUrl: usuario.photoUrl || undefined,
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
        role: "",
        photoUrl: "",
      });
    } catch (err) {
      console.error("Error completo:", err);

      let mensajeError = "Error al registrar usuario";

      // Comentar validación específica de teléfono en el error
      /* if (
        err.response?.data?.mensaje?.includes("teléfono") ||
        err.response?.status === 400
      ) {
        mensajeError =
          "El formato del número de teléfono es incorrecto. Debe incluir el código de país precedido por + y el número sin espacios ni guiones.";
      } else */ 
      if (err.response?.data?.mensaje) {
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

  const getRoleText = () => {
    if (!usuario.role) return "";
    return usuario.role === "admin" ? "Super Admin" : "Reclutador";
  };

  return (
    <div className="bg-white w-full text-gray-700 flex p-8 mt-8">
      <div className="w-full max-w-6xl bg-white flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/3 flex flex-col items-center ">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          {/* Imagen de perfil clickeable */}
          <div
            className="w-38 h-38  bg-gray-300 rounded-full overflow-hidden mb-4 cursor-pointer relative"
            onClick={handleImageClick}
          >
            {subiendoImagen && (
              <div className="absolute inset-0 flex items-center justify-center text-black">
                <span className="text-xs">Subiendo...</span>
              </div>
            )}
            {previewImage ? (
              <img
                src={previewImage || "../../assets/img/editarImagenIcon.svg"}
                alt="Vista previa"
                className="w-38 h-38 object-cover"
              />
            ) : (
              <img
                src={editarImagenIcon}
                alt="Editar imagen"
                className="w-full h-full object-contain"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-200">
              <span className=" text-xs opacity-0 hover:opacity-100">
                Cambiar foto
              </span>
            </div>
          </div>
          {errors.errorPhotoUrl && (
            <p className="text-red-500 text-xs mt-1 mb-2">
              {errors.errorPhotoUrl}
            </p>
          )}
          <h3 className="text-base font-medium text-center">
            {usuario.displayName || "Nombre y Apellido"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{getRoleText() || "Rol"}</p>
        </div>

        {/* Formulario */}
        <div className="w-full lg:w-2/3 p-8 ">
          <h2 className="text-2xl font-medium mb-6 pb-2">
            <span className="border-b-4 border-amber-500">
              Crear nuevo usuario
            </span>
          </h2>

          {errors.serverError && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {errors.serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                      : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
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
                      : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
                />
                {errors.errorPhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorPhoneNumber}
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
                  placeholder="ejemplo@correo.com"
                  className={`w-full border ${
                    errors.errorEmail ? "border-red-500" : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
                />
                {errors.errorEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorEmail}
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
                    errors.errorRole ? "border-red-500" : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
                >
                  <option value="">Seleccionar rol</option>
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
                  Contraseña<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={usuario.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  className={`w-full border ${
                    errors.errorPassword ? "border-red-500" : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
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
                      : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
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
                className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-60"
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
