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
    modalidad: "",
    prioridad: "media",
    ubicacion: "",
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
      !vacancy.estado ||
      !vacancy.modalidad ||
      !vacancy.prioridad ||
      !vacancy.ubicacion
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
          modalidad: "",
          prioridad: "media",
          ubicacion: "",
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
    <>
      <div className="flex ">
        <div className="flex flex-col ml-10 mt-4 sm:mr-10 ">
          <h1 className="text-2xl font-medium text-[#00254B] mb-4">Vacantes</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-md space-y-4 w-full max-w-3xl ml-10"
          >
            <div>
              <h2 className="text-2xl font-medium mb-3">Nueva vacante</h2>
              <label htmlFor="nombre" className="block ">
                Puesto
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={vacancy.nombre}
                onChange={handleInputChange}
                className="w-100 sm:w-1/2 border border-gray-300 p-2 mt-1 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block">
                Descripción del puesto
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
              <p className="text-xs text-gray-500 mt-1">
                Minimo 200 caracteres.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="estado" className="block">
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
                <label htmlFor="modalidad" className="block">
                  Modalidad
                </label>
                <select
                  id="modalidad"
                  name="modalidad"
                  value={vacancy.modalidad}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 mt-1 rounded"
                  required
                >
                  <option value="">Selecciona una modalidad</option>
                  <option value="presencial">Presencial</option>
                  <option value="remoto">Remoto</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>
            </div>

            {/* Nuevos campos: modalidad, prioridad y ubicación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prioridad" className="block">
                  Prioridad
                </label>
                <select
                  id="prioridad"
                  name="prioridad"
                  value={vacancy.prioridad}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 mt-1 rounded"
                  required
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              <div>
                <label htmlFor="ubicacion" className="block">
                  Ubicación
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={vacancy.ubicacion}
                  onChange={handleInputChange}
                  placeholder="Ciudad, País"
                  className="w-full border border-gray-300 p-2 mt-1 rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block">
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

            <div className="flex justify-end  gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded my-4"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "bg-[#00254B]"
                    : "bg-[#00254B] hover:bg-[#1e253d]"
                } text-white py-2 px-4 rounded my-4 gap-2`}
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateVacancies;
