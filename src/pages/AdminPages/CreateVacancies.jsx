import React, { useState, useEffect } from "react";
import axiosConfig from "../../helpers/axios.config";
import { ChevronDown } from "lucide-react";
import bagIcon from "../../assets/img/DesingExports/bag.svg";
import { showToast } from "../../components/Modals/CustomToaster";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";
import SelectLocation from "../../components/Forms/SelectLocation";

const MIN_DESCRIPTION_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_PUESTO_LENGTH = 100;

const CreateVacancies = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [cityOptions, setCityOptions] = useState([]);

  const [vacancy, setVacancy] = useState({
    puesto: "",
    ubicacion: "",
    descripcion: "",
    estado: "",
    modalidad: "",
    prioridad: "",
    jornada: "",
    experiencia: "",
    responsabilidades: "",
  });

  useEffect(() => {
    const states = State.getStatesOfCountry("AR");
    let cities = [];

    states.forEach((state) => {
      const citiesInState = City.getCitiesOfState("AR", state.isoCode);
      citiesInState.forEach((city) => {
        cities.push({
          value: `${city.name}, ${state.name}`,
          label: `Argentina, ${city.name}`,
        });
      });
    });

    setCityOptions(cities);
  }, []);

  const getInputClass = (field) => {
    return `w-full px-4 py-2 border rounded-md focus:outline-none ${errors[field]
        ? "border-red-500 focus:border-red-500 bg-red-50"
        : "border-gray-300"
      }`;
  };

  const validationPatterns = {
    puesto: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,()&+-/]+$/,
    experiencia: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,+()/]+$/,
    ubicacion: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,]+$/,
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!vacancy.puesto.trim()) {
      formErrors.puesto = "El puesto es requerido";
      isValid = false;
    } else if (vacancy.puesto.length > MAX_PUESTO_LENGTH) {
      formErrors.puesto = `El puesto debe tener máximo ${MAX_PUESTO_LENGTH} caracteres`;
      isValid = false;
    } else if (!validationPatterns.puesto.test(vacancy.puesto)) {
      formErrors.puesto =
        "El puesto contiene caracteres no permitidos. Solo se permiten letras, números, espacios, comas, puntos, paréntesis, &, + y -";
      isValid = false;
    }

    if (!vacancy.ubicacion) {
      formErrors.ubicacion = "La ubicación es requerida";
      isValid = false;
    }

    if (!vacancy.descripcion.trim()) {
      formErrors.descripcion = "La descripción es requerida";
      isValid = false;
    } else if (vacancy.descripcion.length < MIN_DESCRIPTION_LENGTH) {
      formErrors.descripcion = `La descripción debe tener al menos ${MIN_DESCRIPTION_LENGTH} caracteres`;
      isValid = false;
    }

    if (!vacancy.estado) {
      formErrors.estado = "El estado es requerido";
      isValid = false;
    }

    if (!vacancy.modalidad) {
      formErrors.modalidad = "La modalidad es requerida";
      isValid = false;
    }

    if (!vacancy.prioridad) {
      formErrors.prioridad = "La prioridad es requerida";
      isValid = false;
    }

    if (!vacancy.jornada) {
      formErrors.jornada = "La jornada es requerida";
      isValid = false;
    }

    if (!vacancy.experiencia.trim()) {
      formErrors.experiencia = "La experiencia es requerida";
      isValid = false;
    } else if (!validationPatterns.experiencia.test(vacancy.experiencia)) {
      formErrors.experiencia =
        "La experiencia contiene caracteres no permitidos. Solo se permiten letras, números, espacios, comas, puntos y los símbolos: + ( ) /";
      isValid = false;
    }

    if (!vacancy.responsabilidades.trim()) {
      formErrors.responsabilidades = "Las responsabilidades son requeridas";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "descripcion" && value.length > MAX_DESCRIPTION_LENGTH) {
      return;
    }

    if (name === "responsabilidades" && value.length > MAX_DESCRIPTION_LENGTH) {
      return;
    }

    if (name === "puesto" && value.length > MAX_PUESTO_LENGTH) {
      return;
    }

    if (
      (name === "experiencia" || name === "ubicacion" || name === "puesto") &&
      value.trim() !== ""
    ) {
      const pattern = validationPatterns[name];
      if (!pattern.test(value)) {
        let errorMessage = "";

        if (name === "experiencia") {
          errorMessage =
            "Solo se permiten letras, números, espacios, comas, puntos y los símbolos: + ( ) /";

          if (value.includes("-") && /\b-\d+\b/.test(value)) {
            errorMessage = "No se permiten números negativos";
          }
        } else if (name === "ubicacion") {
          errorMessage =
            "Solo se permiten letras, números, espacios, comas, puntos y guiones";
        } else if (name === "puesto") {
          errorMessage =
            "Solo se permiten letras, números, espacios, comas, puntos, paréntesis, &, + y -";
        }

        setErrors((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }

    setVacancy({ ...vacancy, [name]: value });
  };

  const handleCitySelect = (selectedOption) => {
    if (selectedOption) {
      setVacancy({ ...vacancy, ubicacion: selectedOption.value });
      setErrors((prev) => ({
        ...prev,
        ubicacion: "",
      }));
    } else {
      setVacancy({ ...vacancy, ubicacion: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast(
        "Por favor, completa todos los campos requeridos correctamente",
        "error"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const nuevaVacante = {
        fecha: new Date().toISOString().split("T")[0],
        ...vacancy,
      };

      const response = await axiosConfig.post("/vacancies", nuevaVacante);

      if (response.status === 200 || response.status === 201) {
        showToast("Vacante creada con éxito", "success");

        const id = response.data?.id || response.data?._id;

        if (id) {
          navigate(`/reclutador/Descriptionvacancy/${id}`);
        } else {
          showToast("No se pudo redirigir: ID no encontrado en la respuesta", "error");
        }
      } else {
        showToast(`Error al crear la vacante: ${response.statusText}`, "error");
      }
    } catch (error) {
      console.error("Error al crear vacante:", error);
      showToast(
        `Error al crear la vacante: ${error.message || "Error desconocido"}`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCityOption = cityOptions.find(
    (option) => option.value === vacancy.ubicacion
  );

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
                className={`block text-sm font-medium mb-1 ${errors.puesto ? "text-red-600" : ""
                  }`}
              >
                Puesto<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="puesto"
                  name="puesto"
                  value={vacancy.puesto}
                  onChange={handleInputChange}
                  placeholder="Añadir puesto"
                  className={getInputClass("puesto")}
                  maxLength={MAX_PUESTO_LENGTH}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {vacancy.puesto.length}/{MAX_PUESTO_LENGTH}
                </div>
              </div>
              {errors.puesto && (
                <p className="mt-1 text-sm text-red-600">{errors.puesto}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="ubicacion"
                  className={`block text-sm font-medium mb-1 ${errors.ubicacion ? "text-red-600" : ""
                    }`}
                >
                  Ubicación<span className="text-red-500">*</span>
                </label>
                <SelectLocation
                  id="ubicacion"
                  name="ubicacion"
                  options={cityOptions}
                  value={selectedCityOption}
                  onChange={handleCitySelect}
                  placeholder="Selecciona una ciudad en Argentina"
                  hasError={!!errors.ubicacion}
                />
                {errors.ubicacion && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.ubicacion}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="modalidad"
                  className={`block text-sm font-medium mb-1 ${errors.modalidad ? "text-red-600" : ""
                    }`}
                >
                  Modalidad<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="modalidad"
                    name="modalidad"
                    value={vacancy.modalidad}
                    onChange={handleInputChange}
                    className={`${getInputClass(
                      "modalidad"
                    )} appearance-none pr-10`}
                  >
                    <option value="" disabled hidden>
                      Añadir Modalidad
                    </option>
                    <option value="presencial">Presencial</option>
                    <option value="remoto">Remoto</option>
                    <option value="híbrido">Híbrido</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-7 h-7" />
                  </div>
                </div>
                {errors.modalidad && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.modalidad}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="prioridad"
                  className={`block text-sm font-medium mb-1 ${errors.prioridad ? "text-red-600" : ""
                    }`}
                >
                  Prioridad<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="prioridad"
                    name="prioridad"
                    value={vacancy.prioridad}
                    onChange={handleInputChange}
                    className={`${getInputClass(
                      "prioridad"
                    )} appearance-none pr-10`}
                  >
                    <option value="" disabled hidden>
                      Añadir Prioridad
                    </option>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-7 h-7" />
                  </div>
                </div>
                {errors.prioridad && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.prioridad}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="jornada"
                  className={`block text-sm font-medium mb-1 ${errors.jornada ? "text-red-600" : ""
                    }`}
                >
                  Jornada<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="jornada"
                    name="jornada"
                    value={vacancy.jornada}
                    onChange={handleInputChange}
                    className={`${getInputClass(
                      "jornada"
                    )} appearance-none pr-10`}
                  >
                    <option value="" disabled hidden>
                      Añadir Jornada
                    </option>
                    <option value="completa">Completa</option>
                    <option value="medio_tiempo">Medio tiempo</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-7 h-7" />
                  </div>
                </div>
                {errors.jornada && (
                  <p className="mt-1 text-sm text-red-600">{errors.jornada}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="experiencia"
                  className={`block text-sm font-medium mb-1 ${errors.experiencia ? "text-red-600" : ""
                    }`}
                >
                  Experiencia<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="experiencia"
                  name="experiencia"
                  value={vacancy.experiencia}
                  onChange={handleInputChange}
                  placeholder="Añadir experiencia"
                  className={getInputClass("experiencia")}
                />
                {errors.experiencia && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.experiencia}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className={`block text-sm font-medium mb-1 ${errors.estado ? "text-red-600" : ""
                    }`}
                >
                  Estado<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="estado"
                    name="estado"
                    value={vacancy.estado}
                    onChange={handleInputChange}
                    className={`${getInputClass(
                      "estado"
                    )} appearance-none pr-10`}
                  >
                    <option value="" disabled hidden>
                      Añadir Estado
                    </option>
                    <option value="abierta">Abierta</option>
                    <option value="cerrada">Cerrada</option>
                    <option value="pausa">Pausa</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-7 h-7" />
                  </div>
                </div>
                {errors.estado && (
                  <p className="mt-1 text-sm text-red-600">{errors.estado}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className={`block text-sm font-medium mb-1 ${errors.descripcion ? "text-red-600" : ""
                  }`}
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
                  className={`${getInputClass("descripcion")} min-h-[120px]`}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {vacancy.descripcion.length}/{MAX_DESCRIPTION_LENGTH}
                </div>
              </div>

              {errors.descripcion && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.descripcion}
                </p>
              )}
              <p className="text-xs text-gray-600">
                Mínimo {MIN_DESCRIPTION_LENGTH} caracteres
              </p>
            </div>

            <div>
              <label
                htmlFor="responsabilidades"
                className={`block text-sm font-medium mb-1 ${errors.responsabilidades ? "text-red-600" : ""
                  }`}
              >
                Responsabilidades<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="responsabilidades"
                  name="responsabilidades"
                  value={vacancy.responsabilidades}
                  onChange={handleInputChange}
                  placeholder="Añadir Responsabilidades"
                  className={`${getInputClass(
                    "responsabilidades"
                  )} min-h-[120px]`}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {vacancy.responsabilidades.length}/{MAX_DESCRIPTION_LENGTH}
                </div>
              </div>
              {errors.responsabilidades && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.responsabilidades}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsFirstStep(true);
                  setErrors({});
                  setVacancy({
                    puesto: "",
                    ubicacion: "",
                    descripcion: "",
                    estado: "abierta",
                    modalidad: "remoto",
                    prioridad: "media",
                    jornada: "completa",
                    experiencia: "",
                    responsabilidades: "",
                  });
                }}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 ${isSubmitting
                    ? "bg-gray-400"
                    : "bg-[#00254B] hover:bg-[#001a38]"
                  } text-white rounded`}
              >
                {isSubmitting ? "Procesando..." : "Guardar"}
              </button>
            </div>
          </form>
        ) : (
          <div
            className="flex flex-col items-center justify-center cursor-pointer py-16 px-4 sm:px-6 transition-all duration-300 transform hover:scale-[1.02]"
            onClick={() => setIsFirstStep(false)}
          >
            <img src={bagIcon} alt="Crear vacante" className="ml-8 mb-2" />

            <h2 className="text-xl font-medium text-center">Nueva vacante</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateVacancies;
