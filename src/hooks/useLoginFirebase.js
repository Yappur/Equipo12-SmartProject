import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axiosConfig from "@/helpers/axios.config"; // ajusta la ruta si es necesario

export const useLoginFirebase = () => {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const login = async ({ email, password }) => {
    setCargando(true);
    setError(null);

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      console.log("🔐 idToken generado:", idToken); // 👈 LOG DEL TOKEN

      localStorage.setItem("firebaseAuthToken", idToken);

      const { data } = await axiosConfig.post("/auth/verify-token", {
        idToken,
      });

      return data;
    } catch (err) {
      console.error("❌ Error al loguear:", err);
      setError(
        err.response?.data?.message || err.message || "Error al iniciar sesión"
      );
      return null;
    } finally {
      setCargando(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("firebaseAuthToken");
    localStorage.removeItem("userData");
  };

  return { login, logout, error, cargando };
};
