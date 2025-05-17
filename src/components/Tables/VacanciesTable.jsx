import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "./SearchBar";
import Modal from "../Modals/Modal";
import { Link } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
import { FaPlus } from "react-icons/fa";
import { customStyles, paginationOptions } from "./DashboardsStyles";
import ModalEditarVacante from "../Modals/ModalEditarVacante";
import BotonEditar from "../../assets/img/editar.png";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../Modals/CustomToaster";
import Loader from "../Common/Loader";

<Loader />;

const VacanciesTable = () => {
  const [filtrarVacantes, setFiltrarVacantes] = useState("");
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [changePrioridadModal, setChangePrioridadModal] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [tempFieldValue, setTempFieldValue] = useState("");
  const [tempFieldName, setTempFieldName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [vacancyToEdit, setVacancyToEdit] = useState(null);
  const [changeModalidadModal, setChangeModalidadModal] = useState(false);

  const { idUser } = useAuth();

  const obtenerVacantes = async (page = 1, limit = 100) => {
    try {
      setLoading(true);
      setError(null);

      if (!idUser?.role) {
        setError("Rol de usuario no identificado");
        return;
      }

      const endpoint =
        idUser.role === "admin"
          ? `/admin?page=${page}&limit=${limit}`
          : `/vacancies/reclutador/${idUser?.uid}`;

      const response = await axiosConfig.get(endpoint);

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
      setVacantes([]);
      obtenerVacantes();
    }
  }, [idUser?.timestamp]);

  const refreshVacantes = () => {
    obtenerVacantes();
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

  const handleDelete = async (id) => {
    try {
      const response = await axiosConfig.delete(`/vacancies/${id}`);
      obtenerVacantes();
      setDeleteModal(false);
      showToast(
        `La Vacante ${selectedVacancy.nombre} ha sido eliminada correctamente`,
        "success"
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

      showToast(
        `El campo ${tempFieldName} ha sido actualizado correctamente`,
        "success"
      );
    } catch (error) {
      setUpdateError(`Error al actualizar el campo: ${error.message}`);
      obtenerVacantes();
    } finally {
      setUpdating(false);
    }
  };

  const openChangeModalidadModal = (vacancy, newModalidad) => {
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

      await axiosConfig.patch(
        `/vacancies/${selectedVacancy.id}`,
        datosActualizados
      );

      await obtenerVacantes();

      setChangeModalidadModal(false);
      showToast(`La modalidad ha sido actualizada correctamente`, "success");
    } catch (error) {
      setUpdateError(`Error al actualizar la modalidad: ${error.message}`);
    } finally {
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
          colorClass = "bg-[#FFE3CA] text-black";
        if (row.modalidad === "híbrido") colorClass = "bg-[#FCFFD2] text-black";

        return (
          <div className="flex flex-col w-24 rounded-xl">
            {idUser.role === "admin" ? (
              <span
                className={`text-sm border border-gray-300 rounded-2xl px-2 py-1 ${colorClass}`}
              >
                {row.modalidad}
              </span>
            ) : (
              <select
                value={row.modalidad}
                onChange={(e) => openChangeModalidadModal(row, e.target.value)}
                className={`text-sm border border-gray-300 rounded-2xl px-2 py-1 ${colorClass}`}
              >
                {modalidades.map((modalidad) => (
                  <option key={modalidad} value={modalidad}>
                    {modalidad}
                  </option>
                ))}
              </select>
            )}
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.createadAt || "No especificado",
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => {
        const estados = ["pausa", "cerrada", "abierta"];
        let colorClass = "bg-gray-200 text-gray-800";

        if (row.estado === "abierta") colorClass = "bg-[#A9EDC8] text-black";
        if (row.estado === "pausa") colorClass = "bg-[#FCFFD2] text-black";
        if (row.estado === "borrador") colorClass = "bg-blue-200 text-blue-800";
        if (row.estado === "cerrada" || row.estado === "cancelado")
          colorClass = "bg-[#ECE8DC] text-black";

        return (
          <div className="flex flex-col w-24">
            {idUser.role === "admin" ? (
              <span
                className={`text-sm border border-gray-300 rounded-2xl px-2 py-1 ${colorClass}`}
              >
                {row.estado}
              </span>
            ) : (
              <select
                value={row.estado}
                onChange={(e) => openChangeStatusModal(row, e.target.value)}
                className={`text-sm border border-gray-300 rounded-2xl px-2 py-1 ${colorClass}`}
              >
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            )}
          </div>
        );
      },
      sortable: true,
    },
    idUser.role !== "admin" && {
      name: "Prioridad",
      cell: (row) => {
        const prioridades = ["baja", "media", "alta"];
        let colorClass = "bg-gray-200 text-black";

        if (row.prioridad === "baja") colorClass = "bg-[#D8E9FF] text-black";
        if (row.prioridad === "media") colorClass = "bg-[#FFE3CA] text-black";
        if (row.prioridad === "alta") colorClass = "bg-[#FBAAB2] text-black";

        return (
          <div className="flex flex-col w-24">
            <select
              value={row.prioridad}
              onChange={(e) => openChangePrioridadModal(row, e.target.value)}
              className={`text-sm border border-gray-300 rounded-2xl px-2 py-1 ${colorClass}`}
            >
              {prioridades.map((prioridad) => (
                <option key={prioridad} value={prioridad}>
                  {prioridad}
                </option>
              ))}
            </select>
          </div>
        );
      },
      sortable: false,
    },
    idUser.role !== "user" && {
      name: "Reclutador",
      selector: (row) => {
        const reclutador = row.recruter_name || "No especificado";
        return <div className="text-center">{reclutador}</div>;
      },
    },

    idUser.role !== "admin" && {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => openEditModal(row)}
          disabled={idUser.role === "admin"}
          className={`font-bold py-2 px-10 rounded cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 ${
            idUser.role === "admin" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <img src={BotonEditar} alt="Editar" className="w-4" />
        </button>
      ),
    },
  ].filter(Boolean);

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
          <h1 className="text-2xl poppins text-[#152D53]">Vacantes</h1>
          {idUser.role !== "admin" && (
            <Link
              to={"/reclutador/crear/vacante"}
              className="bg-[#152D53] hover:bg-[#0c1b33] text-white py-2 px-4 rounded-md flex items-center"
            >
              <FaPlus className="mr-2" /> Crear Vacante
            </Link>
          )}
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
              paginationComponentOptions={paginationOptions}
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
    </>
  );
};

export default VacanciesTable;
