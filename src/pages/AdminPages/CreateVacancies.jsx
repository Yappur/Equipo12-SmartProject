import React, { useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import { ChevronDown } from "lucide-react";
import bagIcon from "../../assets/img/DesingExports/bag.svg";
import toast from "react-hot-toast";

const CreateVacancies = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);

  const [vacancy, setVacancy] = useState({
    puesto: "",
    ubicacion: "",
    descripcion: "",
    estado: "abierta",
    modalidad: "remoto",
    prioridad: "media",
    jornada: "full-time",
    experiencia: "",
    responsabilidades: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVacancy({ ...vacancy, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !vacancy.puesto ||
      !vacancy.descripcion ||
      !vacancy.estado ||
      !vacancy.modalidad ||
      !vacancy.prioridad ||
      !vacancy.ubicacion ||
      !vacancy.jornada ||
      !vacancy.experiencia ||
      !vacancy.responsabilidades
    ) {
      toast.error("Por favor, completa todos los campos requeridos");
      setIsSubmitting(false);
      return;
    }
    try {
      const nuevaVacante = {
        fecha: new Date().toISOString().split("T")[0],
        ...vacancy,
      };

      console.log("Enviando datos de vacante:", nuevaVacante);

      const response = await axiosConfig.post("/vacancies", nuevaVacante);

      if (response.status === 200 || response.status === 201) {
        toast.success("Vacante creada con éxito");

        setVacancy({
          puesto: "",
          ubicacion: "",
          descripcion: "",
          estado: "abierta",
          modalidad: "remoto",
          prioridad: "media",
          jornada: "full-time",
          experiencia: "",
          responsabilidades: "",
        });

        setShowForm(false);
      } else {
        toast.error(`Error al crear la vacante: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al crear vacante:", error);
      toast.error(
        `Error al crear la vacante: ${error.message || "Error desconocido"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#00254B] mb-6">
          Vacantes/Nueva vacante
        </h1>

        {!isFirstStep ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="puesto"
                className="block text-sm font-medium mb-1"
              >
                Puesto<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="puesto"
                name="puesto"
                value={vacancy.puesto}
                onChange={handleInputChange}
                placeholder="Añadir puesto"
                className="w-full p-3 bg-[#f5f2ea] rounded border-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ubicacion"
                  className="block text-sm font-medium mb-1"
                >
                  Ubicación<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={vacancy.ubicacion}
                  onChange={handleInputChange}
                  placeholder="Añadir ubicación"
                  className="w-full p-3 bg-[#f5f2ea] rounded border-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="modalidad"
                  className="block text-sm font-medium mb-1"
                >
                  Modalidad<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="modalidad"
                    name="modalidad"
                    value={vacancy.modalidad}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#f5f2ea] rounded border-none appearance-none pr-10"
                    required
                  >
                    <option value="">Añadir modalidad</option>
                    <option value="presencial">Presencial</option>
                    <option value="remoto">Remoto</option>
                    <option value="hibrido">Híbrido</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="prioridad"
                  className="block text-sm font-medium mb-1"
                >
                  Prioridad<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="prioridad"
                    name="prioridad"
                    value={vacancy.prioridad}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#f5f2ea] rounded border-none appearance-none pr-10"
                    required
                  >
                    <option value="">Añadir prioridad</option>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-7 h-7" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="jornada"
                  className="block text-sm font-medium mb-1"
                >
                  Jornada
                </label>
                <div className="relative">
                  <select
                    id="jornada"
                    name="jornada"
                    value={vacancy.jornada}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#f5f2ea] rounded border-none appearance-none pr-10"
                  >
                    <option value="">Añadir jornada</option>
                    <option value="completa">Completa</option>
                    <option value="medio tiempo">Medio tiempo</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="experiencia"
                  className="block text-sm font-medium mb-1"
                >
                  Experiencia
                </label>
                <input
                  type="text"
                  id="experiencia"
                  name="experiencia"
                  value={vacancy.experiencia}
                  onChange={handleInputChange}
                  placeholder="Añadir experiencia"
                  className="w-full p-3 bg-[#f5f2ea] rounded border-none"
                />
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className="block text-sm font-medium mb-1"
                >
                  Estado<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="estado"
                    name="estado"
                    value={vacancy.estado}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#f5f2ea] rounded border-none appearance-none pr-10"
                    required
                  >
                    <option value="">Añadir estado</option>
                    <option value="abierta">Abierta</option>
                    <option value="terminado">Terminado</option>
                    <option value="pausado">Pausado</option>
                    <option value="borrador">Borrador</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium mb-1"
              >
                Descripción<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={vacancy.descripcion}
                  onChange={handleInputChange}
                  placeholder="Añadir descripción"
                  className="w-full p-3 bg-[#f5f2ea] rounded border-none min-h-[120px]"
                  required
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {vacancy.descripcion.length}/2000
                </div>
              </div>
              <p className="text-xs text-gray-500">minimo 200 caracteres</p>
            </div>

            <div>
              <label
                htmlFor="responsabilidades"
                className="block text-sm font-medium mb-1"
              >
                Responsabilidades
              </label>
              <div className="relative">
                <textarea
                  id="responsabilidades"
                  name="responsabilidades"
                  value={vacancy.responsabilidades}
                  onChange={handleInputChange}
                  placeholder="Añadir Responsabilidades"
                  className="w-full p-3 bg-[#f5f2ea] rounded border-none min-h-[120px]"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {vacancy.responsabilidades.length}/2000
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsFirstStep(true)}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#00254B] text-white rounded hover:bg-[#001a38]"
              >
                {isSubmitting ? "Procesando..." : "Guardar"}
              </button>
            </div>
          </form>
        ) : (
          <div
            className="flex flex-col items-center justify-center cursor-pointer py-16"
            onClick={() => setIsFirstStep(false)}
          >
            <div className="relative mb-4 ml-10">
              <img src={bagIcon} alt="" />
            </div>
            <h2 className="text-xl font-medium text-center">Nueva vacante</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateVacancies;
