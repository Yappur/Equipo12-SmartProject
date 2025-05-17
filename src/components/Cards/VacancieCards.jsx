import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";

const VacancieCards = ({ isPublic = false }) => {
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [page, setPage] = useState(1);
  const [filtrarVacantes, setFiltrarVacantes] = useState("");

  // Estados para los filtros (igual que en VacancieTable)
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
        limit: 6, // Mantenemos el límite de 6 para las cards
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

        // Validar si hay más para cargar
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
    const experiencia = (vacancy.experiencia || "").toLowerCase();

    return (
      puesto.includes(searchTerm) ||
      ubicacion.includes(searchTerm) ||
      modalidad.includes(searchTerm) ||
      estado.includes(searchTerm) ||
      prioridad.includes(searchTerm) ||
      jornada.includes(searchTerm) ||
      nombre.includes(searchTerm) ||
      descripcion.includes(searchTerm) ||
      experiencia.includes(searchTerm)
    );
  });

  return (
    <div className="block lg:hidden">
      {/* Barra de búsqueda con el mismo estilo que la tabla */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-8">
          <input
            className="border border-gray-400 bg-[#fff8f1] rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2"
            value={filtrarVacantes}
            onChange={handleFiltrarChange}
            placeholder="- Ingresar palabra clave -"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {loading && page === 1 ? (
          <div className="col-span-full text-center py-10">
            Cargando vacantes...
          </div>
        ) : filtrarData.length > 0 ? (
          filtrarData.map((vacante) => (
            <div
              key={vacante.id}
              onClick={() => handleVerVacante(vacante.id)}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-[#F88623] mb-4">
                {vacante.nombre || vacante.puesto || "Vacante sin título"}
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-[#14599A]">
                    Experiencia:
                  </p>
                  <p className="text-sm text-gray-600">
                    {vacante.experiencia || "Sin descripción"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#14599A]">Fecha:</p>
                  <p className="text-sm text-gray-600">
                    {vacante.fecha
                      ? new Date(vacante.fecha).toLocaleDateString("es-ES")
                      : "Sin fecha registrada"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#14599A]">
                    Ubicación:
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    {vacante.ubicacion || "Sin ubicación"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#14599A]">
                    Modalidad:
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    {vacante.modalidad || "Sin modalidad"}
                  </p>
                </div>
              </div>

              <button className="w-full bg-[#F88623] text-white py-2 rounded-md hover:bg-orange-500 transition mt-4">
                Ver más detalles
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            No se encontraron vacantes.
          </div>
        )}
      </div>

      {loading && page > 1 && (
        <div className="flex justify-center my-6">
          <p>Cargando más vacantes...</p>
        </div>
      )}

      {moreAvailable && !loading && (
        <div className="flex justify-center my-8">
          <button
            className="w-full max-w-6xl mx-auto bg-[#F88623] hover:bg-orange-500 text-white font-semibold py-3 px-10 rounded-full transition"
            onClick={cargarMasVacantes}
          >
            Ver todas las vacantes activas
          </button>
        </div>
      )}
    </div>
  );
};

export default VacancieCards;
