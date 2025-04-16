import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosConfig from "../../helpers/axios.config";

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.name,
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
      <select value={row.rol}>
        <option value="superAdmin">Super Admin</option>
        <option value="reclutador">Reclutador</option>
      </select>
    ),
    sortable: true,
  },
  {
    name: "Acciones",
    cell: (row) => (
      <button
        className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleEliminar(row.id)}
      >
        Eliminar
      </button>
    ),
  },
];

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
const UserTable = () => {
  const [filtrarUsuarios, setFiltrarUsuarios] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const response = await axiosConfig.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      // Añadimos un rol aleatorio a cada usuario, ya que JSONPlaceholder no tiene este campo
      const usuariosConRol = response.data.map((usuario) => ({
        ...usuario,
        rol: Math.random() > 0.5 ? "superAdmin" : "reclutador",
      }));

      setUsuarios(usuariosConRol);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const filtrarData = usuarios.filter(
    (user) =>
      user.name.toLowerCase().includes(filtrarUsuarios.toLowerCase()) ||
      user.email.toLowerCase().includes(filtrarUsuarios.toLowerCase())
  );

  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Lista de Usuarios
        </h1>
        <input
          className="border border-gray-400 rounded py-2 px-4 mb-4"
          type="text"
          placeholder="Buscar Nombre o Email"
          value={filtrarUsuarios}
          onChange={(e) => setFiltrarUsuarios(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={filtrarData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />
    </div>
  );
};

export default UserTable;
