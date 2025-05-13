const customStyles = {
  table: {
    style: {
      border: "none",
      boxShadow: "none",
      backgroundColor: "#ffffff",
    },
  },
  head: {
    style: {
      borderBottom: "none",
    },
  },
  headCells: {
    style: {
      color: "#152D53",
      fontSize: "14px",
      paddingLeft: "16px",
      paddingRight: "16px",
      borderBottom: "none",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "56px",
      paddingLeft: "16px",
      paddingRight: "16px",
      borderBottom: "none",
      "&:hover": {
        backgroundColor: "#f8fafc",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "#ffffff",
      borderTop: "none",
    },
  },
};

// ESTA LÍNEA ES CLAVE PARA RESOLVER TU ERROR
export default customStyles;
