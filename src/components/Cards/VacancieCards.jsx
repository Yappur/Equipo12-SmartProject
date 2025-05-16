import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";

const VacancieCards = ({ isPublic = false }) => {
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [page, setPage] = useState(1);
  const [ubicaciones, setUbicaciones] = useState([]);

  // Filtros del formulario
  const [busqueda, setBusqueda] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState("");
  const [prioridad, setPrioridad] = useState("");

  // Filtro local para búsqueda en el cliente (usando toLowerCase)
  const [filtrarVacantes, setFiltrarVacantes] = useState("");

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
        limit: 6,
        page: initial ? 1 : page,
      };

      Object.keys(params).forEach(
        (key) => params[key] === "" && delete params[key]
      );

      if (Object.keys(params).length > 0 || initial) {
        const response = await axiosConfig.get("/vacancies", { params });

        if (initial) {
          setVacantes(response.data);
          setPage(1);
        } else {
          setVacantes((prev) => [...prev, ...response.data]);
        }

        if (response.data.length < 6) {
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
    if (!filtrarVacantes) return true;

    const searchTerm = filtrarVacantes.toLowerCase();
    const nombre = (vacancy.nombre || "").toLowerCase();
    const puesto = (vacancy.puesto || "").toLowerCase();
    const ubicacion = (vacancy.ubicacion || "").toLowerCase();
    const modalidad = (vacancy.modalidad || "").toLowerCase();
    const estado = (vacancy.estado || "").toLowerCase();
    const prioridad = (vacancy.prioridad || "").toLowerCase();
    const jornada = (vacancy.jornada || "").toLowerCase();
    const descripcion = (vacancy.descripcion || "").toLowerCase();
    const experiencia = (vacancy.experiencia || "").toLowerCase();

    return (
      nombre.includes(searchTerm) ||
      puesto.includes(searchTerm) ||
      ubicacion.includes(searchTerm) ||
      modalidad.includes(searchTerm) ||
      estado.includes(searchTerm) ||
      prioridad.includes(searchTerm) ||
      jornada.includes(searchTerm) ||
      descripcion.includes(searchTerm) ||
      experiencia.includes(searchTerm)
    );
  });

  return (
    <div className="block lg:hidden">
      <div className="space-y-4 mb-6 border-b border-gray-300 pb-10">
        <div className="flex gap-2">
          <input
            type="text"
            className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ${
              filtrarVacantes ? "border-orange-500" : "focus:ring-blue-500"
            }`}
            value={filtrarVacantes}
            onChange={handleFiltrarChange}
            placeholder="Filtrar vacantes (local)"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ${
              busqueda ? "border-orange-500" : "focus:ring-blue-500"
            }`}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar en servidor"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && page === 1 ? (
          <p className="text-center text-gray-500">Cargando vacantes...</p>
        ) : filtrarData.length > 0 ? (
          filtrarData.map((vacante) => (
            <div
              key={vacante.id}
              onClick={() => handleVerVacante(vacante.id)}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#F88623] mb-3">
                  {vacante.nombre || vacante.puesto || "Vacante sin título"}
                </h3>

                <div className="text-gray-700">
                  <p className="text-sm font-semibold text-[#14599A] mb-1">
                    Ubicación:
                  </p>
                  <p className="text-sm text-gray-600">
                    {vacante.ubicacion ? vacante.ubicacion : "No especificada"}
                  </p>
                </div>

                <div className="text-gray-700 mt-3">
                  <p className="text-sm font-semibold text-[#14599A] mb-1">
                    Experiencia:
                  </p>
                  <p className="text-sm text-gray-600">
                    {vacante.experiencia
                      ? `${vacante.experiencia} años`
                      : "No especificada"}
                  </p>
                </div>
              </div>

              <button className="w-full bg-[#F88623] text-white py-2 rounded-md hover:bg-[#F67518] transition">
                Ver más detalles
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No se encontraron vacantes.
          </p>
        )}
      </div>

      {loading && page > 1 && (
        <div className="flex justify-center my-6">
          <p>Cargando más vacantes...</p>
        </div>
      )}

      {moreAvailable && !loading && filtrarVacantes === "" && (
        <div className="flex justify-center my-6">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-10 rounded-full transition"
            onClick={cargarMasVacantes}
          >
            Cargar más vacantes
          </button>
        </div>
      )}
    </div>
  );
};

export default VacancieCards;
