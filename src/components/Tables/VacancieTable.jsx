import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";

const VacancieTable = ({ isPublic = false }) => {
    const [vacantesIniciales, setVacantesIniciales] = useState([]);
    const [vacantes, setVacantes] = useState([]);

    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();

    const obtenerVacantes = async () => {
        try {
            const response = await axiosConfig.get("/vacancies");
            setVacantesIniciales(response.data);
            setVacantes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerVacantes();
    }, []);

    const handleVerVacante = (id) => {
        navigate(`/ver/vacante/${id}`);
    };

    const buscarVacante = () => {
        if (busqueda !== "") {
            const filtro = vacantesIniciales.filter((vacante) =>
                vacante.nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
            setVacantes(filtro);
        } else {
            setVacantes(vacantesIniciales);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="col-span-1 md:col-span-3">
                    <input
                        type="text"
                        className="form-control border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Tu texto aquí"
                    />
                </div>
                <Link
                    href="#"
                    className="text-center bg-orange-400 hover:bg-orange-500 text-white rounded-full px-6 py-2"
                    onClick={buscarVacante}
                >
                    Buscar
                </Link>
            </div>
            <table className="min-w-full bg-white rounded-2xl overflow-hidden">
                <thead>
                    <tr className="text-left text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6">Nombre</th>
                        <th className="py-3 px-6">Descripción</th>
                        <th className="py-3 px-6">Fecha</th>
                        <th className="py-3 px-6">Modalidad</th>
                        {!isPublic && <th className="py-3 px-6">Acciones</th>}
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {vacantes.map((vacante) => (
                        <tr
                            key={vacante.id}
                            className="hover:bg-gray-50 transition cursor-pointer"
                            onClick={() => isPublic && handleVerVacante(vacante.id)} // solo para modo público
                        >
                            <td className="py-3 px-6 font-semibold">{vacante.nombre}</td>
                            <td className="py-3 px-6 max-w-xs truncate">{vacante.descripcion}</td>
                            <td className="py-3 px-6 max-w-xs truncate">{new Date(vacante.fecha).toLocaleDateString('es-ES')}</td>
                            <td className="py-3 px-6 max-w-xs capitalize">{vacante.modalidad || '-'}</td>
                            {!isPublic && (
                                <td className="py-3 px-6">
                                    <button
                                        onClick={() => handleVerVacante(vacante.id)}
                                        className="bg-transparent border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-50 transition text-sm"
                                    >
                                        Ver oferta
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default VacancieTable;