import Select from "react-select";
import { ChevronDown } from "lucide-react";

const SelectLocation = ({
  options,
  value,
  onChange,
  placeholder,
  hasError,
  name,
  id,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      borderColor: hasError ? "#ef4444" : "#d1d5db",
      backgroundColor: hasError ? "#fef2f2" : "white",
      boxShadow: "none",
      "&:hover": {
        borderColor: hasError ? "#ef4444" : "#d1d5db",
      },
      minHeight: "42px",
      height: "42px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
      margin: "0",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0",
      color: "#000",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  // Componente personalizado para el indicador de dropdown
  const DropdownIndicator = (props) => {
    return (
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="w-7 h-7" />
      </div>
    );
  };

  return (
    <div className="relative">
      <Select
        id={id}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        styles={customStyles}
        components={{
          DropdownIndicator,
          // Eliminamos el indicador por defecto
          IndicatorSeparator: () => null,
        }}
        classNamePrefix="react-select"
        noOptionsMessage={() => "No hay opciones disponibles"}
     
      />
    </div>
  );
};

export default SelectLocation;
