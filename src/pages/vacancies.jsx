import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axiosConfig from "../helpers/axios.config";

const Vacancies = () => {
  const [showForm, setShowForm] = useState(false);

  const [vacancy, setVacancy] = useState({
    name: "",
    portada: "",
    description: "",
    technologies: "",
    sector: "",
    status: "disponible",
    fechaApertura: "",
    fechaCierre: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVacancy({ ...vacancy, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizamos la llamada POST al backend para guardar la vacante
      const response = await axiosConfig.post("/vacancies", vacancy);
      
      if (response.status === 200) {
        alert("Vacante creada con éxito");
        setVacancy({
          name: "",
          portada: "",
          description: "",
          technologies: "",
          sector: "",
          status: "disponible",
          fechaApertura: "",
          fechaCierre: "",
        });
      }
    } catch (error) {
      console.error("Error al crear vacante:", error);
      alert("Hubo un problema al guardar la vacante");
    }
  };

  return (
    <div className="container mx-auto my-20">
      <h1 className="text-2xl font-bold text-gray-600 mb-4">Vacantes</h1>

      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-4 flex items-center"
        onClick={() => setShowForm(!showForm)}
      >
        <FaPlus className="mr-2" /> Añadir Vacante
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Nombre de la vacante
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={vacancy.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
            />
          </div>

          <div>
            <label htmlFor="portada" className="block text-gray-700">
              Portada de la vacante
            </label>
            <input
              type="text"
              id="portada"
              name="portada"
              value={vacancy.portada}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={vacancy.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
            />
          </div>

          <div>
            <label htmlFor="sector" className="block text-gray-700">
              Sector
            </label>
            <input
              type="text"
              id="sector"
              name="sector"
              value={vacancy.sector}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-gray-700">
              Estado de la vacante
            </label>
            <select
              id="status"
              name="status"
              value={vacancy.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
            >
              <option value="disponible">Vacante disponible</option>
              <option value="cerrada">Vacante cerrada</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Guardar Vacante
          </button>
        </form>
      )}
    </div>
  );
};

export default Vacancies;
