import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";

const VacancieTable = ({ isPublic = false }) => {
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [page, setPage] = useState(1);
  const [ubicaciones, setUbicaciones] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState("");
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
        limit: 3, // Límite por página
        page: initial ? 1 : page, // Si es un primer load, página 1; si no, la actual
      };

      // ✅ Eliminar parámetros vacíos
      Object.keys(params).forEach(
        (key) => params[key] === "" && delete params[key]
      );

      // 🚀 Solo hacer la petición si hay filtros o es la carga inicial
      if (Object.keys(params).length > 0 || initial) {
        const response = await axiosConfig.get("/vacancies", { params });

        if (initial) {
          setVacantes(response.data); // Si es la primera carga, reemplaza
        } else {
          setVacantes((prev) => [...prev, ...response.data]); // Si es carga adicional, concatena
        }

        // ✅ Validar si hay más para cargar
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

  // ✅ Función para cargar más vacantes
  const cargarMasVacantes = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      obtenerVacantes(false);
    }
  }, [page]);

  useEffect(() => {
    const obtenerUbicaciones = async () => {
      try {
        const response = await axiosConfig.get("/vacancies", {
          params: { limit: 1000, page: 1 }, // Traer un límite alto para listar todas
        });

        // Extraemos las ubicaciones únicas
        const ubicacionesUnicas = [
          ...new Set(response.data.map((vacante) => vacante.ubicacion)),
        ];

        setUbicaciones(ubicacionesUnicas);
      } catch (error) {
        console.error("Error al cargar ubicaciones:", error.message);
      }
    };

    obtenerUbicaciones();
    obtenerVacantes(true);
  }, []);

  const handleVerVacante = (id) => {
    navigate(`/ver/vacante/${id}`);
  };

  return (
    <section className="hidden lg:block">
      <div className="space-y-4 mb-6 border-b border-gray-300 pb-10 ">
        {/* Filtro principal: Buscar y Botón */}
        <div className="flex gap-2">
          <input
            type="text"
            className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ${
              busqueda ? "border-orange-500" : "focus:ring-blue-500"
            }`}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ingresar palabra clave"
          />
          <button
            className={`text-center bg-orange-400 hover:bg-orange-500 text-white rounded-md px-6 py-2 ${
              busqueda ? "bg-orange-500" : ""
            }`}
            onClick={obtenerVacantes}
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
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-10">
                Cargando vacantes...
              </td>
            </tr>
          ) : vacantes.length > 0 ? (
            vacantes.map((vacante) => (
              <tr
                key={vacante.id}
                onClick={() => handleVerVacante(vacante.id)}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <td className="py-3 px-6 font-semibold ">
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
              <td colSpan="6" className="text-center py-10">
                No se encontraron vacantes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
