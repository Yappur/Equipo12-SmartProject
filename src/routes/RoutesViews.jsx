import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginFirebase } from "../hooks/useLoginFirebase";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import App404 from "../pages/App404";
import UserPanel from "../pages/AdminPages/UserPanel";
import UserRegister from "../pages/Auth/UserRegister";
import AdminView from "../pages/AdminPages/AdminView";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/Navbar";
import VacantesPanel from "../pages/AdminPages/VacantesPanel";
import Vacancies from "../pages/vacancies";

const RoutesViews = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("firebaseAuthToken")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("firebaseAuthToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const { login, logout } = useLoginFirebase(setIsAuthenticated);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/vacantes" element={<Vacancies />} />
        <Route path="/login" element={<LoginPage login={login} />} />

        {/* Rutas Protegidas */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panelUsuarios"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panelVacantes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <VacantesPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/crearUsuario"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserRegister />
            </ProtectedRoute>
          }
        />

        {/* Ruta 404 */}
        <Route path="*" element={<App404 />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
