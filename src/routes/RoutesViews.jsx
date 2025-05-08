import { Routes, Route } from "react-router-dom";
import { useLoginFirebase } from "../hooks/useLoginFirebase";
import LoginPage from "../pages/Auth/LoginPage";
import App404 from "../pages/App404";
import UserRegister from "../pages/Auth/UserRegister";
import AdminView from "../pages/AdminPages/AdminView";
import VacanciesDashboard from "../pages/AdminPages/VacanciesDashboard";
import UsersDashboard from "../pages/AdminPages/UsersDashboard";
import CreateVacancies from "../pages/AdminPages/CreateVacancies";
import VacanciesGallery from "../pages/PublicPages/VacanciesGallery";
import VacancyView from "../pages/PublicPages/VacancyView";
import Perfil from "../pages/UserPages/Perfil";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import RecruiterView from "../pages/RecruiterPages/RecruiterView";
import CandidatosView from "../pages/RecruiterPages/CandidatosView";
import FormCandidatosView from "../pages/RecruiterPages/FormCandidatosView";
import RecoverAccount from "../pages/Auth/RecoverAccount";
import CandidatosDashboard from "../pages/RecruiterPages/CandidatosDashboard";
import CompleteNavbarLayout from "../components/Navigate/CompleteNavbarLayout";
import LandingView from "../pages/PublicPages/LandingView";
import AboutPage from "../pages/AboutPage";

const RoutesViews = () => {
  const { isAuthenticated, role } = useAuth();
  const { login, logout } = useLoginFirebase();

  return (
    <>
      <Routes>
        {/* Rutas Públicas */}

        <Route path="/" element={<LandingView />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/galeria/vacantes" element={<VacanciesGallery />} />
        <Route path="/ver/vacante/:id" element={<VacancyView />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/recuperar/cuenta" element={<RecoverAccount />} />

        


        {/* Rutas de Reclutadores */}
        <Route element={<CompleteNavbarLayout logout={logout} />}>
          <Route
            path="/reclutador"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <RecruiterView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclutador/candidatos"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <CandidatosView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclutador/crear/candidato"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <FormCandidatosView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclutador/ver/candidatos/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <CandidatosDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crear/vacante"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <CreateVacancies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Perfil />
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
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<App404 />} />
      </Routes>
    </>
  );
};

export default RoutesViews;