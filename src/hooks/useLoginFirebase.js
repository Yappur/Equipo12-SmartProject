import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axiosConfig from "@/helpers/axios.config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLoginFirebase = () => {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { setIsAuthenticated, setRole } = useAuth();
  const navigate = useNavigate();

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

      localStorage.setItem("authToken", idToken);

      const { data } = await axiosConfig.post("/auth/verify-token", {
        idToken,
      });

      setIsAuthenticated(true);
      setRole(data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

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
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/login");
  };

  return { login, logout, error, cargando };
};
