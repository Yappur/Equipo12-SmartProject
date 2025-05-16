import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";

const VacancieTable = ({ isPublic = false }) => {
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [page, setPage] = useState(1);
  const [filtrarVacantes, setFiltrarVacantes] = useState("");

  // Estados para los filtros
  const [estado, setEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [prioridad, setPrioridad] = useState("");

  const navigate = useNavigate();

  const obtenerVacantes = async (initial = false) => {
    try {
      setLoading(true);
      const params = {
        status: estado,
        search: busqueda,
        modalidad: modalidad,
        ubicacion: ubicacion,
        prioridad: prioridad,
        limit: 3,
        page: initial ? 1 : page,
      };

      Object.keys(params).forEach(
        (key) => params[key] === "" && delete params[key]
      );

      if (Object.keys(params).length > 0 || initial) {
        const response = await axiosConfig.get("/vacancies", { params });

        if (initial) {
          setVacantes(response.data);
        } else {
          setVacantes((prev) => [...prev, ...response.data]);
        }

        // Validar si hay más para cargar
        if (response.data.length < 3) {
          setMoreAvailable(false);
        } else {
          setMoreAvailable(true);
        }
      } else {
        setVacantes([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cargarMasVacantes = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    obtenerVacantes(true);
  }, []);

  useEffect(() => {
    if (page > 1) {
      obtenerVacantes(false);
    }
  }, [page]);

  const handleVerVacante = (id) => {
    navigate(`/ver/vacante/${id}`);
  };

  const handleFiltrarChange = (e) => {
    setFiltrarVacantes(e.target.value);
  };

  const filtrarData = vacantes.filter((vacancy) => {
    const searchTerm = filtrarVacantes.toLowerCase();
    const puesto = (vacancy.puesto || "").toLowerCase();
    const ubicacion = (vacancy.ubicacion || "").toLowerCase();
    const modalidad = (vacancy.modalidad || "").toLowerCase();
    const estado = (vacancy.estado || "").toLowerCase();
    const prioridad = (vacancy.prioridad || "").toLowerCase();
    const jornada = (vacancy.jornada || "").toLowerCase();
    const nombre = (vacancy.nombre || "").toLowerCase();
    const descripcion = (vacancy.descripcion || "").toLowerCase();

    return (
      puesto.includes(searchTerm) ||
      ubicacion.includes(searchTerm) ||
      modalidad.includes(searchTerm) ||
      estado.includes(searchTerm) ||
      prioridad.includes(searchTerm) ||
      jornada.includes(searchTerm) ||
      nombre.includes(searchTerm) ||
      descripcion.includes(searchTerm)
    );
  });

  return (
    <>
      <section className="hidden lg:block max-w-5xl mx-auto ">
        <div className="space-y-4 mb-6">
          <div className="flex gap-8">
            <input
              className="border border-gray-400 bg-[#fff8f1] rounded-xl px-4 py-2 w-1/2 focus:outline-none focus:ring-2"
              value={filtrarVacantes}
              onChange={handleFiltrarChange}
              placeholder="- Ingresar palabra clave -"
            />
          </div>
        </div>

        {/* Tabla de Resultados */}
        <table className="min-w-full rounded-2xl overflow-hidden pt-10 text-md ">
          <thead>
            <tr className="text-left text-lg border-b border-gray-300">
              <th className="py-3 px-6 font-medium">Vacante</th>
              <th className="py-3 px-6 font-medium">Experiencia</th>
              <th className="py-3 px-6 font-medium">Fecha</th>
              <th className="py-3 px-6 font-medium">Ubicación</th>
              <th className="py-3 px-6 font-medium">Modalidad</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 font-medium text-sm">
            {loading && page === 1 ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  Cargando vacantes...
                </td>
              </tr>
            ) : filtrarData.length > 0 ? (
              filtrarData.map((vacante) => (
                <tr
                  key={vacante.id}
                  onClick={() => handleVerVacante(vacante.id)}
                  className="transition cursor-pointer"
                >
                  <td className="text-black font-medium py-3 px-6">
                    {vacante.nombre || vacante.puesto || (
                      <span className="text-gray-400 italic">
                        Sin información
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 max-w-xs truncate">
                    {vacante.experiencia || (
                      <span className="text-gray-400 italic">
                        Sin descripción
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 max-w-xs truncate">
                    {vacante.fecha ? (
                      new Date(vacante.fecha).toLocaleDateString("es-ES")
                    ) : (
                      <span className="text-gray-400 italic">
                        Sin fecha registrada
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-6 max-w-xs capitalize">
                    {vacante.ubicacion || (
                      <span className="text-gray-400 italic">
                        Sin ubicación
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 max-w-xs capitalize">
                    {vacante.modalidad || (
                      <span className="text-gray-400 italic">
                        Sin modalidad
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  No se encontraron vacantes.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && page > 1 && (
          <div className="flex justify-center my-6">
            <p>Cargando más vacantes...</p>
          </div>
        )}
      </section>
      {moreAvailable && !loading && (
        <div className="flex mr-2 justify-center my-8">
          <button
            className="w-full max-w-6xl mx-auto  bg-[#F88623] hover:bg-orange-500 text-white font-semibold py-3 px-10 rounded-full transition"
            onClick={cargarMasVacantes}
          >
            Ver todas las vacantes activas
          </button>
        </div>
      )}
    </>
  );
};

export default VacancieTable;
