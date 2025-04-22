import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#14599A] text-white py-10 px-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
        {/* Info principal */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Gestión</h3>
          <p className="text-sm text-white/80">
            Plataforma desarrollada por el Equipo 12 - SmartProject para la
            gestión eficiente de vacantes y usuarios.
          </p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Enlaces útiles</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="*" className="hover:underline">
                Políticas de Privacidad
              </a>
            </li>
            <li>
              <a href="*" className="hover:underline">
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a href="*" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Síguenos</h4>
          <div className="flex space-x-4 mt-2">
            <a href="*" className="hover:text-gray-200 transition">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="*" className="hover:text-gray-200 transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="*" className="hover:text-gray-200 transition">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="*" className="hover:text-gray-200 transition">
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Línea final */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} Equipo 12 - SmartProject. Todos los
        derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
