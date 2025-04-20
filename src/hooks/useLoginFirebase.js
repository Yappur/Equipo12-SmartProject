import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axiosConfig from "@/helpers/axios.config"; // ajusta la ruta si es necesario

export const useLoginFirebase = (setIsAuthenticated) => {
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

      localStorage.setItem("firebaseAuthToken", idToken);

      // Actualiza el estado de autenticación
      setIsAuthenticated(true);

      const { data } = await axiosConfig.post("/auth/verify-token", {
        idToken,
      });

      return data;
    } catch (err) {
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
    setIsAuthenticated(false); // Actualiza el estado directamente
  };

  return { login, logout, error, cargando };
};
