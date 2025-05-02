import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal from "../Modal";
import axiosConfig from "../../helpers/axios.config";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#f97316",
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "48px",
      "&:hover": {
        backgroundColor: "#fef3c7",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "#f1f5f9",
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

  const [deleteModal, setDeleteModal] = useState(false);
  const [changeRoleModal, setChangeRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("user");

  const obtenerUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosConfig.get("/users");

      if (response.data && Array.isArray(response.data)) {
        setUsuarios(response.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        setUsuarios(response.data.users);
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

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const openChangeRoleModal = (user, role) => {
    setSelectedUser(user);
    setNewRole(role);
    setChangeRoleModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosConfig.delete(`/users/${selectedUser.uid}`);
      obtenerUsuarios();
      setDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleChangeRol = async () => {
    try {
      await axiosConfig.patch(`/users/${selectedUser.id}/role`, {
        role: newRole,
      });
      obtenerUsuarios();
      setChangeRoleModal(false);
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
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
      name: "Rol",
      selector: (row) => (
        <select
          value={row.role || "user"}
          onChange={(e) => openChangeRoleModal(row, e.target.value)}
        >
          <option value="admin">Super Admin</option>
          <option value="user">Reclutador</option>
        </select>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
          onClick={() => openDeleteModal(row)}
        >
          Eliminar
        </button>
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
    <>
      <div className="flex justify-between items-center mb-4 ">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">
            Lista de Usuarios
          </h1>
          <p className="text-gray-500 text-sm">
            {filtrarData.length} Usuarios en total
          </p>
        </div>
        <input
          className="border border-gray-400 rounded py-2 px-4 mb-4"
          type="text"
          placeholder="Buscar Nombre o Email"
          value={filtrarUsuarios}
          onChange={(e) => setFiltrarUsuarios(e.target.value)}
          disabled={loading}
        />
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
        />
      )}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        tipo="delete"
        titulo="Eliminar Usuario"
        mensaje={`¿Estás seguro de que deseas eliminar al usuario?`}
        btnPrimario="Sí, eliminar"
        btnSecundario="Cancelar"
        accionPrimaria={handleDelete}
      />

      {/* Modal para confirmar cambio de rol */}
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
        onPrimaryAction={handleChangeRol}
      />
    </>
  );
};

export default UserTable;
