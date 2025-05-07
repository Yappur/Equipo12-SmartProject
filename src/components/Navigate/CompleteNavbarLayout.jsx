import Sidebar from "./Sidebar";
import AdminNavbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function CompleteNavbarLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Navbar superior */}
        <AdminNavbar />

        {/* Contenido de la ruta */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
