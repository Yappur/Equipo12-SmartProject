import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoLogin from "@/assets/img/mujer-hero.png";
import Modal from "../../components/Modal";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import LandingNavbar from "../../components/Navigate/LandingNavbar";

const RecoverAccount = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { resetPassword, error, cargando, success } = usePasswordReset();

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setErrorModal(true);
    }
  }, [error]);

  const showSuccessMessage = (message) => {
    setModalMessage(message || "Correo enviado. Revise su bandeja de entrada.");
    setSuccessModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
    showSuccessMessage("Correo enviado. Revise su bandeja de entrada.");
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    if (success) {
      navigate("/login");
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  return (
    <>
      <LandingNavbar />
      <div className="poppins py-40 bg-white flex items-center justify-center p-4 ">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-8 md:p-12 text-black flex flex-col justify-center">
              <h1 className="text-5xl text-center mb-2 drop-shadow text-[#152d53]">
                Talent <span className="font-semibold italic ">Match</span>
              </h1>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="my-6">
                  <h2>Recupera tu contraseña con tu email de usuario</h2>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 mt-1 bg-gray-200 border border-white/30 rounded-md placeholder-gray-600 text-sm focus:ring-2 focus:ring-[#14599A] focus:outline-none"
                    placeholder="Ingresa tu correo"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={cargando}
                  className="inter text-2xl w-1/3 flex items-center justify-center mx-auto bg-[#152d53] hover:bg-[#181f31] text-white font-semibold py-2.5 rounded-md transition shadow"
                >
                  Enviar
                </button>
                <div>
                  <Link
                    to="/login"
                    className="hover:underline flex items-center justify-center"
                  >
                    Volver Atras
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
    </>
  );
};

export default RecoverAccount;
