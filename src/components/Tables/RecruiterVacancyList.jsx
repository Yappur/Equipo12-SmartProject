import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "./SearchBar";
import Modal from "../Modals/Modal";
import { Link } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { customStyles, paginationOptions } from "./DashboardsStyles";
import flechasIcon from "../../assets/img/TableCandidatosIcon.png";
import { useAuth } from "../../context/AuthContext";

const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="ml-4 text-gray-600 font-medium">Cargando Vacantes...</p>
  </div>
);

const RecruiterVacancyList = () => {
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

  const [tempFieldValue, setTempFieldValue] = useState("");
  const [tempFieldName, setTempFieldName] = useState("");

  const { idUser } = useAuth();
  console.log("Valor de idUser:", idUser);
  console.log("Valor de idUser.uid:", idUser?.uid);

  const obtenerVacantes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosConfig.get(`/vacancies/reclutador/${idUser?.uid}`);
      setVacantes(response.data);
    } catch (error) {
      setError(`Error al cargar las vacantes: ${error.message}`);
      setVacantes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idUser?.uid) {
      console.log("🔄 Cambio detectado en RecruiterVacancyList para el UID:", idUser.uid);
      setVacantes([]);
      obtenerVacantes();
    }
  }, [idUser?.timestamp]);




  const refreshVacantes = () => {
    obtenerVacantes();
  };

  const openDeleteModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setDeleteModal(true);
  };

  const openChangeStatusModal = (vacancy, newStatus) => {
    console.log("📝 Abriendo modal de estado:");
    console.log("👉 Vacante seleccionada:", vacancy);
    console.log("👉 Nuevo estado:", newStatus);

    setSelectedVacancy(vacancy);
    setTempFieldName("estado");
    setTempFieldValue(newStatus);
    setChangeStatusModal(true);
  };

  const openChangePrioridadModal = (vacancy, newPrioridad) => {
    console.log("📝 Abriendo modal de prioridad:");
    console.log("👉 Vacante seleccionada:", vacancy);
    console.log("👉 Nueva prioridad:", newPrioridad);

    setSelectedVacancy(vacancy);
    setTempFieldName("prioridad");
    setTempFieldValue(newPrioridad);
    setChangePrioridadModal(true);
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

  const actualizarParametro = async () => {
    if (!selectedVacancy || !tempFieldName || tempFieldValue === undefined) {
      console.error("⛔ Error: Falta información para actualizar el parámetro");
      console.log("📝 selectedVacancy:", selectedVacancy);
      console.log("📝 tempFieldName:", tempFieldName);
      console.log("📝 tempFieldValue:", tempFieldValue);
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

      const response = await axiosConfig.patch(
        `/vacancies/${selectedVacancy.id}`,
        datosActualizados
      );

      console.log("✅ Vacante actualizada correctamente");
      console.log("🔄 Respuesta del backend:", response.data);

      // 🔄 Recargamos los datos de nuevo para actualizar la lista
      console.log("🔄 Recargando vacantes...");

      // 👇 Aquí forzamos el refresco
      await obtenerVacantes();

      // 👇 Log de verificación para ver los datos nuevos
      console.log("📝 Vacantes recargadas después del update:", vacantes);

      if (tempFieldName === "prioridad") {
        console.log("🔒 Cerrando modal de prioridad");
        setChangePrioridadModal(false);
      } else if (tempFieldName === "estado") {
        console.log("🔒 Cerrando modal de estado");
        setChangeStatusModal(false);
      }

      showSuccessMessage(
        `El campo ${tempFieldName} ha sido actualizado correctamente`
      );
    } catch (error) {
      console.error("❌ Error al actualizar el campo:", error.message);
      setUpdateError(`Error al actualizar el campo: ${error.message}`);
    } finally {
      console.log("🔄 Finalizó el proceso de actualización.");
      setUpdating(false);
    }
  };



  const columns = [
    {
      name: (
        <div className="flex justify-center items-center gap-2 p-3">
          <span></span><span className="flex justify-center items-center gap-2">Puesto</span>
        </div>
      ),
      cell: (row) => (
        <div className="group relative">
          <Link
            to={`/reclutador/Descriptionvacancy/${row.id}`}
            className="text-[#0E1F3B] hover:text-blue-800 hover:underline cursor-pointer font-medium"
            title={`Ver detalles de la vacante ${
              row.nombre || row.puesto || "Sin título"
            }`}
          >
            {row.nombre || row.puesto || "Sin título"}
          </Link>
        </div>
      ),
      sortable: true,
    },

    {
      name: "Ubicación",
      cell: (row) => (
        <div className="text-[#0E1F3B] font-medium">
          {row.ubicacion || "No especificado"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Modalidad",
      cell: (row) => {
        let colorClass = "bg-gray-200 text-gray-800";

        if (row.modalidad === "remoto") {
          colorClass = "bg-[#E9D6FE] text-purple-800";
        } else if (row.modalidad === "presencial") {
          colorClass = "bg-[#FFE3CA] text-black";
        }

        return (
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${colorClass}`}
          >
            {row.modalidad || "No especificado"}
          </div>
        );
      },
      sortable: true,
    },
    {
      name: (
        <div className="flex justify-center items-center gap-2 p-3">
          <span></span>
          <span className="flex justify-center items-center gap-2">Fecha</span>
        </div>
      ),
      cell: (row) => (
        <div className="group relative">
          <Link
            to={`/reclutador/Descriptionvacancy/${row.id}`}
            className="text-[#0E1F3B] hover:text-blue-800 hover:underline cursor-pointer "
            title={`Ver detalles de la vacante ${row.fecha || "Sin título"}`}
          >
            {row.fecha || "Sin título"}
          </Link>
        </div>
      ),
      sortable: true,
    },

    {
      name: (<div className="flex justify-center items-center gap-2 p-3">
        <span></span><span className="flex justify-center items-center gap-2">Estado</span>
      </div>),
      cell: (row) => {
        const estados = [
          "Pausa",
          "Cerrada",
          "Abierta",
        ];

        let colorClass = "bg-gray-200 text-gray-800";
        if (row.estado === "activo") colorClass = "bg-green-200 text-green-800";
        if (row.estado === "pausado")
          colorClass = "bg-yellow-200 text-yellow-800";
        if (row.estado === "borrador") colorClass = "bg-blue-200 text-blue-800";
        if (row.estado === "terminado" || row.estado === "cancelado")
          colorClass = "bg-red-200 text-red-800";

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

        let colorClass = "bg-gray-200 text-gray-800";
        if (row.prioridad === "baja")
          colorClass = "bg-green-200 text-green-800";
        if (row.prioridad === "media")
          colorClass = "bg-yellow-200 text-yellow-800";
        if (row.prioridad === "alta") colorClass = "bg-red-200 text-red-800";

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
      name: "Eliminar",
      cell: (row) => (
        <div className="flex gap-2 transform hover:scale-135 transition-all duration-400 cursor-pointer">
          <FaRegTrashAlt
            size={28}
            onClick={() => openDeleteModal(row)}
            className="text-gray-600 hover:text-red-500 transition-colors duration-600"
          />
        </div>
      ),
    },
  ];

  const filtrarData = vacantes.filter((vacante) => {
    const searchTerm = filtrarVacantes.toLowerCase();
    const nombre = (vacante.nombre || "").toLowerCase();
    const descripcion = (vacante.descripcion || "").toLowerCase();

    return nombre.includes(searchTerm) || descripcion.includes(searchTerm);
  });

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-[#152D53] font-medium ">Vacantes</h1>
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
            {vacantes.length} vacantes en total
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
              highlightOnHover
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

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => handleDelete(selectedVacancy.id)}
        title="Eliminar Vacante"
        message={`¿Estás seguro de que deseas eliminar la vacante "${selectedVacancy?.nombre}"?`}
      />

      <Modal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        title="Éxito"
        message={successMessage}
      />
      <Modal
        isOpen={changePrioridadModal}
        onClose={() => setChangePrioridadModal(false)}
        onConfirm={async () => {
          await actualizarParametro();
          setChangePrioridadModal(false);
        }}
        title="Cambiar Prioridad"
        message={`¿Estás seguro de que deseas cambiar la prioridad de esta vacante a "${tempFieldValue}"?`}
        loading={updating}
        error={updateError}
      />

      <Modal
        isOpen={changeStatusModal}
        onClose={() => setChangeStatusModal(false)}
        onConfirm={async () => {
          await actualizarParametro();
          setChangeStatusModal(false);
        }}
        title="Cambiar Estado"
        message={`¿Estás seguro de que deseas cambiar el estado de esta vacante a "${tempFieldValue}"?`}
        loading={updating}
        error={updateError}
      />

    </>
  );
};

export default RecruiterVacancyList;
