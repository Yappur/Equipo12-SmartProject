import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoLogin from "@/assets/img/WebP/mujer-hero.webp";
import { useLoginFirebase } from "@/hooks/useLoginFirebase";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modals/Modal";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { cambiarTitulo } from "../../hooks/useCambiarTitulo";
import { showToast } from "../../components/Modals/CustomToaster";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, cargando } = useLoginFirebase();
  const { isAuthenticated, role, updateNombre, updateProfileImage } = useAuth();
  const navigate = useNavigate();

  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const formIsEmpty = !emailValue || !passwordValue;

  useEffect(() => {
    cambiarTitulo("Login");
  }, []);

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setErrorModal(true);
    }
  }, [error]);

  const onSubmit = async (data) => {
    const { email, password } = data;

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

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center p-4 ">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-8 md:p-12 text-black flex flex-col justify-center">
              <h1 className="font-bold text-5xl text-center mb-2 drop-shadow tracking-wide">
                <span className="text-[#152d53]">Talent </span>
                <span className="text-[#F88623] italic">Match</span>
              </h1>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="my-6">
                  <h2 className="text-gray-800">Email</h2>
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "El formato del correo es inválido",
                      },
                    })}
                    className={`w-full p-2.5 mt-1 ${
                      errors.email
                        ? "bg-red-50 border-red-500"
                        : "bg-white border-gray-400"
                    } border rounded-xl placeholder-gray-600 py-3 text-sm`}
                    placeholder="Introduce tu mail..."
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message || "Ingresa un correo válido"}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <h2 className="text-gray-800">Contraseña</h2>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: "Ingresa una contraseña valida",
                        },
                      })}
                      className={`w-full p-2.5 ${
                        errors.password
                          ? "bg-red-50 border-red-500"
                          : "bg-white border-gray-400"
                      } border rounded-xl placeholder-gray-600 py-3 text-sm pr-10`}
                      placeholder="Introduce tu contraseña..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
                    >
                      {showPassword ? (
                        <FaRegEye className="text-[#152d53]" />
                      ) : (
                        <FaRegEyeSlash className="text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message ||
                        "La contraseña debe tener al menos 8 carácteres"}
                    </p>
                  )}
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
                    disabled={formIsEmpty || cargando || !isValid}
                    className={`inter text-2xl w-1/2 flex items-center justify-center mx-auto ${
                      formIsEmpty || !isValid
                        ? "bg-[#e8e8e8] text-[#8e8e8e] border border-[#8e8e8e]"
                        : "bg-[#152d53] hover:bg-[#181f31] text-white shadow-sm shadow-blue-950"
                    } font-semilight py-2 rounded-md transition`}
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
