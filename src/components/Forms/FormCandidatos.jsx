import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import { useParams } from "react-router-dom";
import { uploadCV } from "../../firebase/Upload/uploadPDF";
import { useAuth } from "../../context/AuthContext";

const FormCandidatos = ({ onClose, vacancyId, isRecruiter = false }) => {
  const { idUser } = useAuth();
  const [vacanciesList, setVacanciesList] = useState([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState(vacancyId || "");
  const [candidato, setCandidato] = useState({
    fullName: "",
    email: "",
    phone: "",
    cvUrl: "",
    skills: ["", ""],
    status: "Abierta",
  });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchRecruiterVacancies = async () => {
      if (isRecruiter && idUser) {
        try {
          const response = await axiosConfig.get("/vacancies");
          const recruiterVacancies = response.data.filter(
            (vacancy) => vacancy.createdBy === idUser.id
          );
          setVacanciesList(recruiterVacancies);

          if (!vacancyId && recruiterVacancies.length > 0) {
            setSelectedVacancyId(recruiterVacancies[0].id);
          }
        } catch (error) {
          console.error("Error al obtener las vacantes:", error);
        }
      }
    };
    fetchRecruiterVacancies();
  }, [isRecruiter, idUser, vacancyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidato({
      ...candidato,
      [name]: value,
    });
  };

  const handleVacancyChange = (e) => {
    setSelectedVacancyId(e.target.value);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      const downloadURL = await uploadCV(file);
      setCandidato((prev) => ({ ...prev, cvUrl: downloadURL }));
    } catch (error) {
      console.error("Error subiendo CV:", error);
    }
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...candidato.skills];
    updatedSkills[index] = value;
    setCandidato({
      ...candidato,
      skills: updatedSkills,
    });
  };

  const newSkill = () => {
    setCandidato({
      ...candidato,
      skills: [...candidato.skills, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const filtredSkills = candidato.skills.filter((apt) => apt !== "");

      const finalVacancyId = isRecruiter ? selectedVacancyId : vacancyId;

      if (!finalVacancyId) {
        alert("Por favor seleccione una vacante");
        setCargando(false);
        return;
      }

      const response = await axiosConfig.post("/applications", {
        fullName: candidato.fullName,
        email: candidato.email,
        phone: candidato.phone,

        cvUrl: candidato.cvUrl,
        skills: filtredSkills,
        status: candidato.status,
        vacancyId: vacancyId,
      });

      alert("Candidato creado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error al crear el candidato");
    } finally {
      setCargando(false);
    }
  };
  return (
    <div className="w-full p-4">
      <div className="bg-white w-full">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 "
        >
          <div className="my-2">
            <label className="block text-sm font-semilight mb-1">
              Nombre y apellido*
            </label>
            <input
              type="text"
              name="fullName"
              value={candidato.fullName}
              onChange={handleChange}
              className="w-full border border-gray-400 bg-gray-100 rounded p-2"
              placeholder="Nombre completo"
              required
            />
          </div>
          <div className="my-2">
            <label className="block text-sm font-semilight mb-1">Mail*</label>
            <input
              type="email"
              name="email"
              value={candidato.email}
              onChange={handleChange}
              className="w-full border border-gray-400 bg-gray-100 rounded p-2"
              placeholder="email@ejemplo.com"
              required
            />
          </div>
          <div className="my-2">
            <label className="block text-sm font-semilight mb-1">
              Teléfono*
            </label>
            <input
              type="tel"
              name="phone"
              value={candidato.phone}
              onChange={handleChange}
              className="w-full border border-gray-400 bg-gray-100 rounded p-2"
              placeholder="+123456789"
              required
            />
            <div className="col-span-2 mt-5">
              <label className="block text-sm font-semilight mb-1">
                Importar CV (PDF)*
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="w-full border border-gray-400 bg-gray-100 rounded p-2"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Aptitudes</label>
            <div className="flex flex-wrap gap-2">
              {candidato.skills.map((skills, index) => (
                <input
                  key={index}
                  type="text"
                  value={skills}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="flex-1 border border-gray-400 bg-gray-100 rounded p-2"
                  placeholder="Palabra clave"
                />
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <button
              type="button"
              onClick={newSkill}
              className="border border-gray-400 bg-white rounded px-4 py-2 text-sm"
            >
              + Agregar aptitud
            </button>
          </div>

          {isRecruiter && (
            <div className="col-span-2 my-2">
              <label className="block text-sm font-semilight mb-1">
                Seleccionar Vacante*
              </label>
              <select
                name="vacancyId"
                value={selectedVacancyId}
                onChange={handleVacancyChange}
                className="w-full border border-gray-400 bg-gray-100 rounded p-2"
                required
              >
                <option value="">Seleccionar una vacante</option>
                {vacanciesList.map((vacancy) => (
                  <option key={vacancy.id} value={vacancy.id}>
                    {vacancy.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-span-2 flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded bg-white text-black"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="px-4 py-2 rounded bg-blue-900 text-white"
            >
              {cargando ? "Cargando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCandidatos;
