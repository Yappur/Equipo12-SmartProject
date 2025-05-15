import React, { useEffect, useState } from "react";
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
          setVacantes(response.data); // Si es la primera carga, reemplaza
        } else {
          setVacantes((prev) => [...prev, ...response.data]); // Si es carga adicional, concatena
        }

        // Validar si hay más para cargar
        if (response.data.length < 3) {
          setMoreAvailable(false); // No hay más vacantes
        } else {
          setMoreAvailable(true); // Aún hay más para cargar
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

  // Función para cargar más vacantes
  const cargarMasVacantes = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    // Cargar vacantes iniciales
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

  // Función para manejar el cambio en el campo de búsqueda
  const handleFiltrarChange = (e) => {
    setFiltrarVacantes(e.target.value);
  };

  // Filtrar las vacantes usando toLowerCase como en la función original
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
    <section className="hidden lg:block">
      <div className="space-y-4 mb-6 border-b border-gray-300 pb-10">
        <div className="flex gap-2">
          <input
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2"
            value={filtrarVacantes}
            onChange={handleFiltrarChange}
            placeholder="Ingresar palabra clave"
          />
          <button
            className="text-center bg-orange-400 hover:bg-orange-500 text-white rounded-md px-6 py-2"
            onClick={() => obtenerVacantes(true)}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Tabla de Resultados */}
      <table className="min-w-full bg-white rounded-2xl overflow-hidden pt-10">
        <thead>
          <tr className="text-left text-gray-600 uppercase text-sm leading-normal border-b border-gray-300">
            <th className="py-3 px-6">Nombre</th>
            <th className="py-3 px-6">Descripción</th>
            <th className="py-3 px-6">Fecha</th>
            <th className="py-3 px-6">Modalidad</th>
            <th className="py-3 px-6">Ubicación</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
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
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <td className="py-3 px-6 font-semibold">
                  {vacante.nombre || vacante.puesto || (
                    <span className="text-gray-400 italic">
                      Sin información
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 max-w-xs truncate">
                  {vacante.descripcion || (
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
                  {vacante.modalidad || (
                    <span className="text-gray-400 italic">Sin modalidad</span>
                  )}
                </td>
                <td className="py-3 px-6 max-w-xs capitalize">
                  {vacante.ubicacion || (
                    <span className="text-gray-400 italic">Sin ubicación</span>
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

      {moreAvailable && !loading && (
        <div className="flex justify-center my-6">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded-full transition"
            onClick={cargarMasVacantes}
          >
            Cargar más vacantes
          </button>
        </div>
      )}
    </section>
  );
};

export default VacancieTable;
