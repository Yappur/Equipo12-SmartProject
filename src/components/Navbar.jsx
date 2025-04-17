import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#14599A] text-white py-4 !important">
      <ul className="list-none flex gap-16 p-0 m-0">
        <li><a href="#" className="text-white ">Home</a></li>
        <li><a href="/admin/userPanel" className="text-white ">Usuarios</a></li>
        <li><a href="#" className="text-white ">Postulaciones</a></li>
        <li><a href="#" className="text-white ">Administrar Vacantes</a></li>
        <li><a href="#" className="text-white">Administrar Usuarios</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
