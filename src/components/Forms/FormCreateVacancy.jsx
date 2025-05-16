import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { State, City } from "country-state-city";
import SelectLocation from "../../components/Forms/SelectLocation";
import { showToast } from "../Modals/CustomToaster";

const MIN_DESCRIPTION_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_PUESTO_LENGTH = 100;

const FormCreateVacancy = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialValues = {},
}) => {
  const [errors, setErrors] = useState({});
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
    ...initialValues,
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

  // Efecto adicional para manejar la ubicación cuando se cargan los valores iniciales
  useEffect(() => {
    if (initialValues.ubicacion && cityOptions.length > 0) {
      // Buscar la opción de ciudad correspondiente a la ubicación inicial
      const selectedCity = cityOptions.find(
        (option) => option.value === initialValues.ubicacion
      );

      // Si no existe una coincidencia exacta, podríamos intentar una coincidencia parcial
      if (!selectedCity && typeof initialValues.ubicacion === "string") {
        const cityName = initialValues.ubicacion.split(",")[0]?.trim();
        const matchingCity = cityOptions.find((option) =>
          option.value.includes(cityName)
        );

        if (matchingCity) {
          setVacancy((prev) => ({
            ...prev,
            ubicacion: matchingCity.value,
          }));
        }
      }
    }
  }, [initialValues.ubicacion, cityOptions]);

  const getInputClass = (field) => {
    return `w-full px-4 py-2 border rounded-md focus:outline-none ${
      errors[field]
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast(
        "Por favor, complete correctamente todos los campos requeridos",
        "error"
      );
      return false;
    }

    const { fecha, ...vacancyData } = vacancy;

    onSubmit(vacancyData);
    return true;
  };

  const selectedCityOption = cityOptions.find(
    (option) => option.value === vacancy.ubicacion
  );

  return (
<section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-[110%]">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="puesto"
          className={`block text-sm font-medium mb-1 text-[18px] ${
            errors.puesto ? "text-red-600" : ""
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
          className={`${getInputClass("puesto")} pr-14 text-[#535353]`}
            maxLength={MAX_PUESTO_LENGTH}
          />
         <div className={`absolute bottom-2 right-2 text-xs ${
        vacancy.puesto.length >= MAX_PUESTO_LENGTH ? 'text-orange-500' : 'text-gray-500'}`}>
      
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
            className={`block text-sm font-medium mb-1 text-[18px] ${
              errors.ubicacion ? "text-red-600" : ""
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
            className={` text-[#535353] appearance-none pr-10`}
            hasError={!!errors.ubicacion}
          />
          {errors.ubicacion && (
            <p className="mt-1 text-sm text-red-600">{errors.ubicacion}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="modalidad"
            className={`block text-sm font-medium mb-1 text-[18px]${
              errors.modalidad ? "text-red-600" : ""
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
              className={`${getInputClass("modalidad") }  text-[#535353] appearance-none pr-10`}
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
            <p className="mt-1 text-sm text-red-600">{errors.modalidad}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="prioridad"
            className={`block text-sm font-medium mb-1 text-[18px]${
              errors.prioridad ? "text-red-600" : ""
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
              className={`${getInputClass("prioridad")} text-[#535353] appearance-none pr-10`}
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
            <p className="mt-1 text-sm text-red-600">{errors.prioridad}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="jornada"
            className={`block text-sm font-medium mb-1 text-[18px] ${
              errors.jornada ? "text-red-600" : ""
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
              className={`${getInputClass("jornada")}   text-[#535353] appearance-none pr-10`}
            >
              <option value="" disabled hidden >
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
            className={`block text-sm font-medium mb-1 text-[18px] ${
              errors.experiencia ? "text-red-600" : ""
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
            <p className="mt-1 text-sm text-red-600">{errors.experiencia}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="estado"
            className={`block text-sm font-medium mb-1 text-[18px] ${
              errors.estado ? "text-red-600" : ""
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
              className={`${getInputClass("estado")}  text-[#535353] appearance-none pr-10`}
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
          className={`block text-sm font-medium mb-1 text-[18px] ${
            errors.descripcion ? "text-red-600" : ""
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
          
           <div className={`absolute bottom-2 right-2 text-xs ${
        vacancy.descripcion.length >= MAX_DESCRIPTION_LENGTH ? 'text-orange-500' : 'text-gray-500'}`}>
            {vacancy.descripcion.length}/{MAX_DESCRIPTION_LENGTH}
        </div>
            
        </div>

        {errors.descripcion && (
          <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>
        )}
        <p className="text-xs text-gray-600">
          Mínimo {MIN_DESCRIPTION_LENGTH} caracteres
        </p>
      </div>

      <div>
        <label
          htmlFor="responsabilidades"
          className={`block text-sm font-medium mb-1 text-[18px] ${
            errors.responsabilidades ? "text-red-600" : ""
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
            className={`${getInputClass("responsabilidades")} min-h-[120px]`}
          />
           <div className={`absolute bottom-2 right-2 text-xs ${
        vacancy.responsabilidades.length >= MAX_DESCRIPTION_LENGTH ? 'text-orange-500' : 'text-gray-500'}`}>
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
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 ${
            isSubmitting ? "bg-gray-400" : "bg-[#00254B] hover:bg-[#001a38]"
          } text-white rounded`}
        >
          {isSubmitting ? "Procesando..." : "Guardar"}
        </button>
      </div>
    </form>
    </section>
  );
};

export default FormCreateVacancy;
