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

          // Comprobaciones para la URL de la imagen
          if (data.photoURL) {
            photoUrl = data.photoURL;
          } else if (data.photoUrl) {
            photoUrl = data.photoUrl;
          } else if (data.user && data.user.photoURL) {
            photoUrl = data.user.photoURL;
          } else if (data.user && data.user.photoUrl) {
            photoUrl = data.user.photoUrl;
          } else {
            try {
              const userResponse = await axiosConfig.get(`/users/${data.uid}`);
              if (userResponse.data && userResponse.data.photoURL) {
                photoUrl = userResponse.data.photoURL;
              }
            } catch (userError) {}
          }

          // Verificar que photoUrl sea una cadena válida
          if (
            photoUrl &&
            typeof photoUrl === "string" &&
            photoUrl.trim() !== ""
          ) {
            setProfileImg(photoUrl);
          } else {
            setProfileImg(null);
          }

          setNombre(data.name || "Usuario");
        } else {
          setIsAuthenticated(false);
          setRole(null);
          setProfileImg(null);
          setNombre(null);
        }
      } catch (error) {
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
