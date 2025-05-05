import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Modal from "../Modal";
import axiosConfig from "../../helpers/axios.config";
import { FaRegTrashAlt, FaPlus, FaChevronDown } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoOptions } from "react-icons/io5";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#f8fafc",
      color: "#152D53",
      fontWeight: "bold",
      fontSize: "14px",
      borderBottom: "1px solid #e2e8f0",
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "56px",
      borderBottom: "1px solid #f1f5f9",
      "&:hover": {
        backgroundColor: "#f8fafc",
      },
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#ffffff",
      borderTop: "1px solid #e2e8f0",
    },
  },
};

const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="ml-4 text-gray-600 font-medium">Cargando usuarios...</p>
  </div>
);

const UserTable = () => {
  const [filtrarUsuarios, setFiltrarUsuarios] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // MODALES
  const [deleteModal, setDeleteModal] = useState(false);
  const [changeRoleModal, setChangeRoleModal] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newRole, setNewRole] = useState("");

  const obtenerUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosConfig.get("/users");

      if (response.data && Array.isArray(response.data)) {
        setUsuarios(
          response.data.map((user) => ({
            ...user,
            estado: user.estado || "Activo",
            fecha: user.fecha || generarFechaAleatoria(),
          }))
        );
      } else if (response.data && Array.isArray(response.data.users)) {
        setUsuarios(
          response.data.users.map((user) => ({
            ...user,
            estado: user.estado || "Activo",
            fecha: user.fecha || generarFechaAleatoria(),
          }))
        );
      } else {
        setUsuarios([]);
        setError("No se pudieron cargar los datos correctamente");
      }
    } catch (error) {
      setError("Error al cargar los usuarios. Intente nuevamente.");
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const generarFechaAleatoria = () => {
    const dia = Math.floor(Math.random() * 28) + 1;
    const mes = Math.floor(Math.random() * 12) + 1;
    const año = Math.floor(Math.random() * 2) + 2024;
    return `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}/${año}`;
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const openChangeRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role === "admin" ? "user" : "admin");
    setChangeRoleModal(true);
  };

  const openChangeStatusModal = (user, status) => {
    setSelectedUser(user);
    setNewStatus(status);
    setChangeStatusModal(true);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setSuccessModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosConfig.delete(`/users/${selectedUser.uid}`);
      obtenerUsuarios();
      setDeleteModal(false);
      showSuccessMessage(
        `El usuario ${selectedUser.displayName} ha sido eliminado correctamente`
      );
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleChangeRole = async () => {
    try {
      await axiosConfig.patch(`/users/${selectedUser.uid}/role`, {
        role: newRole,
      });
      obtenerUsuarios();
      setChangeRoleModal(false);
      showSuccessMessage(
        `El rol de ${selectedUser.displayName} ha sido actualizado correctamente`
      );
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
    }
  };

  const handleChangeStatus = async () => {
    try {
      await axiosConfig.patch(`/users/${selectedUser.uid}/status`, {
        status: newStatus,
      });
      obtenerUsuarios();
      setChangeStatusModal(false);
      showSuccessMessage(
        `El estado de ${selectedUser.displayName} ha sido actualizado a ${newStatus} correctamente`
      );
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.displayName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Creacion",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "Rol",
      cell: (row) => {
        const displayRole = row.role === "admin" ? "Super Admin" : "Reclutador";

        return (
          <div
            className="cursor-pointer hover:text-[#8a9dc0]"
            onClick={() => {
              const newRole = row.role === "admin" ? "user" : "admin";
              openChangeRoleModal(row, newRole);
            }}
          >
            {displayRole} <FaChevronDown className="inline ml-1 text-xs" />
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Busqueda",
      cell: (row) => (
        <div
          className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer ${
            row.estado === "Activo"
              ? "bg-[#ffe3ca] text-amber-800"
              : "bg-[#d8e9ff] text-blue-800"
          }`}
          onClick={() =>
            openChangeStatusModal(
              row,
              row.estado === "Activo" ? "Inactivo" : "Activo"
            )
          }
        >
          {row.estado} <FaChevronDown className="inline ml-1 text-xs" />
        </div>
      ),
      sortable: true,
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

  const filtrarData = usuarios.filter(
    (user) =>
      (user.displayName?.toLowerCase() || "").includes(
        filtrarUsuarios.toLowerCase()
      ) ||
      (user.email?.toLowerCase() || "").includes(filtrarUsuarios.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Usuarios</h1>
        <Link
          to={"/admin/crear/usuario"}
          className="bg-[#152D53] hover:bg-[#0c1b33] text-white py-2 px-4 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Crear usuario
        </Link>
      </div>

      <div className="border-8 border-[#152d53] mb-3 rounded-md">
        <div className="flex items-center border-8 border-[#152d53]">
          <div className="relative flex-grow">
            <input
              className=" py-2 pl-10 pr-4 w-full"
              type="text"
              placeholder="Búsqueda"
              value={filtrarUsuarios}
              onChange={(e) => setFiltrarUsuarios(e.target.value)}
              disabled={loading}
            />
            <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="border-l-10 border-[#152d53]">
            <button
              className=" bg-[#152d53] hover:bg-[#0c1b33] text-white border-white border  py-2 px-10 flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <IoOptions className="mr-2 h-6 w-6" />
              Filtros
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-3">
          {filtrarData.length} Usuarios Encontrados
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={obtenerUsuarios}
            className="ml-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={filtrarData}
          pagination
          highlightOnHover
          customStyles={customStyles}
          noDataComponent="No hay usuarios disponibles"
          progressPending={loading}
          sortIcon={<FaChevronDown size={10} />}
        />
      )}

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        tipo="delete"
        titulo="Eliminar Usuario"
        mensaje={`¿Estás seguro de que deseas eliminar al usuario ${
          selectedUser?.displayName || ""
        }? Esta acción no se puede deshacer.`}
        btnPrimario="Sí, eliminar"
        btnSecundario="Cancelar"
        accionPrimaria={handleDelete}
      />

      <Modal
        isOpen={changeRoleModal}
        onClose={() => setChangeRoleModal(false)}
        tipo="confirm"
        titulo="Cambiar Rol de Usuario"
        mensaje={`¿Estás seguro de cambiar el rol de ${
          selectedUser?.displayName || ""
        } a ${newRole === "admin" ? "Super Admin" : "Reclutador"}?`}
        btnPrimario="Confirmar Cambio"
        btnSecundario="Cancelar"
        accionPrimaria={handleChangeRole}
      />

      <Modal
        isOpen={changeStatusModal}
        onClose={() => setChangeStatusModal(false)}
        tipo="confirm"
        titulo="Cambiar Estado de Usuario"
        mensaje={`¿Estás seguro de cambiar el estado de ${
          selectedUser?.displayName || ""
        } a ${newStatus}?`}
        btnPrimario="Confirmar Cambio"
        btnSecundario="Cancelar"
        accionPrimaria={handleChangeStatus}
      />

      <Modal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        tipo="success"
        titulo="Operación Exitosa"
        mensaje={successMessage}
        btnPrimario="Aceptar"
        accionPrimaria={() => setSuccessModal(false)}
      />
    </div>
  );
};

export default UserTable;
