export const cambiarTitulo = (nombrePagina) => {
  switch (nombrePagina) {
    case "Landing":
      document.title = "Talent Match";
      break;
    case "About":
      document.title = "Sobre Nosotros | Talent Match";
      break;
    case "Login":
      document.title = "Iniciar Sesión | Talent Match";
      break;
    case "RecuperarCuenta":
      document.title = "Recuperar Cuenta | Talent Match";
      break;
    case "VacantesGaleria":
      document.title = "Portal | Talent Match";
      break;
    case "VacanteDetalle":
      document.title = "Detalles | Talent Match";
      break;
    case "Perfil":
      document.title = "Mi Perfil | Talent Match";
      break;
    case "Admin":
      document.title = "Supervisor | Talent Match";
      break;
    case "PanelUsuarios":
      document.title = "Panel de Usuarios | Talent Match";
      break;
    case "PanelVacantes":
      document.title = "Panel de Vacantes | Talent Match";
      break;
    case "CrearUsuario":
      document.title = "Crear Usuario | Talent Match";
      break;
    case "CrearVacante":
      document.title = "Crear Vacante | Talent Match";
      break;
    case "CrearCandidatos":
      document.title = "Crear Candidato | Talent Match";
      break;
    case "Reclutador":
      document.title = "Reclutador | Talent Match";
      break;
    case "Candidatos":
      document.title = "Ver Candidatos | Talent Match";
      break;
    case "DetalleVacante":
      document.title = "Detalle de Vacante | Talent Match";
      break;
    case "MisCandidatos":
      document.title = "Mis Candidatos | Talent Match";
      break;
    case "MisVacantes":
      document.title = "Mis Vacantes | Talent Match";
      break;
    case "VerCandidatos":
      document.title = "Candidatos | Talent Match";
      break;

    default:
      document.title = "Página no encontrada :(";
      break;
  }
};

export default cambiarTitulo;
