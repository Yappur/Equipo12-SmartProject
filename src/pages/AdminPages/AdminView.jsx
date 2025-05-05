import { Link } from "react-router-dom";
import Sidebar from "@/components/barrasDeNavegacion/Sidebar";
import AdminNavbar from "../../components/BarrasDeNavegacion/Navbar";
import { FaUserGear, FaMagnifyingGlass } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { BsFillGrid1X2Fill } from "react-icons/bs";

const AdminView = () => {
  return (
    <>
      <Sidebar />

      <div className="pt-16 flex flex-col items-center justify-center w-full min-h-[100vh] px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
        <AdminNavbar />
        <section className="flex flex-col items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold">
            ¡Bienvendio a Talent Match!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-500">
            Super Administrador
          </p>
        </section>

        <section className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-16 lg:gap-28 text-gray-500">
          <Link
            to="/admin/crear/usuario"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl transition-all hover:bg-slate-50 duration-300 transform hover:scale-[1.02]"
          >
            <div>
              <FaUserPlus className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />{" "}
            </div>
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Nueva Usuario
            </p>
          </Link>

          <Link
            to="/admin/panelUsuarios"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl hover:bg-slate-50 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div>
              <FaUserGear className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            </div>
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Gestionar Usuarios
            </p>
          </Link>
        </section>
        <section className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-16 lg:gap-28 text-gray-500">
          <Link
            to="/crear/vacante"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl transition-all hover:bg-slate-50 duration-300 transform hover:scale-[1.02]"
          >
            <div>
              <FaMagnifyingGlass className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            </div>
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Nueva Vacante
            </p>
          </Link>

          <Link
            to="/admin/panelVacantes"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl hover:bg-slate-50 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div>
              <BsFillGrid1X2Fill className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            </div>
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Ver mis Vacantes
            </p>
          </Link>
        </section>
      </div>
    </>
  );
};

export default AdminView;
