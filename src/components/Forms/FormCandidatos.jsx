import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
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
    status: "Recibido",
  });
  const [cargando, setCargando] = useState(false);
  const [loadingVacancies, setLoadingVacancies] = useState(false);

  useEffect(() => {
    const fetchRecruiterVacancies = async () => {
      if (isRecruiter && idUser) {
        try {
          setLoadingVacancies(true);
          console.log("Buscando vacantes para el reclutador:", idUser);
          const response = await axiosConfig.get("/vacancies");
          console.log("Vacantes obtenidas:", response.data);

          const recruiterVacancies = response.data.filter((vacancy) => {
            console.log(`Comparando: ${vacancy.userId} con ${idUser.id}`);
            return String(vacancy.userId) === String(idUser.id);
          });

          console.log("Vacantes filtradas:", recruiterVacancies);
          setVacanciesList(recruiterVacancies);

          if (vacancyId) {
            console.log("Usando vacancyId proporcionado:", vacancyId);
            setSelectedVacancyId(vacancyId);
          } else if (recruiterVacancies.length > 0 && !selectedVacancyId) {
            console.log("Usando primera vacante:", recruiterVacancies[0].id);
            setSelectedVacancyId(recruiterVacancies[0].id);
          }
        } catch (error) {
          console.error("Error al obtener las vacantes:", error);
        } finally {
          setLoadingVacancies(false);
        }
      } else if (vacancyId) {
        // Si no es reclutador pero hay un vacancyId proporcionado
        console.log("No es reclutador pero hay vacancyId:", vacancyId);
        setSelectedVacancyId(vacancyId);
        setLoadingVacancies(false);
      } else {
        setLoadingVacancies(false);
      }
    };

    fetchRecruiterVacancies();
  }, [isRecruiter, idUser, vacancyId]);

  useEffect(() => {
    if (vacancyId) {
      console.log("vacancyId cambió a:", vacancyId);
      setSelectedVacancyId(vacancyId);
    }
  }, [vacancyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidato({
      ...candidato,
      [name]: value,
    });
  };

  const handleVacancyChange = (e) => {
    console.log("Vacante seleccionada:", e.target.value);
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
      console.log("ID de vacante para enviar:", finalVacancyId);

      if (!finalVacancyId) {
        alert("Por favor seleccione una vacante");
        setCargando(false);
        return;
      }

      const candidatoData = {
        fullName: candidato.fullName,
        email: candidato.email,
        phone: candidato.phone,
        cvUrl: candidato.cvUrl,
        skills: filtredSkills,
        status: candidato.status,
        vacancyId: finalVacancyId,
      };

      console.log("Enviando datos del candidato:", candidatoData);
      const response = await axiosConfig.post("/applications", candidatoData);
      console.log("Respuesta:", response.data);

      alert("Candidato creado exitosamente");
      onClose();
    } catch (error) {
      console.error("Error al crear el candidato:", error);
      alert(
        "Error al crear el candidato: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setCargando(false);
    }
  };
  return (
    <div className=" p-4">
      <div className="bg-white ">
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
          </div>
          {isRecruiter && (
            <div className="my-2">
              <label className="text-sm font-semilight mb-1">
                Vacante a cubrir*
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
                    {vacancy.title ||
                      vacancy.nombre ||
                      vacancy.puesto ||
                      "Vacante sin título"}
                  </option>
                ))}
              </select>
              {vacanciesList.length === 0 && !loadingVacancies && (
                <p className="text-sm text-red-500 mt-1">
                  No hay vacantes disponibles. Por favor, cree una vacante
                  primero.
                </p>
              )}
              {loadingVacancies && (
                <p className="text-sm text-gray-500 mt-1">
                  Cargando vacantes...
                </p>
              )}
            </div>
          )}

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
