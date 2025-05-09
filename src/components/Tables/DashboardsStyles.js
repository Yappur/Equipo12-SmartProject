//Estilos para las tablas y mantener codigo mas limpio
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

export default customStyles;
