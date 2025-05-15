import react from "react";




export const cambiarTitulo = (nombrePagina) => {
  switch (nombrePagina) {
    case "Landing":
      document.title = "Home Page";
      break;
    case "About":
      document.title = "Sobre Nosotros";
      break;
    case "Login":
      document.title = "Iniciar Sesión";
      break;
    case "Register":
      document.title = "Registro";
      break;
    case "Recuperar":
      document.title = "Recuperar Cuenta";
      break;
    case "VacantesGaleria":
      document.title = "Galería de Vacantes";
      break;
    case "VacanteDetalle":
      document.title = "Detalle de Vacante";
      break;
    case "Perfil":
      document.title = "Perfil";
      break;
    case "Admin":
      document.title = "Panel de Administración";
      break;
    case "PanelUsuarios":
      document.title = "Panel de Usuarios";
      break;
    case "PanelVacantes":
      document.title = "Panel de Vacantes";
      break;
    case "CrearUsuario":
      document.title = "Crear Usuario";
      break;
    case "Reclutador":
      document.title = "Panel Reclutador";
      break;
    case "Candidatos":
      document.title = "Candidatos";
      break;
    case "DetalleVacante":
      document.title = "Detalle de Vacante";
      break;
    case "DashboardVacante":
      document.title = "Vacantes Reclutador";
      break;
    case "CandidatosTable":
      document.title = "Tabla de Candidatos";
      break;
    case "VerCandidatos":
      document.title = "Candidato";
      break;
    default:
      document.title = "Página no encontrada :(";
      break;
  }
};


export default cambiarTitulo;


