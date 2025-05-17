import { Routes, Route } from "react-router-dom";
import { useLoginFirebase } from "../hooks/useLoginFirebase";
import LoginPage from "../pages/Auth/LoginPage";
import App404 from "../pages/PublicPages/App404";
import UserRegister from "../pages/Auth/UserRegister";
import AdminView from "../pages/AdminPages/AdminView";
import VacanciesDashboard from "../pages/AdminPages/VacanciesDashboard";
import UsersDashboard from "../pages/AdminPages/UsersDashboard";
import VacanciesGallery from "../pages/PublicPages/VacanciesGallery";
import VacancyView from "../pages/PublicPages/VacancyView";
import Perfil from "../pages/UserPages/Perfil";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import RecruiterView from "../pages/RecruiterPages/RecruiterView";
import CandidatosView from "../pages/RecruiterPages/CandidatosView";
import RecuiterVacancyView from "../pages/RecruiterPages/RecuiterVacancyView";
import RecoverAccount from "../pages/Auth/RecoverAccount";
import CandidatosDashboard from "../pages/RecruiterPages/CandidatosDashboard";
import GeneralCandidatosDashboard from "../pages/RecruiterPages/GeneralDashboardCandidatos";
import CompleteNavbarLayout from "../components/Navigate/CompleteNavbarLayout";
import LandingView from "../pages/PublicPages/LandingView";
import AboutPage from "../pages/PublicPages/AboutPage";
import DashboardVacancyRecuiter from "../pages/RecruiterPages/DashboardVacancyRecuiter";
import ViewCreateVacancy from "../pages/RecruiterPages/ViewCreateVacancy";
import CandidatosDelReclutador from "../components/Tables/CandidatosDelReclutador";

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
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <CompleteNavbarLayout logout={logout} />
            </ProtectedRoute>
          }
        >
          <Route
            path="/reclutador"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <RecruiterView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclutador/crear/vacante"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <ViewCreateVacancy />
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
            path="/reclutador/Descriptionvacancy/:id"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <RecuiterVacancyView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclutador/candidatosPorReclutador"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <CandidatosDelReclutador />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclutador/vacantes"
            element={<DashboardVacancyRecuiter />}
          />

          <Route
            path="/reclutador/ver/candidatos/:id"
            element={<CandidatosDashboard />}
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
            path="admin/panelVacantes"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <VacanciesDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reclutador/CandidatosTable"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <GeneralCandidatosDashboard />
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
