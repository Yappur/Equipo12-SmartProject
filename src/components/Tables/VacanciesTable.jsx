import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "./SearchBar";
import Modal from "../Modals/Modal";
import { Link } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
<<<<<<< HEAD
import { FaPlus } from "react-icons/fa";
import { customStyles, paginationOptions } from "./DashboardsStyles";
=======
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import {customStyles} from "./DashboardsStyles";
import {paginationOptions} from "./DashboardsStyles";
>>>>>>> 092ec322e9f1a1d16097b7a3d49557dc6b76011e
import ModalEditarVacante from "../Modals/ModalEditarVacante";
import BotonEditar from "../../assets/img/editar.png";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../Modals/CustomToaster";

const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="ml-4 text-gray-600 font-medium">Cargando Vacantes...</p>
  </div>
);

const VacanciesTable = () => {
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
  const [editModal, setEditModal] = useState(false);
  const [vacancyToEdit, setVacancyToEdit] = useState(null);
  const [changeModalidadModal, setChangeModalidadModal] = useState(false);

  const { idUser } = useAuth();
  console.log("Valor de idUser:", idUser);
  console.log("Valor de idUser.uid:", idUser?.uid);

  const obtenerVacantes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosConfig.get(
        `/vacancies/reclutador/${idUser?.uid}`
      );
      setVacantes(response.data);
    } catch (error) {
      setError(`Error al cargar las vacantes: ${error.message}`);
      setVacantes([]);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para obtener las vacantes al cargar el componente
  useEffect(() => {
    if (idUser?.uid) {
      console.log(
        "🔄 Cambio detectado en RecruiterVacancyList para el UID:",
        idUser.uid
      );
      setVacantes([]);
      obtenerVacantes();
    }
  }, [idUser?.timestamp]);

  useEffect(() => {
    const obtenerUbicaciones = async () => {
      try {
        const response = await axiosConfig.get("/vacancies", {
          params: { limit: 1000, page: 1 },
        });

        const ubicacionesUnicas = [
          ...new Set(response.data.map((vacante) => vacante.ubicacion)),
        ];
        setUbicaciones(ubicacionesUnicas);
      } catch (error) {
        console.error("Error al cargar ubicaciones:", error.message);
      }
    };

    obtenerUbicaciones();
  }, []);

  const refreshVacantes = () => {
    obtenerVacantes();
  };

  const openDeleteModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setDeleteModal(true);
  };

  const openChangeStatusModal = (vacancy, newStatus) => {
    setSelectedVacancy(vacancy);
    setTempFieldName("estado");
    setTempFieldValue(newStatus);
    setChangeStatusModal(true);
  };

  const openChangePrioridadModal = (vacancy, newPrioridad) => {
    setSelectedVacancy(vacancy);
    setTempFieldName("prioridad");
    setTempFieldValue(newPrioridad);
    setChangePrioridadModal(true);
  };

  const openEditModal = (vacancy) => {
    setVacancyToEdit(vacancy);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setVacancyToEdit(null);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setSuccessModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosConfig.delete(`/vacancies/${id}`);
      obtenerVacantes();
      setDeleteModal(false);
      showSuccessMessage(
        `La Vacante ${selectedVacancy.nombre} ha sido eliminada correctamente`
      );
    } catch (error) {
      console.error("Error al eliminar la vacante:", error);
      setLoading(false);
    }
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

  const openChangeModalidadModal = (vacancy, newModalidad) => {
    console.log("📝 Abriendo modal de modalidad:");
    console.log("👉 Vacante seleccionada:", vacancy);
    console.log("👉 Nueva modalidad:", newModalidad);

    setSelectedVacancy(vacancy);
    setTempFieldName("modalidad");
    setTempFieldValue(newModalidad);
    setChangeModalidadModal(true);
  };

  const actualizarModalidad = async () => {
    if (!selectedVacancy || !tempFieldName || tempFieldValue === undefined) {
      console.error("⛔ Error: Falta información para actualizar la modalidad");
      return;
    }

    setUpdating(true);
    setError(null);

    try {
      const datosActualizados = {
        [tempFieldName]: tempFieldValue,
      };

      console.log("🔄 Enviando datos al backend...");
      console.log("🔎 Endpoint:", `/vacancies/${selectedVacancy.id}`);
      console.log("📦 Datos enviados:", datosActualizados);

      await axiosConfig.patch(
        `/vacancies/${selectedVacancy.id}`,
        datosActualizados
      );

      console.log("✅ Modalidad actualizada correctamente");

      // 🔄 Recargamos los datos de nuevo para actualizar la lista
      await obtenerVacantes();

      console.log("🔄 Lista actualizada en frontend");

      setChangeModalidadModal(false);
      showSuccessMessage(`La modalidad ha sido actualizada correctamente`);
    } catch (error) {
      console.error("❌ Error al actualizar la modalidad:", error.message);
      setUpdateError(`Error al actualizar la modalidad: ${error.message}`);
    } finally {
      console.log("🔄 Finalizó el proceso de actualización.");
      setUpdating(false);
    }
  };

  const columns = [
    {
      name: "Puesto",
      cell: (row) => (
        <div className="group relative">
          <a
            href={`/reclutador/Descriptionvacancy/${row.id}`}
            className="text-black hover:underline cursor-pointer font-medium"
            title={`Ver dashboard de ${
              row.nombre || row.puesto || "Sin título"
            }`}
          >
            {row.nombre || row.puesto || "Sin título"}
          </a>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Ubicación",
      selector: (row) => row.ubicacion || "No especificado",
      sortable: true,
    },
    {
      name: "Modalidad",
      cell: (row) => {
        const modalidades = ["remoto", "presencial", "híbrido"];

        let colorClass = "bg-gray-200 text-gray-800";
        if (row.modalidad === "remoto") colorClass = "bg-[#DAB0FA] text-black";
        if (row.modalidad === "presencial")
          colorClass = "bg-orange-200/50 text-black";
        if (row.modalidad === "híbrido")
          colorClass = "bg-yellow-200/30 text-black";

        return (
          <div className="flex flex-col">
            <select
              value={row.modalidad}
              onChange={(e) => openChangeModalidadModal(row, e.target.value)}
              className={`text-sm border border-gray-300 rounded-4xl px-2 py-1 ${colorClass}`}
            >
              {modalidades.map((modalidad) => (
                <option key={modalidad} value={modalidad}>
                  {modalidad}
                </option>
              ))}
            </select>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => {
        const estados = ["pausa", "cerrada", "abierta"];

        let colorClass = "bg-gray-200 text-gray-800";
        if (row.estado === "abierta") colorClass = "bg-green-200 text-black";
        if (row.estado === "pausa") colorClass = "bg-yellow-200/50 text-black";
        if (row.estado === "borrador") colorClass = "bg-blue-200 text-blue-800";
        if (row.estado === "cerrada" || row.estado === "cancelado")
          colorClass = "bg-gray-400/30 text-black";

        return (
          <div className="flex flex-col">
            <select
              value={row.estado}
              onChange={(e) => openChangeStatusModal(row, e.target.value)}
              className={`text-sm border border-gray-300 rounded-4xl px-2 py-1 ${colorClass}`}
            >
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Prioridad",
      cell: (row) => {
        const prioridades = ["baja", "media", "alta"];

        let colorClass = "bg-gray-200 text-black";
        if (row.prioridad === "baja") colorClass = "bg-blue-200/30 text-black";
        if (row.prioridad === "media")
          colorClass = "bg-orange-200/60 text-black";
        if (row.prioridad === "alta") colorClass = "bg-red-200 text-black";

        return (
          <div className="flex flex-col">
            <select
              value={row.prioridad}
              onChange={(e) => openChangePrioridadModal(row, e.target.value)}
              className={`text-sm border border-gray-300 rounded-4xl px-2 py-1 ${colorClass}`}
            >
              {prioridades.map((prioridade) => (
                <option key={prioridade} value={prioridade}>
                  {prioridade}
                </option>
              ))}
            </select>
          </div>
        );
      },
      sortable: false,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => openEditModal(row)}
          className="  font-bold py-2 px-10 rounded cursor-pointer transition-all duration-300 ease-in-out hover:scale-140"
        >
          <img src={BotonEditar} alt="Editar" className="w-6" />
        </button>
      ),
    },
  ];

  const filtrarData = vacantes.filter((vacancy) => {
    const searchTerm = filtrarVacantes.toLowerCase();
    const puesto = (vacancy.puesto || "").toLowerCase();
    const ubicacion = (vacancy.ubicacion || "").toLowerCase();
    const modalidad = (vacancy.modalidad || "").toLowerCase();
    const estado = (vacancy.estado || "").toLowerCase();
    const prioridad = (vacancy.prioridad || "").toLowerCase();
    const jornada = (vacancy.jornada || "").toLowerCase();

    return (
      puesto.includes(searchTerm) ||
      ubicacion.includes(searchTerm) ||
      modalidad.includes(searchTerm) ||
      estado.includes(searchTerm) ||
      prioridad.includes(searchTerm) ||
      jornada.includes(searchTerm)
    );
  });

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Vacantes</h1>
          <Link
            to={"/crear/vacante"}
            className="bg-[#152D53] hover:bg-[#0c1b33] text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" /> Crear Vacante
          </Link>
        </div>
        <SearchBar
          value={filtrarVacantes}
          onChange={setFiltrarVacantes}
          disabled={loading}
        />
        <div>
          <p className="text-gray-500 text-sm mb-3">
            {vacantes.length} vacantes en totalss
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
          <div className="bg-white rounded-lg shadow">
            <DataTable
              columns={columns}
              data={filtrarData}
              pagination
              paginationComponentOptions={paginationOptions}
              pointerOnHover
              customStyles={customStyles}
              noDataComponent={
                <div className="p-6 text-center text-gray-500">
                  No hay vacantes disponibles
                </div>
              }
              progressPending={loading}
            />
          </div>
        )}
      </div>

      <ModalEditarVacante
        isOpen={editModal}
        onClose={closeEditModal}
        vacancyId={vacancyToEdit?.id}
        onVacancyUpdated={handleVacancyUpdated}
      />

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        tipo="delete"
        titulo="Eliminar Vacante"
        mensaje={`¿Estás seguro de que deseas eliminar la vacante ${
          selectedVacancy?.nombre || ""
        }? Esta acción no se puede deshacer.`}
        btnPrimario="Sí, eliminar"
        btnSecundario="Cancelar"
        accionPrimaria={() => handleDelete(selectedVacancy.id)}
      />

      <Modal
        isOpen={changeModalidadModal}
        onClose={() => setChangeModalidadModal(false)}
        onConfirm={actualizarModalidad}
        tipo="confirm"
        titulo="Cambiar Modalidad"
        mensaje={`¿Estás seguro de que deseas cambiar la modalidad de esta vacante a "${tempFieldValue}"?`}
        btnPrimario="Confirmar Cambio"
        btnSecundario="Cancelar"
        accionPrimaria={actualizarModalidad}
      />

      <Modal
        isOpen={changePrioridadModal}
        onClose={() => setChangePrioridadModal(false)}
        tipo="confirm"
        titulo="Cambiar Prioridad de Vacante"
        mensaje={`¿Estás seguro de cambiar la prioridad de ${
          selectedVacancy?.nombre || ""
        } a ${tempFieldValue}?`}
        btnPrimario="Confirmar Cambio"
        btnSecundario="Cancelar"
        accionPrimaria={actualizarParametro}
      />

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

      <Modal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        tipo="success"
        titulo="Operación exitosa"
        mensaje={successMessage}
        btnPrimario="Aceptar"
        accionPrimaria={() => setSuccessModal(false)}
      />
    </>
  );
};

export default VacanciesTable;
