import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../helpers/axios.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nombre, setNombre] = useState(null);
  const [role, setRole] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token =
          localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken");

        if (token) {
          const { data } = await axiosConfig.post("/auth/verify-token", {
            idToken: token,
          });
          // Si el token es válido, establecer estados
          setIsAuthenticated(true);
          setRole(data.role);
          let photoUrl = null;

          if (data.photoUrl) {
            photoUrl = data.photoUrl;
            console.log("URL de imagen encontrada en data.photoUrl:", photoUrl);
          } else if (data.photoURL) {
            photoUrl = data.photoURL; // Caso alternativo (mayúscula)
            console.log("URL de imagen encontrada en data.photoURL:", photoUrl);
          } else if (data.user && data.user.photoUrl) {
            photoUrl = data.user.photoUrl;
            console.log(
              "URL de imagen encontrada en data.user.photoUrl:",
              photoUrl
            );
          } else if (data.user && data.user.photoURL) {
            photoUrl = data.user.photoURL;
            console.log(
              "URL de imagen encontrada en data.user.photoURL:",
              photoUrl
            );
          } else {
            console.log("No se encontró URL de imagen en la respuesta");
          }

          // Verificar que photoUrl sea una cadena válida
          if (
            photoUrl &&
            typeof photoUrl === "string" &&
            photoUrl.trim() !== ""
          ) {
            console.log("URL de imagen de perfil válida:", photoUrl);
            setProfileImg(photoUrl);
          } else {
            console.log("No se recibió una URL de imagen válida");
            setProfileImg(null);
          }

          setNombre(data.name || "Usuario");
          console.log("Respuesta del backend:", data);
        } else {
          setIsAuthenticated(false);
          setRole(null);
          setProfileImg(null);
          setNombre(null);
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setRole(null);
        setProfileImg(null);
        setNombre(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const updateProfileImage = (newImageUrl) => {
    setProfileImg(newImageUrl);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        role,
        setRole,
        profileImg,
        setProfileImg,
        updateProfileImage,
        nombre,
        setNombre,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
