import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginFirebase } from "../hooks/useLoginFirebase";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import App404 from "../pages/App404";
import UserRegister from "../pages/Auth/UserRegister";
import AdminView from "../pages/AdminPages/AdminView";
import Navbar from "../components/Navbar";
import VacanciesDashboard from "../pages/AdminPages/VacanciesDashboard";
import UsersDashboard from "../pages/AdminPages/UsersDashboard";
import CreateVacancies from "../pages/AdminPages/CreateVacancies";
import VacanciesGallery from "../pages/PublicPages/VacanciesGallery";
import VacancyView from "../pages/PublicPages/VacancyView";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

const RoutesViews = () => {
  const { isAuthenticated, role } = useAuth();
  const { login, logout } = useLoginFirebase();

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} role={role} logout={logout} />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/galeria/vacantes" element={<VacanciesGallery />} />
        <Route path="/ver/vacante/:id" element={<VacancyView />} />
        <Route path="/login" element={<LoginPage login={login} />} />

        {/* Rutas de Reclutadores */}
        <Route
          path="/crear/vacante"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <CreateVacancies />
            </ProtectedRoute>
          }
        />

        {/* Rutas de Administracion */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panelUsuarios"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UsersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panelVacantes"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <VacanciesDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/crear/usuario"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
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
