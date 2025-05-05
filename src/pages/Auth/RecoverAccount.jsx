import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoLogin from "@/assets/img/imgfigma.png";
import { usePasswordReset } from "@/hooks/usePasswordReset";

const RecoverAccount = () => {
  const [email, setEmail] = useState("");
  const { resetPassword, error, cargando, success } = usePasswordReset();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
  };

  return (
    <div className="poppins min-h-screen bg-white flex items-center justify-center p-4 ">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-8 md:p-12 text-black flex flex-col justify-center">
            <h1 className="text-5xl text-center mb-2 drop-shadow">
              Talent Match
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
              {success && (
                <p className="text-green-600 text-center">{success}</p>
              )}
              {error && <p className="text-red-600 text-center">{error}</p>}
              {cargando && (
                <p className="text-blue-600 text-center">Enviando...</p>
              )}
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
    </div>
  );
};

export default RecoverAccount;
