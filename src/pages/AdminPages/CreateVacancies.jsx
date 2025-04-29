import React, { useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import { uploadImage } from "../../firebase/uploadImage";
import { CirclePlus } from "lucide-react";

const CreateVacancies = () => {
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [vacancy, setVacancy] = useState({
    nombre: "",
    descripcion: "",
    fecha: new Date().toISOString().split("T")[0],
    estado: "borrador",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVacancy({ ...vacancy, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.includes("image")) {
        alert("Por favor, sube solo archivos de imagen.");
        return;
      }

      setSelectedFile(file);

      // Crear URL temporal para la vista previa
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !vacancy.nombre ||
      !vacancy.descripcion ||
      !vacancy.fecha ||
      !vacancy.estado
    ) {
      alert("Por favor, completa todos los campos requeridos");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = null;

      if (selectedFile) {
        try {
          imageUrl = await uploadImage(selectedFile);
          console.log("Imagen subida exitosamente:", imageUrl);
        } catch (imageError) {
          console.error("Error al subir la imagen:", imageError);
          alert("Error al subir la imagen. Inténtalo de nuevo.");
          setIsSubmitting(false);
          return;
        }
      }

      const nuevaVacante = {
        ...vacancy,
        image: imageUrl,
      };

      console.log("Enviando datos de vacante:", nuevaVacante);

      const response = await axiosConfig.post("/vacancies", nuevaVacante);

      if (response.status === 200 || response.status === 201) {
        alert("Vacante creada con éxito");

        setVacancy({
          nombre: "",
          descripcion: "",
          fecha: new Date().toISOString().split("T")[0],
          estado: "borrador",
        });

        setSelectedFile(null);
        setImagePreview(null);
        setShowForm(false);
      } else {
        alert(`Error al crear la vacante: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al crear vacante:", error);
      alert(
        `Error al crear la vacante: ${error.message || "Error desconocido"}`
      );
    } finally {
      setIsSubmitting(false);
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
            <label htmlFor="estado" className="block text-gray-700">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              value={vacancy.estado}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
              required
            >
              <option value="">Selecciona un estado</option>
              <option value="activo">Activo</option>
              <option value="terminado">Terminado</option>
              <option value="pausado">Pausado</option>
              <option value="borrador">Borrador</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700">
              Imagen
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full border border-gray-300 p-2 mt-1 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              Sube una imagen que represente la vacante (JPG, PNG)
            </p>
          </div>

          {/* Vista previa de la imagen si hay imagen cargada */}
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-700 mb-1">Vista previa:</p>
              <img
                src={imagePreview}
                alt="Vista previa"
                className="max-h-40 border rounded"
                onLoad={() => {
                  // Liberar la URL temporal cuando ya no se necesite
                  URL.revokeObjectURL(imagePreview);
                }}
              />
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? "bg-green-300"
                  : "bg-green-500 hover:bg-green-600"
              } text-white py-2 px-4 rounded flex items-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                  <span>Procesando...</span>
                </>
              ) : (
                "Guardar Vacante"
              )}
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

export default CreateVacancies;
