import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import { uploadCV } from "../../firebase/Upload/uploadPDF";
import { useAuth } from "../../context/AuthContext";
import { ChevronDown } from "lucide-react";
import { showToast } from "../Modals/CustomToaster";
import Modal from "../Modals/Modal";
import { useLocation, useNavigate } from "react-router-dom";

const FormCandidatos = ({ onClose, vacancyId, isRecruiter = false }) => {
  const { idUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const vacancyIdFromURL = queryParams.get("vacancyId");

  const [vacanciesList, setVacanciesList] = useState([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState(
    vacancyIdFromURL || vacancyId || ""
  );
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
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    const fetchRecruiterVacancies = async () => {
      if (isRecruiter && idUser) {
        try {
          setLoadingVacancies(true);
          const response = await axiosConfig.get("/vacancies");
          const recruiterVacancies = response.data.filter(
            (vacancy) => String(vacancy.userId) === String(idUser.id)
          );

          console.log("Vacantes filtradas:", recruiterVacancies);
          setVacanciesList(recruiterVacancies);

          if (
            vacancyIdFromURL &&
            recruiterVacancies.some((v) => v.id === vacancyIdFromURL)
          ) {
            console.log(
              "Usando vacancyId proporcionado desde URL:",
              vacancyIdFromURL
            );
            setSelectedVacancyId(vacancyIdFromURL);
          } else if (
            vacancyId &&
            recruiterVacancies.some((v) => v.id === vacancyId)
          ) {
            console.log("Usando vacancyId proporcionado como prop:", vacancyId);
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
      } else if (vacancyIdFromURL) {
        console.log(
          "No es reclutador pero hay vacancyId en URL:",
          vacancyIdFromURL
        );
        setSelectedVacancyId(vacancyIdFromURL);
        setLoadingVacancies(false);
      } else {
        setLoadingVacancies(false);
      }
    };

    fetchRecruiterVacancies();
  }, [isRecruiter, idUser, vacancyIdFromURL]);

  useEffect(() => {
    if (vacancyIdFromURL) {
      console.log("vacancyId cambió a:", vacancyIdFromURL);
      setSelectedVacancyId(vacancyIdFromURL);
    }
  }, [vacancyIdFromURL]);

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
    if (!file)
      return { valid: false, message: "No se ha seleccionado ningún archivo" };

    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    const fileSize = file.size;
    const maxSize = 5 * 1024 * 1024;

    if (fileType !== "application/pdf") {
      return {
        valid: false,
        message: "Tipo de archivo no válido. Solo se permiten archivos PDF",
      };
    }

    if (!fileName.endsWith(".pdf")) {
      return {
        valid: false,
        message: "El archivo debe tener extensión .pdf",
      };
    }

    if (fileSize > maxSize) {
      return {
        valid: false,
        message: "El tamaño del archivo excede el límite de 5MB",
      };
    }
    return { valid: true, message: "" };
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
      const downloadURL = await uploadCV(file);
      setCandidato((prev) => ({ ...prev, cvUrl: downloadURL }));
      showToast("CV subido correctamente", "success");
    } catch (error) {
      setErrorModal(true);
    } finally {
      setLoadingCV(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!candidato.cvUrl) {
      setErrorModal(true);
      return;
    }

    setCargando(true);
    try {
      const finalVacancyId = isRecruiter ? selectedVacancyId : vacancyId;

      if (!finalVacancyId) {
        setErrorModal(true);
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

      const response = await axiosConfig.post("/applications", candidatoData);
      console.log("Respuesta:", response.data);

      showToast("Postulacion enviada exitosamente", "success");
      if (isRecruiter) {
        navigate(`/reclutador/ver/candidatos/${finalVacancyId}`);
      } else {
        onClose();
      }
      onClose();
    } catch (error) {
      console.error("Error al crear el candidato:", error);
      setErrorModal(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <div className="p-6 w-full">
        <div className="bg-white p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="my-2">
              <label className="block text-sm font-semilight mb-1">
                Nombre y apellido<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={candidato.fullName}
                onChange={handleChange}
                className="w-full p-3 rounded-2xl border border-gray-500 "
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
                className="w-full p-3 rounded-2xl border border-gray-500 "
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
                className="w-full p-3 rounded-2xl border border-gray-500 "
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
            <label className="inline-block md:w-1/4  w-full border border-gray-300 cursor-pointer p-2 text-center bg-white rounded hover:bg-gray-200 transition">
              <span className="font-medium text-xl text-center align-middle">
                +
              </span>{" "}
              Adjuntar CV
              <input
                type="file"
                accept="application/pdf, .pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={loadingCV}
              />
            </label>

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

          <div className="flex flex-col sm:flex-row justify-end gap-5 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-7 py-2 border border-gray-400 rounded bg-white text-black order-2 sm:order-1 mt-2 sm:mt-0"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={cargando || loadingCV}
              className="px-7 py-2 bg-[#F88623] text-white rounded hover:bg-[#F88623]/90 order-1 sm:order-2 shadow-lg shadow-gray-500/50"
            >
              {cargando ? "Cargando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={errorModal}
        onClose={() => setErrorModal(false)}
        tipo="error"
        titulo="Hubo un error"
        mensaje="No se pudo completar la acción"
        btnPrimario="Aceptar"
        accionPrimaria={() => setErrorModal(false)}
      />
    </>
  );
};

export default FormCandidatos;
