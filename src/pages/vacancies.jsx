import React, { useState } from "react";
import axiosConfig from "../helpers/axios.config";
import { CirclePlus } from "lucide-react";

const Vacancies = () => {
  const [showForm, setShowForm] = useState(false);

  const [vacancy, setVacancy] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVacancy({ ...vacancy, [name]: value });
  };

  const handleFileChange = (e) => {
    setVacancy({ ...vacancy, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nombre", vacancy.nombre);
      formData.append("descripcion", vacancy.descripcion);
      formData.append("fecha", vacancy.fecha);

      if (vacancy.file) {
        formData.append("file", vacancy.file);
      }
      const response = await axiosConfig.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Vacante creada con éxito");
        setVacancy({
          nombre: "",
          descripcion: "",
          fecha: "",
          file: null,
        });
        setShowForm(false);
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
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-4 flex items-center gap-2"
        onClick={() => setShowForm(!showForm)}
      >
        <CirclePlus size={20} />
        <span>Crear nueva vacante</span>
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow-md space-y-4"
        >
          <div>
            <label htmlFor="nombre" className="block text-gray-700">
              Título de la vacante
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={vacancy.nombre}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-gray-700">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={vacancy.descripcion}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
              rows="4"
              required
            />
          </div>

          <div>
            <label htmlFor="fecha" className="block text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={vacancy.fecha}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-gray-700">
              Archivo PDF
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Guardar Vacante
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Vacancies;
