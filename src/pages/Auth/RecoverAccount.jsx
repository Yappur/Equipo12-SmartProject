import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoLogin from "@/assets/img/mujer-hero.png";
import Modal from "../../components/Modals/Modal";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import axiosConfig from "../../helpers/axios.config";
import { showToast } from "../../components/Modals/CustomToaster";

const RecoverAccount = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const { resetPassword, error, cargando, success } = usePasswordReset();

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setErrorModal(true);
    }
  }, [error]);

  const checkEmailExists = async (email) => {
    setIsCheckingEmail(true);
    try {
      const response = await axiosConfig.get(
        `/auth/check-email?email=${email}`
      );
      setIsCheckingEmail(false);
      return response.data;
    } catch (error) {
      setIsCheckingEmail(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    const emailExists = await checkEmailExists(email);

    if (!emailExists) {
      setEmailError("Tienes que poner un correo válido");
      setErrorModal(true);
      return;
    }

    resetPassword(email);
    showToast("Correo enviado. Revise su bandeja de entrada.", "success");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleCloseErrorModal = () => {
    setErrorModal(false);
  };

  return (
    <>
      <div className="poppins min-h-screen bg-white flex items-center justify-center p-4 ">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-8 md:p-12 text-black flex flex-col justify-center">
              <h1 className="font-bold text-5xl text-center mb-2 drop-shadow tracking-wide">
                <span className="text-[#152d53]">Talent </span>
                <span className="text-[#F88623] italic">Match</span>
              </h1>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="my-6">
                  <h2 className="my-1 text-gray-800">
                    Recupera tu contraseña con tu email de usuario
                  </h2>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
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
                <div className="mt-7 block">
                  <button
                    type="submit"
                    disabled={cargando || isCheckingEmail}
                    className="inter text-2xl w-1/3 flex items-center justify-center mx-auto bg-[#152d53] hover:bg-[#181f31] text-white font-semilight py-2 rounded-md transition shadow-sm shadow-blue-950"
                  >
                    {isCheckingEmail ? "Enviar" : "Enviar"}
                  </button>
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
          mensaje="Error al enviar el correo"
          btnPrimario="Volver"
          accionPrimaria={handleCloseErrorModal}
        />
      </div>
    </>
  );
};

export default RecoverAccount;
