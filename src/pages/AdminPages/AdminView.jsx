import { Link } from "react-router-dom";

import modificarUserIcon from "../../assets/img/DesingExports/modificarUsuario.svg";
import crearUserIcon from "../../assets/img/DesingExports/crearUser.svg";
import UserActiveTable from "../../components/Tables/UserActiveTable";

const AdminView = () => {
  return (
    <>
      <div className="pt-16 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
        <section className="flex flex-col items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold">
            ¡Bienvendio a Talent Match!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-500">
            Super Administrador
          </p>
        </section>

        <section className="flex flex-col w-full text-gray-500">
          <div className="flex flex-row justify-center mb-10 gap-20">
            <Link
              to="/admin/crear/usuario"
              className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl transition-all hover:bg-slate-50 duration-300 transform hover:scale-[1.02]"
            >
              <img src={crearUserIcon} alt="CreateUser" className="ml-5" />
              <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
                Crear Usuario
              </p>
            </Link>
            <Link
              to="/admin/panelUsuarios"
              className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl transition-all hover:bg-slate-50 duration-300 transform hover:scale-[1.02]"
            >
              <img src={modificarUserIcon} alt="Bag" className="ml-8" />
              <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
                Modificar Usuario
              </p>
            </Link>
          </div>
          <UserActiveTable />
        </section>
      </div>
    </>
  );
};

export default AdminView;
