import Sidebar from "./Sidebar";
import AdminNavbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function CompleteNavbarLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 w-full ml-0 md:ml-64">
        <AdminNavbar />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
