import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#14599A] text-white py-4 mt-auto !important">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Equipo 12 - SmartProject</p>
        <div className="flex gap-4 text-sm">
          <a href="/politicas" className="hover:underline">Políticas</a>
          <a href="/terminos" className="hover:underline">Términos</a>
          <a href="/contacto" className="hover:underline">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

