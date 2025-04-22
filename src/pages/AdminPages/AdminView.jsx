import { Link } from "react-router-dom";
import { UserPlus, Users, Briefcase, ChevronRight } from "lucide-react";

const AdminView = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-gray-400 pt-16">
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 rounded-b-3xl shadow-xl overflow-hidden mb-10">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-blue-100 text-center text-lg">
            Gestiona usuarios y vacantes desde un solo lugar
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 pl-2 border-l-4 border-blue-500">
          Acciones Rápidas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/admin/crearUsuario" className="block">
            <div className="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <UserPlus className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Crear Usuario
                </h3>
                <p className="text-gray-600 mb-4">
                  Añade nuevos usuarios al sistema con roles personalizados
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Acceder</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/admin/panelUsuarios" className="block">
            <div className="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Ver Usuarios
                </h3>
                <p className="text-gray-600 mb-4">
                  Gestiona y visualiza todos los usuarios registrados
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Acceder</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/admin/panelVacantes" className="block">
            <div className="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Ver Vacantes
                </h3>
                <p className="text-gray-600 mb-4">
                  Administra las vacantes disponibles en la plataforma
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Acceder</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
