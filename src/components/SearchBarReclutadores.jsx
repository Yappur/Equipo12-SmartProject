import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoOptions } from "react-icons/io5";
import { useState } from "react";

const SearchBarReclutadores = ({
  value,
  onChange,
  onSearch,
  limpiarFiltros,
  rol,
  setRol,
  estado,
  setEstado,
}) => {
  // Manejador para detectar Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(); // Ejecutar búsqueda al presionar Enter
    }
  };

  return (
    <div className="border-8 border-[#152d53] mb-3 rounded-md">
      <div className="flex items-center border-8 border-[#152d53]">
        <div className="relative flex-grow">
          <input
            className="py-2 pl-10 pr-4 w-full"
            type="text"
            placeholder="Búsqueda por nombre, correo o número"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown} // Evento para detectar Enter
          />
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="border-l-10 border-[#152d53]">
          <button
            className="bg-[#152d53] hover:bg-[#0c1b33] text-white border-white border py-2 px-10 flex items-center"
            onClick={onSearch} // Aquí se ejecuta la búsqueda
          >
            <IoOptions className="mr-2 h-6 w-6" />
            Buscar
          </button>
        </div>
      </div>

      {/* Filtros secundarios */}
      <div className="grid grid-cols-2 gap-2 p-4 bg-[#152d53]">
        {/* Select de Rol */}
        <select
          className="border rounded-md px-4 py-2 w-full bg-white"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="">Rol</option>
          <option value="admin">Super Admin</option>
          <option value="user">Reclutador</option>
        </select>

        {/* Select de Estado */}
        <select
          className="border rounded-md px-4 py-2 w-full bg-white"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBarReclutadores;
