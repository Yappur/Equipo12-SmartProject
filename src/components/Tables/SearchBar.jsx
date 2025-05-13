import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoOptions } from "react-icons/io5";
import { useState, useEffect } from "react";

const SearchBar = ({
  value,
  onChange,
  onToggleFilters,
  disabled,
  onSearch,
  limpiarFiltros,
  modalidad,
  setModalidad,
  ubicacion,
  setUbicacion,
  estado,
  setEstado,
  prioridad,
  setPrioridad,
  ubicaciones = [], // Aquí definimos un valor por defecto (array vacío)
}) => {
  return (
    <div className="border-8 border-[#152d53] mb-3 rounded-md">
      <div className="flex items-center border-8 border-[#152d53]">
        <div className="relative flex-grow">
          <input
            className="py-2 pl-10 pr-4 w-full"
            type="text"
            placeholder="Búsqueda"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="border-l-10 border-[#152d53]">
          <button
            className="bg-[#152d53] hover:bg-[#0c1b33] text-white border-white border py-2 px-10 flex items-center"
            onClick={onSearch}
          >
            <IoOptions className="mr-2 h-6 w-6" />
            Buscar
          </button>
        </div>
      </div>

      {/* Filtros secundarios */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-4 bg-[#152d53]">
        {/* Select de Modalidad */}
        <select
          className="border rounded-md px-4 py-2 w-full bg-white"
          value={modalidad}
          onChange={(e) => setModalidad(e.target.value)}
        >
          <option value="">Modalidad</option>
          <option value="presencial">Presencial</option>
          <option value="remoto">Remoto</option>
          <option value="híbrido">Híbrido</option>
        </select>

        {/* Select de Ubicación */}
        <select
          className="border rounded-md px-4 py-2 w-full bg-white"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        >
          <option value="">Ubicación</option>
          {Array.isArray(ubicaciones) &&
            ubicaciones.map((ubic, index) => (
              <option key={index} value={ubic}>
                {ubic}
              </option>
            ))}
        </select>

        {/* Select de Estado */}
        <select
          className="border rounded-md px-4 py-2 w-full bg-white"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Estado</option>
          <option value="pausado">Pausado</option>
          <option value="borrador">Borrador</option>
          <option value="terminado">Terminado</option>
          <option value="cancelado">Cancelado</option>
          <option value="activo">Activo</option>
        </select>

        {/* Select de Prioridad */}
        <select
          className="border rounded-md px-4 py-2 w-full bg-white"
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="">Prioridad</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        {/* Botón para limpiar */}
        <button
          className="bg-gray-400 hover:bg-gray-500 text-white rounded-md px-6 py-2 flex items-center justify-center"
          onClick={limpiarFiltros}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
