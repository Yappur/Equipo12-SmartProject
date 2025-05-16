import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoLogin from "@/assets/img/mujer-hero.png";
import { useLoginFirebase } from "@/hooks/useLoginFirebase";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modals/Modal";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { cambiarTitulo } from "../../hooks/cambiarTitulo";
import { showToast } from "../../components/Modals/CustomToaster";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, cargando } = useLoginFirebase();
  const { isAuthenticated, role, updateNombre, updateProfileImage } = useAuth();
  const navigate = useNavigate();

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Estados para manejar errores de validación
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    cambiarTitulo("Login");
  }, []);

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setErrorModal(true);
    }
  }, [error]);

  // Comprueba simplemente si los campos están vacíos
  const isEmpty = (value) => {
    return value.trim() === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Comprobar si los campos están vacíos
    if (isEmpty(email)) {
      setEmailError("Tienes que poner un correo válido");
    } else {
      setEmailError("");
    }

    if (isEmpty(password)) {
      setPasswordError("Tienes que poner una contraseña válida");
    } else {
      setPasswordError("");
    }

    // Si algún campo está vacío, mostrar el modal y cancelar la acción
    if (isEmpty(email) || isEmpty(password)) {
      setModalMessage("Por favor, completa todos los campos correctamente.");
      setErrorModal(true);
      return; // Cancelar la acción
    }

    const resultado = await login({ email, password, rememberMe });
    if (resultado) {
      const { role, name, photoURL } = resultado;

      if (name) {
        updateNombre(name);
      }

      if (photoURL) {
        updateProfileImage(photoURL);
      }

      showToast("Inicio de sesión exitoso", "success");

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/reclutador");
        } else {
          navigate("/");
        }
      }, 500);
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center p-4 ">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-8 md:p-12 text-black flex flex-col justify-center">
              <h1 className="font-bold text-5xl  text-center mb-2 drop-shadow tracking-wide">
                <span className="text-[#152d53]">Talent </span>
                <span className="text-[#F88623] italic">Match</span>
              </h1>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="my-6">
                  <h2 className=" text-gray-800">Email</h2>
                  <input
                    type="email"
                    name="email"
                    className={`w-full p-2.5 mt-1 ${
                      emailError
                        ? "bg-red-50 border-red-300"
                        : "bg-white border-gray-400"
                    } border border-gray-300 rounded-xl placeholder-gray-600 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none`}
                    placeholder="Introduce tu mail..."
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>

                <div className="relative">
                  <h2 className=" text-gray-800">Contraseña</h2>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`w-full p-2.5 ${
                      passwordError
                        ? "bg-red-50 border-red-300"
                        : "bg-white border-gray-400"
                    } border border-gray-300 rounded-xl placeholder-gray-600 py-3 text-sm focus:ring-2 focus:ring-black focus:outline-none pr-10`}
                    placeholder="Introduce tu contraseña..."
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-3xl mt-3.5"
                  >
                    {showPassword ? (
                      <FaRegEye className="text-[#152d53]" />
                    ) : (
                      <FaRegEyeSlash className="text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 accent-[#152d53]"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    Recuérdame
                  </label>
                </div>

                <div className="mt-7 block">
                  <button
                    type="submit"
                    disabled={cargando}
                    className="inter text-2xl w-1/2 flex items-center justify-center mx-auto bg-[#152d53] hover:bg-[#181f31] text-white font-semilight py-2 rounded-md transition shadow-sm shadow-blue-950"
                  >
                    {cargando ? "Iniciando..." : "Iniciar sesión"}
                  </button>
                </div>

                <div className="mt-6">
                  <Link
                    to="/recuperar/cuenta"
                    className="hover:underline text-lg flex font-medium items-center justify-center"
                  >
                    ¿Haz olvidado tu contraseña?
                  </Link>
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

        <Modal
          isOpen={errorModal}
          onClose={handleCloseErrorModal}
          tipo="error"
          titulo="¡Error!"
          mensaje={modalMessage}
          btnPrimario="Volver"
          accionPrimaria={handleCloseErrorModal}
        />
      </div>
    </>
  );
};

export default LoginPage;
