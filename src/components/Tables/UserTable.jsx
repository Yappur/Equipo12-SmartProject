import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
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

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que querés eliminar el usuario?"
    );
    if (!confirm) return;
    try {
      await axiosConfig.delete(`/users/${id}`);
      alert("Usuario eliminado con exito");
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleChangeRol = async (id, newRol) => {
    const confirm = window.confirm(
      "¿Estás seguro de que querés cambiar el rol del usuario?"
    );
    if (!confirm) return;

    try {
      await axiosConfig.patch(`/users/${id}/role`, { role: newRol });
      alert("Rol cambiado con exito");
      obtenerUsuarios();
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
          onChange={(e) => handleChangeRol(row.uid, e.target.value)}
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
          onClick={() => handleDelete(row.uid)}
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
    </>
  );
};

export default UserTable;
