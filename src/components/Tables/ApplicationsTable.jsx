import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Modal from "../Modal";
import axiosConfig from "../../helpers/axios.config";

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

const ApplicationsTable = () => {
  const obtenerPostulaciones = async () => {
    try {
      const response = await axiosConfig.get("/applications");
      setPostulaciones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Telefono",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Fecha de Nacimiento",
      selector: (row) => row.birthDate,
      sortable: true,
    },
    {
      name: "Skills",
      selector: (row) => row.skills,
      sortable: true,
    },
    {
      name: "CV",
      cell: (row) => (
        <Link to={`${row.file}`} target="_blank">
          Ver CV
        </Link>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filtrarData}
        pagination
        highlightOnHover
        customStyles={customStyles}
        noDataComponent="No hay postulantes disponibles"
      />
    </div>
  );
};

export default ApplicationsTable;
