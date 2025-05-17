import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "./SearchBar";
import Modal from "../Modals/Modal";
import { Link } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
import { FaPlus } from "react-icons/fa";
import { customStyles, paginationOptions } from "./DashboardsStyles";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../Modals/CustomToaster";
import PdfModal from "../Modals/PdfModal";
import IconoCV from "@/assets/img/cvIcon.png";
import Loader from "../Common/Loader";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

<Loader text="Cargando Vacantes..." />;

const CandidatosDelReclutador = () => {
  useCambiarTitulo("MisCandidatos");
  const [filtrarVacantes, setFiltrarVacantes] = useState("");
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [changePrioridadModal, setChangePrioridadModal] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [tempFieldValue, setTempFieldValue] = useState("");
  const [tempFieldName, setTempFieldName] = useState("");
  const [selectedCV, setSelectedCV] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { idUser } = useAuth();

  const obtenerAplicacionesDelReclutador = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosConfig.get(`/applications/${idUser?.uid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setVacantes(response.data);
      console.log("✅ Aplicaciones obtenidas: ", response.data);
    } catch (error) {
      console.error("❌ Error al cargar las aplicaciones:", error.message);
      setError(`Error al cargar las aplicaciones: ${error.message}`);
      setVacantes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idUser?.uid) {
      console.log(
        "🔄 Cambio detectado en RecruiterVacancyList para el UID:",
        idUser.uid
      );
      setVacantes([]);
      obtenerAplicacionesDelReclutador();
    }
  }, [idUser?.timestamp]);

  const cambiarEstado = async (application, nuevoEstado) => {
    try {
      setLoading(true);
      await axiosConfig.patch(`/applications/${application.id}/status`, {
        status: nuevoEstado,
      });
      setVacantes((prev) =>
        prev.map((item) =>
          item.id === application.id ? { ...item, status: nuevoEstado } : item
        )
      );
      showToast("Estado actualizado correctamente", "success");
    } catch (error) {
      console.error("❌ Error al actualizar el estado:", error.message);
      showToast("Error al actualizar el estado", "error");
    } finally {
      setLoading(false);
    }
  };

  const refreshVacantes = () => {
    obtenerVacantes();
  };

  const openChangeStatusModal = (vacancy, newStatus) => {
    setSelectedVacancy(vacancy);
    setTempFieldName("estado");
    setTempFieldValue(newStatus);
    setChangeStatusModal(true);
  };

  const handleViewCV = (cvUrl) => {
    setSelectedCV(cvUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCV(null);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setSuccessModal(true);
  };

  const handleVacancyUpdated = (updatedVacancy) => {
    showToast("Vacante actualizada con éxito", "success");
    obtenerVacantes();
  };

  const actualizarParametro = async () => {
    if (!selectedVacancy || !tempFieldName || tempFieldValue === undefined) {
      return;
    }

    setUpdating(true);
    setError(null);

    try {
      const datosActualizados = {
        [tempFieldName]: tempFieldValue,
      };

      await axiosConfig.patch(
        `/vacancies/${selectedVacancy.id}`,
        datosActualizados
      );

      setVacantes(
        vacantes.map((vacante) =>
          vacante.id === selectedVacancy.id
            ? { ...vacante, [tempFieldName]: tempFieldValue }
            : vacante
        )
      );

      if (tempFieldName === "prioridad") {
        setChangePrioridadModal(false);
      } else if (tempFieldName === "estado") {
        setChangeStatusModal(false);
      }

      showSuccessMessage(
        `El campo ${tempFieldName} ha sido actualizado correctamente`
      );
    } catch (error) {
      console.error("Error al actualizar el campo:", error);
      setUpdateError(`Error al actualizar el campo: ${error.message}`);
      obtenerVacantes();
    } finally {
      setUpdating(false);
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.fullName || "No especificado",
      sortable: true,
    },
    {
      name: "Vacante",
      cell: (row) => {
        console.log("Verificando row: ", row);

        // Si vacancyId es undefined o null, muestra un aviso y no permite click
        const vacancyId = row.vacancyId ?? "not-found";
        const linkClass =
          vacancyId === "not-found" ? "pointer-events-none text-gray-400" : "";

        return (
          <div className="group relative">
            <a
              href={`/reclutador/Descriptionvacancy/${vacancyId}`}
              className={`text-black hover:underline cursor-pointer font-medium ${linkClass}`}
              title={
                vacancyId !== "not-found"
                  ? `Ver dashboard de ${row.job_posicion || "Sin título"}`
                  : "ID no encontrado"
              }
            >
              {row.job_posicion || "Sin título"}
            </a>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.date || "Sin fecha",
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => {
        const estados = [
          "Recibido",
          "En revisión",
          "Entrevista",
          "Finalista",
          "Descartado",
        ];

        let colorClass = "bg-[#ECE8DC] text-black";
        if (row.status === "Entrevista") colorClass = "bg-[#D8E9FF] text-black";
        if (row.status === "Finalista") colorClass = "bg-[#A9EDC8] text-black";
        if (row.status === "Descartado") colorClass = "bg-[#FBAAB2] text-black";
        if (row.status === "En revisión")
          colorClass = "bg-[#FCFFD2] text-black";

        return (
          <select
            value={row.status}
            onChange={(e) => cambiarEstado(row, e.target.value)}
            className={`text-[14px] rounded-full px-2 py-1 ${colorClass}`}
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        );
      },
      sortable: true,
    },
    {
      name: "Contacto",
      cell: (row) => (
        <a
          href={`https://wa.me/${row.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-green-700 font-medium underline"
        >
          {row.phone}
        </a>
      ),
      sortable: false,
    },
    {
      name: "CV",
      cell: (row) => (
        <button
          onClick={() => handleViewCV(row.cvUrl)}
          className="text-blue-600 underline hover:text-blue-800 flex items-center cursor-pointer"
        >
          <img src={IconoCV} alt="Icono de CV" />
        </button>
      ),
    },
  ];

  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filtrarData = vacantes.filter((vacancy) => {
    const searchTerm = normalizeText(filtrarVacantes);

    const nombre = normalizeText(vacancy.fullName || "");
    const vacante = normalizeText(vacancy.job_posicion || "");
    const fecha = normalizeText(vacancy.date || "");
    const estado = normalizeText(vacancy.status || "");
    const telefono = normalizeText(vacancy.phone || "");

    return (
      nombre.includes(searchTerm) ||
      vacante.includes(searchTerm) ||
      fecha.includes(searchTerm) ||
      estado.includes(searchTerm) ||
      telefono.includes(searchTerm)
    );
  });

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl poppins text-[#152D53]">Candidatos</h1>
          <Link
            to={"/reclutador/candidatos"}
            className="bg-[#152D53] hover:bg-[#0c1b33] text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" /> Crear Candidato
          </Link>
        </div>
        <SearchBar
          value={filtrarVacantes}
          onChange={setFiltrarVacantes}
          disabled={loading}
        />
        <div>
          <p className="text-gray-500 text-sm mb-3">
            {vacantes.length} aplicaciones encontradas
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={refreshVacantes}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
            >
              Reintentar
            </button>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4">
            <DataTable
              columns={columns}
              data={filtrarData}
              pagination
              paginationComponentOptions={paginationOptions}
              pointerOnHover
              customStyles={customStyles}
              noDataComponent={
                <div className="p-6 text-center text-gray-500">
                  No hay candidatos disponibles
                </div>
              }
              progressPending={loading}
            />
          </div>
        )}
      </div>
      <Modal
        isOpen={changeStatusModal}
        onClose={() => setChangeStatusModal(false)}
        tipo="confirm"
        titulo="Cambiar Estado de Vacante"
        mensaje={`¿Estás seguro de cambiar el estado de ${
          selectedVacancy?.nombre || ""
        } a ${tempFieldValue}?`}
        btnPrimario="Confirmar Cambio"
        btnSecundario="Cancelar"
        accionPrimaria={actualizarParametro}
      />
      {showModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50"></div>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-4 w-11/12 h-5/6 max-w-4xl relative flex flex-col">
              <PdfModal cvUrl={selectedCV} onClose={handleCloseModal} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CandidatosDelReclutador;
