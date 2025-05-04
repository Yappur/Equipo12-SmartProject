import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [nombre, setNombre] = useState(null);


  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, role, setRole, nombre, setNombre }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
