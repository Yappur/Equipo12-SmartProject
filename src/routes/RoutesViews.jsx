import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginFirebase } from "../hooks/useLoginFirebase";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import App404 from "../pages/App404";
import UserRegister from "../pages/Auth/UserRegister";
import AdminView from "../pages/AdminPages/AdminView";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/Navbar";
import VacanciesDashboard from "../pages/AdminPages/VacanciesDashboard";
import UsersDashboard from "../pages/AdminPages/UsersDashboard";
import CreateVacancies from "../pages/AdminPages/CreateVacancies";
import VacanciesGallery from "../pages/PublicPages/VacanciesGallery";

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
        <Route path="/ver/vacantes" element={<VacanciesGallery />} />
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
              <UsersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panelVacantes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <VacanciesDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/crear/usuario"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear/vacante"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateVacancies />
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
