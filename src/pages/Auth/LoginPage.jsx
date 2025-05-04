import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoLogin from "@/assets/img/imgfigma.png";
import { useLoginFirebase } from "@/hooks/useLoginFirebase";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modal";

const LoginPage = () => {
  const { login, error, cargando } = useLoginFirebase();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setErrorModal(true);
    }
  }, [error]);

  const showSuccessMessage = (message) => {
    setModalMessage(message || "Inicio de sesión exitoso");
    setSuccessModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const resultado = await login({ email, password });
    if (resultado) {
      showSuccessMessage(resultado);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    if (isAuthenticated) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/reclutador");
      } else {
        navigate("/");
      }
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  return (
    <div className="poppins min-h-screen bg-white flex items-center justify-center p-4 ">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-8 md:p-12 text-black flex flex-col justify-center">
            <h1 className="text-5xl text-center mb-2 drop-shadow">
              Talent Match
            </h1>

            <div className="flex items-center text-gray-400 mb-6">
              <div className="flex-grow h-px bg-white/20" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2.5 mt-1 bg-gray-200 border border-white/30 rounded-md placeholder-gray-600 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                  placeholder="Ingresa tu correo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2.5 mt-1 bg-gray-200 border border-white/30 rounded-md placeholder-gray-600 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-[#152d53]" />
                  Recuérdame
                </label>
              </div>

              <button
                type="submit"
                className="inter text-xl w-1/2 flex items-center justify-center mx-auto bg-[#152d53] hover:bg-[#181f31] text-white font-semibold py-2.5 rounded-md transition shadow"
                disabled={cargando}
              >
                {cargando ? "Iniciando..." : "Iniciar Sesión"}
              </button>

              <div>
                <a
                  href="*"
                  className="hover:underline flex items-center justify-center"
                >
                  ¿Has olvidado tu contraseña?
                </a>
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
        isOpen={successModal}
        onClose={handleCloseSuccessModal}
        tipo="success"
        titulo="Inicio de sesión exitoso"
        mensaje={modalMessage}
        btnPrimario="Aceptar"
        accionPrimaria={handleCloseSuccessModal}
      />

      <Modal
        isOpen={errorModal}
        onClose={handleCloseErrorModal}
        tipo="error"
        titulo="Error de autenticación"
        mensaje={modalMessage}
        btnPrimario="Entendido"
        accionPrimaria={handleCloseErrorModal}
      />
    </div>
  );
};

export default LoginPage;
