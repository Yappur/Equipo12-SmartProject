import React, { useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.nombre,
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

const data = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@example.com",
    rol: "superAdmin",
  },
  {
    id: 2,
    nombre: "Ana Gómez",
    email: "ana@example.com",
    rol: "reclutador",
  },
  {
    id: 3,
    nombre: "José Rodríguez",
    email: "jose@example.com",
    rol: "reclutador",
  },
  {
    id: 4,
    nombre: "Manuel López",
    email: "manuel@example.com",
    rol: "superAdmin",
  },
  {
    id: 5,
    nombre: "Leonardo Puentes",
    email: "zpuentes@example.com",
    rol: "superAdmin",
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

  const filtrarData = data.filter(
    (user) =>
      user.nombre.toLowerCase().includes(filtrarUsuarios.toLowerCase()) ||
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
