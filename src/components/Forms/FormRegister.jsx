import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
import { uploadProfileImage } from "../../firebase/Upload/uploadProfileImage";
import editarImagenIcon from "../../assets/img/editarImagenIcon.svg";
import { showToast } from "../Modals/CustomToaster";

const FormRegister = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmarPassword: "",
    phoneNumber: "",
    role: "",
    photoURL: "",
  });

  const [cargando, setCargando] = useState(false);
  const [verificandoEmail, setVerificandoEmail] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (errors.serverError) {
      showToast(errors.serverError, "error");
    }
  }, [errors]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!usuario.email || !validarEmail(usuario.email)) {
      return;
    }

    timerRef.current = setTimeout(() => {
      verificarEmailExistente(usuario.email);
    }, 800); // Verificar después de 800ms de inactividad

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [usuario.email]);

  const verificarEmailExistente = async (email) => {
    try {
      setVerificandoEmail(true);
      // Realizar la petición al endpoint para verificar si el email existe
      const response = await axiosConfig.get(
        `/auth/check-email?email=${encodeURIComponent(email)}`
      );

      if (response.data === true) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          errorEmail: "Este correo electrónico ya está registrado",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          errorEmail: false,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          errorEmail: false,
        }));
      } else {
        console.error("Error al verificar email:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          errorEmail: "Error al verificar el email. Inténtalo más tarde.",
        }));
      }
    } finally {
      setVerificandoEmail(false);
    }
  };

  const validarNombre = (displayName) => {
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
    return regex.test(displayName) && displayName.length <= 35;
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && email.length <= 35;
  };

  const validarPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.@#$*])(?=.*[a-z]).{8,20}$/;
    return regex.test(password);
  };

  const validarTelefono = (phoneNumber) => {
    const regex = /^\+[1-9][0-9\s-]{6,14}$/;
    return regex.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const cleanedValue = value.replace(/[^\d+\s-]/g, "");

      const formattedValue = cleanedValue.startsWith("+")
        ? cleanedValue
        : cleanedValue
        ? `+${cleanedValue}`
        : "";

      setUsuario({
        ...usuario,
        [name]: formattedValue,
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
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

      setSubiendoImagen(true);
      const photoUrl = await uploadProfileImage(file);
      setUsuario({
        ...usuario,
        photoUrl,
      });

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

    // Validación nombre
    if (!displayName || displayName.trim() === "") {
      newErrors.errorDisplayName = "Por favor, ingresa tu nombre y apellido";
      isValid = false;
    } else if (displayName.length > 35) {
      newErrors.errorDisplayName =
        "El nombre no debe superar los 35 caracteres";
      isValid = false;
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(displayName)) {
      newErrors.errorDisplayName =
        "El nombre solo debe contener letras y espacios, sin números ni símbolos";
      isValid = false;
    }

    // Validación email
    if (!email) {
      newErrors.errorEmail = "Por favor, ingresa un email";
      isValid = false;
    } else if (email.length > 35) {
      newErrors.errorEmail = "El email no debe superar los 35 caracteres";
      isValid = false;
    } else if (!validarEmail(email)) {
      newErrors.errorEmail = "Por favor, ingresa un email válido";
      isValid = false;
    } else if (
      errors.errorEmail === "Este correo electrónico ya está registrado"
    ) {
      newErrors.errorEmail = "Este correo electrónico ya está registrado";
      isValid = false;
    }

    if (!role || role === "") {
      newErrors.errorRole = "Por favor, selecciona un rol";
      isValid = false;
    }

    if (!password) {
      newErrors.errorPassword = "Por favor, ingresa una contraseña";
      isValid = false;
    } else if (!validarPassword(password)) {
      newErrors.errorPassword =
        "La contraseña debe tener entre 8-20 caracteres, incluir al menos un número, un caracter especial (.@#$*) y una letra mayúscula";
      isValid = false;
    }

    if (!confirmarPassword || password !== confirmarPassword) {
      newErrors.errorConfirmarPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    // Validación teléfono
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
        phoneNumber: usuario.phoneNumber.trim().replace(/\s|-/g, ""),
        photoUrl: usuario.photoUrl || undefined,
      };

      const response = await axiosConfig.post(
        "/auth/register",
        datosProcesados
      );

      showToast("Usuario registrado correctamente", "success");

      resetForm();
      navigate("/admin/panelUsuarios");
    } catch (err) {
      console.error("Error completo:", err);

      let mensajeError = "Error al registrar usuario";

      if (err.response?.data?.mensaje) {
        mensajeError = err.response.data.mensaje;
      } else if (err.response?.status === 400) {
        mensajeError =
          "Error en los datos del formulario. Por favor, revise todos los campos.";
      }

      setErrors({
        serverError: mensajeError,
      });

      showToast(mensajeError, "error");
    } finally {
      setCargando(false);
    }
  };

  const resetForm = () => {
    setUsuario({
      displayName: "",
      email: "",
      password: "",
      confirmarPassword: "",
      phoneNumber: "",
      role: "",
      photoUrl: "",
    });
    setPreviewImage(null);
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
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

          <div
            className="w-38 h-38 bg-gray-300 rounded-full overflow-hidden mb-4 cursor-pointer relative"
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
                src={editarImagenIcon || "/placeholder.svg"}
                alt="Editar imagen"
                className="w-full h-full object-contain"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-200">
              <span className="text-xs opacity-0 hover:opacity-100">
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
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
                  maxLength={35}
                />
                {errors.errorDisplayName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorDisplayName}
                  </p>
                )}
                <p
                  className={`text-xs ${
                    usuario.displayName.length > 30
                      ? "text-orange-500"
                      : "text-gray-500"
                  } mt-1`}
                >
                  {usuario.displayName.length}/35 caracteres
                </p>
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
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
                />
                {errors.errorPhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorPhoneNumber}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Formato: +código de país seguido del número (ej.
                  +5491123456789)
                </p>
              </div>
              <div>
                <label className="block text-sm mb-1">
                  E-mail<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    className={`w-full border ${
                      errors.errorEmail
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    } rounded-md p-2 bg-gray-50 ${
                      verificandoEmail ? "pr-10" : ""
                    }`}
                    maxLength={35}
                  />
                  {verificandoEmail && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                    </div>
                  )}
                </div>
                {errors.errorEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorEmail}
                  </p>
                )}
                <p
                  className={`text-xs ${
                    usuario.email.length > 30
                      ? "text-orange-500"
                      : "text-gray-500"
                  } mt-1`}
                >
                  {usuario.email.length}/35 caracteres
                </p>
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
                    errors.errorRole
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
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
                    errors.errorPassword
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
                  maxLength={20} // Limitando a 20 caracteres máximo
                />
                {errors.errorPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorPassword}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  La contraseña debe tener entre 8-20 caracteres y debe incluir:
                </p>
                <ul className="text-xs text-gray-500 pl-4 list-disc">
                  <li
                    className={
                      usuario.password.length >= 8 &&
                      usuario.password.length <= 20
                        ? "text-green-600"
                        : ""
                    }
                  >
                    Entre 8 y 20 caracteres{" "}
                    {usuario.password &&
                    usuario.password.length >= 8 &&
                    usuario.password.length <= 20
                      ? "✓"
                      : ""}
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(usuario.password) ? "text-green-600" : ""
                    }
                  >
                    Al menos una letra mayúscula{" "}
                    {usuario.password && /[A-Z]/.test(usuario.password)
                      ? "✓"
                      : ""}
                  </li>
                  <li
                    className={
                      /[0-9]/.test(usuario.password) ? "text-green-600" : ""
                    }
                  >
                    Al menos un número{" "}
                    {usuario.password && /[0-9]/.test(usuario.password)
                      ? "✓"
                      : ""}
                  </li>
                  <li
                    className={
                      /[.@#$*]/.test(usuario.password) ? "text-green-600" : ""
                    }
                  >
                    Al menos un caracter especial (.@#$*){" "}
                    {usuario.password && /[.@#$*]/.test(usuario.password)
                      ? "✓"
                      : ""}
                  </li>
                </ul>
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
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  } rounded-md p-2 bg-gray-50`}
                  maxLength={20} // Limitando a 20 caracteres máximo
                />
                {errors.errorConfirmarPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.errorConfirmarPassword}
                  </p>
                )}
                {usuario.confirmarPassword &&
                  usuario.password === usuario.confirmarPassword && (
                    <p className="text-green-600 text-xs mt-1">
                      ¡Las contraseñas coinciden!
                    </p>
                  )}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={cargando || verificandoEmail}
                className="px-5 py-2 rounded-md bg-[#152d53] text-white hover:bg-[#121d27] disabled:opacity-60"
              >
                {cargando ? "Procesando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
