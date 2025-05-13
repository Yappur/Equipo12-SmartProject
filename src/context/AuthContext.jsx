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
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      null
  );

  const verifyToken = async (token) => {
    if (!token) {
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      console.log("Verificando token...");
      const { data } = await axiosConfig.post("/auth/verify-token", {
        idToken: token,
      });

      console.log("Respuesta de verificación:", data);

      setIsAuthenticated(true);
      setRole(data.role);

      setIdUser({
        id: data.uid || data.id,
        uid: data.uid,
        role: data.role,
      });

      const userName = data.name || (data.user && data.user.name) || "Usuario";
      setNombre(userName);
      console.log("Nombre establecido:", userName);

      let photoUrl = null;

      if (data.photoURL) {
        photoUrl = data.photoURL;
      } else if (data.photoUrl) {
        photoUrl = data.photoUrl;
      } else if (data.user && data.user.photoURL) {
        photoUrl = data.user.photoURL;
      } else if (data.user && data.user.photoUrl) {
        photoUrl = data.user.photoUrl;
      }

      if (!photoUrl && data.uid) {
        try {
          const userResponse = await axiosConfig.get(`/users/${data.uid}`);
          if (userResponse.data && userResponse.data.photoURL) {
            photoUrl = userResponse.data.photoURL;
          }
        } catch (userError) {
          console.error(
            "Error al obtener datos adicionales del usuario:",
            userError
          );
        }
      }

      console.log("URL de foto encontrada:", photoUrl);

      if (photoUrl && typeof photoUrl === "string" && photoUrl.trim() !== "") {
        setProfileImg(photoUrl);
      } else {
        setProfileImg(null);
      }
    } catch (error) {
      console.error("Error al verificar el token:", error);
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      setIsAuthenticated(false);
      setRole(null);
      setProfileImg(null);
      setNombre(null);
      setIdUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken(authToken);
  }, [authToken]);

  const setAuth = (token, remember = false) => {
    if (remember) {
      localStorage.setItem("authToken", token);
    } else {
      sessionStorage.setItem("authToken", token);
    }
    setAuthToken(token);
  };

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
        idUser,
        setIdUser,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
