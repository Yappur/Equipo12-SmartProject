import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axiosConfig from "@/helpers/axios.config";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const traducirFirebaseError = (errorCode) => {
  const codigo = errorCode.replace("auth/", "");
  switch (codigo) {
    case "EMAIL_EXISTS":
      return "Este correo ya está registrado.";
    case "OPERATION_NOT_ALLOWED":
      return "Esta operación no está permitida. Contacta al administrador.";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Demasiados intentos. Intenta más tarde.";
    case "INVALID_EMAIL":
      return "Correo electrónico inválido.";
    case "WEAK_PASSWORD : Password should be at least 6 characters":
    case "WEAK_PASSWORD":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "EMAIL_NOT_FOUND":
      return "El correo no está registrado.";
    case "INVALID_PASSWORD":
      return "La contraseña es incorrecta.";
    default:
      return "Error al procesar la solicitud.";
  }
};

export const useLoginFirebase = () => {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const { setIsAuthenticated, setRole, setNombre, setProfileImg, setIdUser } =
    useAuth();
  const navigate = useNavigate();

  const login = async ({ email, password, rememberMe = false }) => {
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

      if (rememberMe) {
        localStorage.setItem("authToken", idToken);
        sessionStorage.removeItem("authToken");
      } else {
        sessionStorage.setItem("authToken", idToken);
        localStorage.setItem("authToken", idToken);
      }

      console.log(
        "📝 Token guardado en LocalStorage:",
        localStorage.getItem("authToken")
      );
      console.log(
        "📝 Token guardado en SessionStorage:",
        sessionStorage.getItem("authToken")
      );

      const { data } = await axiosConfig.post("/auth/verify-token", {
        idToken,
      });

      const imagen = await axiosConfig.get(`/users/${data.uid}`);
      if (imagen.data && imagen.data.photoURL) {
        data.photoURL = imagen.data.photoURL;
      }

      console.log("Respuesta backend:", data);

      setIsAuthenticated(true);
      setRole(data.role);
      setNombre(data.displayName || email);
      setIdUser({
        id: data.uid || data.id,
        uid: data.uid,
        role: data.role,
        timestamp: Date.now(),
      });
      setProfileImg(data.photoURL || data.photoUrl || null);
      return data;
    } catch (err) {
      const mensajeError = traducirFirebaseError(err.code || "unknown-error");
      setError(mensajeError);

      return null;
    } finally {
      setCargando(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    setIsAuthenticated(false);
    setRole(null);
    setProfileImg(null);
    setNombre(null);
    setIdUser(null);

    window.dispatchEvent(new Event("userChanged"));

    navigate("/");
  };

  return { login, logout, error, cargando };
};
