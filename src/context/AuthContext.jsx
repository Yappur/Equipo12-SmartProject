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
          setProfileImg(data.photoUrl);
          setNombre(data.displayName || data.email || "Usuario");
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        role,
        setRole,
        profileImg,
        setProfileImg,
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
