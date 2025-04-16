import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import App404 from "../pages/App404";
import UserPanel from "../pages/AdminPages/UserPanel";

const RoutesViews = () => {
  return (
    <Routes>
      {/* Rutas Publicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas Privadas */}
      <Route path="/admin/userPanel" element={<UserPanel />} />

      {/* Ruta 404 al final */}
      <Route path="*" element={<App404 />} />
    </Routes>
  );
};

export default RoutesViews;
