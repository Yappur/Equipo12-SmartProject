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
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token =
          localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken");

        if (token) {
          console.log("Verificando token:", token);
          const { data } = await axiosConfig.post("/auth/verify-token", {
            idToken: token,
          });


          // Si el token es válido, establecer estados
          setIsAuthenticated(true);
          setRole(data.role);

          setIdUser({
            id: data.uid || data.id,
            uid: data.uid,
            role: data.role,
            timestamp: Date.now() // 🔄 Agregamos un timestamp para forzar el cambio
          });


          let photoUrl = null;

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
            } catch (userError) { }
          }

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
          setIdUser(null);
        }
      } catch (error) {
        console.error(
          "Error inesperado al verificar el token:",
          error?.response?.data || error.message
        );

        const status = error.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("authToken");
          setIsAuthenticated(false);
          setRole(null);
          setProfileImg(null);
          setNombre(null);
          setIdUser(null);
        } else {
          console.error("Error inesperado al verificar el token:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const updateProfileImage = (newImageUrl) => {
    setProfileImg(newImageUrl);
  };

  const updateNombre = (nuevoNombre) => {
    setNombre(nuevoNombre);
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
        idUser,
        setIdUser,
        updateNombre,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
