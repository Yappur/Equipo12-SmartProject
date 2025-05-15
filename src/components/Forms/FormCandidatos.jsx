import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import { uploadCV } from "../../firebase/Upload/uploadPDF";
import { useAuth } from "../../context/AuthContext";
import { ChevronDown } from "lucide-react";
import { showToast } from "../Modals/CustomToaster";

const FormCandidatos = ({ onClose, vacancyId, isRecruiter = false }) => {
  const { idUser } = useAuth();
  const [vacanciesList, setVacanciesList] = useState([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState(vacancyId || "");
  const [candidato, setCandidato] = useState({
    fullName: "",
    email: "",
    phone: "",
    cvUrl: "",
    status: "Recibido",
  });
  const [cargando, setCargando] = useState(false);
  const [loadingVacancies, setLoadingVacancies] = useState(false);
  const [loadingCV, setLoadingCV] = useState(false);
  const [fileError, setFileError] = useState("");

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

  const validatePdfFile = (file) => {
    if (!file) return false;

    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileType !== "application/pdf") {
      return false;
    }

    if (!fileName.endsWith(".pdf")) {
      return false;
    }

    return true;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (!file) return;

    if (!validatePdfFile(file)) {
      setFileError(
        "Solo se permiten archivos PDF. Por favor, seleccione un archivo válido."
      );
      e.target.value = null;
      return;
    }

    try {
      setLoadingCV(true);
      console.log("Subiendo archivo:", file.name);
      const downloadURL = await uploadCV(file);
      console.log("URL de descarga obtenida:", downloadURL);
      setCandidato((prev) => ({ ...prev, cvUrl: downloadURL }));
      toast.dismiss();
      showToast("CV subido correctamente", "success");
    } catch (error) {
      console.error("Error subiendo CV:", error);
      toast.dismiss();
      showToast("Error al subir el CV. Inténtalo de nuevo.", "error");
    } finally {
      setLoadingCV(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!candidato.cvUrl) {
      toast.error("Por favor sube un CV antes de enviar la solicitud");
      return;
    }

    setCargando(true);
    try {
      const finalVacancyId = isRecruiter ? selectedVacancyId : vacancyId;
      console.log("ID de vacante para enviar:", finalVacancyId);

      if (!finalVacancyId) {
        toast.error("Por favor seleccione una vacante");
        setCargando(false);
        return;
      }

      const candidatoData = {
        fullName: candidato.fullName,
        email: candidato.email,
        phone: candidato.phone,
        cvUrl: candidato.cvUrl,
        status: candidato.status,
        vacancyId: finalVacancyId,
      };

      console.log("Enviando datos del candidato:", candidatoData);
      const response = await axiosConfig.post("/applications", candidatoData);
      console.log("Respuesta:", response.data);

      toast.success("Postulación enviada exitosamente");
      onClose();
    } catch (error) {
      console.error("Error al crear el candidato:", error);
      toast.error(
        `Error al crear el candidato: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="my-2">
            <label className="block text-sm font-semilight mb-1">
              Nombre y apellido<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={candidato.fullName}
              onChange={handleChange}
              className="w-full p-3 bg-[#f5f2ea] rounded border-none"
              placeholder="Nombre completo"
              required
            />
          </div>

          <div className="my-2">
            <label className="block text-sm font-semilight mb-1">
              Mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={candidato.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#f5f2ea] rounded border-none"
              placeholder="email@ejemplo.com"
              required
            />
          </div>

          <div className="my-2">
            <label className="block text-sm font-semilight mb-1">
              Teléfono<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={candidato.phone}
              onChange={handleChange}
              className="w-full p-3 bg-[#f5f2ea] rounded border-none"
              placeholder="+123456789"
              required
            />
          </div>

          {isRecruiter && (
            <div className="relative my-2">
              <label className="text-sm font-semilight mb-1">
                Vacante a cubrir<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="vacancyId"
                  value={selectedVacancyId}
                  onChange={handleVacancyChange}
                  className="w-full p-3 bg-[#f5f2ea] rounded border-none appearance-none pr-10"
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-7 w-7" />
                </div>
              </div>

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
        </div>

        <div className="col-span-2 mt-5">
          <label className="block text-sm font-semilight mb-1">
            Importar CV (Solo PDF)<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="application/pdf, .pdf"
            onChange={handleFileChange}
            className="w-full p-3 bg-[#f5f2ea] rounded border-none"
            disabled={loadingCV}
          />
          {fileError && (
            <p className="text-sm text-red-500 mt-1">{fileError}</p>
          )}
          {candidato.cvUrl && !fileError && (
            <p className="text-sm text-green-600 mt-1">
              CV subido correctamente ✓
            </p>
          )}
          {loadingCV && (
            <p className="text-sm text-gray-500 mt-1">
              Subiendo CV, por favor espere...
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded bg-white text-black order-2 sm:order-1 mt-2 sm:mt-0"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={cargando || loadingCV}
            className="px-4 py-2 bg-[#00254B] text-white rounded hover:bg-[#001a38] sm:order-2"
          >
            {cargando ? "Cargando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCandidatos;
