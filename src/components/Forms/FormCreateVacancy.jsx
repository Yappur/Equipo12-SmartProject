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

  useEffect(() => {
    if (initialValues.ubicacion && cityOptions.length > 0) {
      const selectedCity = cityOptions.find(
        (option) => option.value === initialValues.ubicacion
      );

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

  const TextFieldWithCounter = ({
    id,
    name,
    value,
    label,
    placeholder,
    maxLength,
    isTextarea = false,
    min = null,
  }) => {
    return (
      <div>
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 text-[18px] ${
            errors[name] ? "text-red-600" : ""
          }`}
        >
          {label}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {isTextarea ? (
            <textarea
              id={id}
              name={name}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={`${getInputClass(name)} min-h-[120px]`}
            />
          ) : (
            <input
              type="text"
              id={id}
              name={name}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={`${getInputClass(name)} ${
                name === "puesto" ? "pr-14" : ""
              } text-[#535353]`}
              maxLength={maxLength}
            />
          )}

          {maxLength && (
            <div
              className={`absolute bottom-2 right-2 text-xs ${
                value.length >= maxLength ? "text-orange-500" : "text-gray-500"
              }`}
            >
              {value.length}/{maxLength}
            </div>
          )}
        </div>
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
        )}
        {min && (
          <p className="text-xs text-gray-600">Mínimo {min} caracteres</p>
        )}
      </div>
    );
  };

  // Componente de select con icono
  const SelectField = ({ id, name, value, label, options, placeholder }) => {
    return (
      <div>
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 text-[18px] ${
            errors[name] ? "text-red-600" : ""
          }`}
        >
          {label}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id={id}
            name={name}
            value={value}
            onChange={handleInputChange}
            className={`${getInputClass(
              name
            )} text-[#535353] appearance-none pr-10`}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="w-7 h-7" />
          </div>
        </div>
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
        )}
      </div>
    );
  };

  // Lista de opciones para los selects
  const selectOptions = {
    modalidad: [
      { value: "presencial", label: "Presencial" },
      { value: "remoto", label: "Remoto" },
      { value: "híbrido", label: "Híbrido" },
    ],
    prioridad: [
      { value: "baja", label: "Baja" },
      { value: "media", label: "Media" },
      { value: "alta", label: "Alta" },
    ],
    jornada: [
      { value: "completa", label: "Completa" },
      { value: "medio_tiempo", label: "Medio tiempo" },
    ],
    estado: [
      { value: "abierta", label: "Abierta" },
      { value: "cerrada", label: "Cerrada" },
      { value: "pausa", label: "Pausa" },
    ],
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de puesto */}
        <TextFieldWithCounter
          id="puesto"
          name="puesto"
          value={vacancy.puesto}
          label="Puesto"
          placeholder="Añadir puesto"
          maxLength={MAX_PUESTO_LENGTH}
        />

        {/* Primera fila: Ubicación y Modalidad */}
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
              placeholder="Añadir ubicación"
              className={`text-[#535353] appearance-none pr-10`}
              hasError={!!errors.ubicacion}
            />
            {errors.ubicacion && (
              <p className="mt-1 text-sm text-red-600">{errors.ubicacion}</p>
            )}
          </div>

          <SelectField
            id="modalidad"
            name="modalidad"
            value={vacancy.modalidad}
            label="Modalidad"
            options={selectOptions.modalidad}
            placeholder="Añadir Modalidad"
          />
        </div>

        {/* Segunda fila: Prioridad y Jornada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            id="prioridad"
            name="prioridad"
            value={vacancy.prioridad}
            label="Prioridad"
            options={selectOptions.prioridad}
            placeholder="Añadir Prioridad"
          />

          <SelectField
            id="jornada"
            name="jornada"
            value={vacancy.jornada}
            label="Jornada"
            options={selectOptions.jornada}
            placeholder="Añadir Jornada"
          />
        </div>

        {/* Tercera fila: Experiencia y Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextFieldWithCounter
            id="experiencia"
            name="experiencia"
            value={vacancy.experiencia}
            label="Experiencia"
            placeholder="Añadir experiencia"
          />

          <SelectField
            id="estado"
            name="estado"
            value={vacancy.estado}
            label="Estado"
            options={selectOptions.estado}
            placeholder="Añadir Estado"
          />
        </div>

        {/* Descripción */}
        <TextFieldWithCounter
          id="descripcion"
          name="descripcion"
          value={vacancy.descripcion}
          label="Descripción"
          placeholder="Añadir descripción"
          maxLength={MAX_DESCRIPTION_LENGTH}
          isTextarea={true}
          min={MIN_DESCRIPTION_LENGTH}
        />

        {/* Responsabilidades */}
        <TextFieldWithCounter
          id="responsabilidades"
          name="responsabilidades"
          value={vacancy.responsabilidades}
          label="Responsabilidades"
          placeholder="Añadir Responsabilidades"
          maxLength={MAX_DESCRIPTION_LENGTH}
          isTextarea={true}
        />

        {/* Botones */}
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
