import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
                limit: 6,   // Límite por página
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

    useEffect(() => {
        const obtenerUbicaciones = async () => {
            try {
                const response = await axiosConfig.get("/vacancies", {
                    params: { limit: 1000, page: 1 },
                });

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

    const limpiarFiltros = () => {
        setBusqueda("");
        setModalidad("");
        setUbicacion("");
        setEstado("");
        setPrioridad("");
        obtenerVacantes(true);
    };

    return (
<div className="block lg:hidden">
    <div className="space-y-4 mb-6 border-b border-gray-300 pb-10">
        <div className="flex gap-2">
            <input
                type="text"
                className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 ${busqueda ? "border-orange-500" : "focus:ring-blue-500"
                    }`}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Ingresar palabra clave"
            />
            <button
                className={`text-center bg-orange-400 hover:bg-orange-500 text-white rounded-md px-6 py-2 ${busqueda ? "bg-orange-500" : ""
                    }`}
                onClick={obtenerVacantes}
            >
                Buscar
            </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <select
                className="border rounded-md px-4 py-2 w-full bg-white hover:border-orange-500"
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
            >
                <option value="">Modalidad</option>
                <option value="presencial">Presencial</option>
                <option value="remoto">Remoto</option>
                <option value="híbrido">Híbrido</option>
            </select>

            <select
                className="border rounded-md px-4 py-2 w-full bg-white hover:border-orange-500"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
            >
                <option value="">Ubicación</option>
                {ubicaciones.map((ubic, index) => (
                    <option key={index} value={ubic}>
                        {ubic}
                    </option>
                ))}
            </select>

            <select
                className="border rounded-md px-4 py-2 w-full bg-white hover:border-orange-500"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            >
                <option value="">Estado</option>
                <option value="activo">Activo</option>
                <option value="pausado">Pausado</option>
                <option value="borrador">Borrador</option>
                <option value="terminado">Terminado</option>
                <option value="cancelado">Cancelado</option>
            </select>

            <select
                className="border rounded-md px-4 py-2 w-full bg-white hover:border-orange-500"
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value)}
            >
                <option value="">Prioridad</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>

            <button
                className="bg-gray-400 hover:bg-gray-500 text-white rounded-md px-6 py-2 flex items-center justify-center"
                onClick={limpiarFiltros}
            >
                Limpiar
            </button>
        </div>
    </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {loading ? (
        <p className="text-center text-gray-500">Cargando vacantes...</p>
    ) : vacantes.length > 0 ? (
        vacantes.map((vacante) => (
            <div
                key={vacante.id}
                onClick={() => handleVerVacante(vacante.id)}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
            >
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#F88623] mb-3">
                        {vacante.nombre ? vacante.nombre : "Vacante sin título"}
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
                            {vacante.experiencia ? `${vacante.experiencia} años` : "No especificada"}
                        </p>
                    </div>
                </div>

                <button className="w-full bg-[#F88623] text-white py-2 rounded-md hover:bg-[#F67518] transition">
                    Ver más detalles
                </button>
            </div>
        ))
    ) : (
        <p className="text-center text-gray-500">No se encontraron vacantes.</p>
    )}
</div>



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
</div>

    );
};

export default VacancieCards;
