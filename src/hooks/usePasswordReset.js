import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const usePasswordReset = () => {
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (email) => {
    setCargando(true);
    setError("");
    setSuccess(false);

    const auth = getAuth();
    auth.languageCode = "es";

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Correo enviado. Revise su bandeja de entrada.");
    } catch (error) {
      setError("No se pudo enviar el correo.");
    } finally {
      setCargando(false);
    }
  };

  return { resetPassword, error, cargando, success };
};
