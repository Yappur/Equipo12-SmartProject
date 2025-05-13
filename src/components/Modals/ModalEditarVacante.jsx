import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LogoCancelar from '../../assets/img/cancelar.png';
import axiosConfig from '@/helpers/axios.config';
const opciones = {
    modalidad: ["presencial", "remoto", "híbrido"],
    prioridad: ["alta", "media", "baja"],
    jornada: ["completa", "medio_tiempo"],
    estado: ["abierta", "cerrada", "pausa"]
};

const ModalEditarVacante = ({ isOpen, onClose, vacancy, refreshVacancies }) => {
    const [formData, setFormData] = useState({
        puesto: '',
        ubicacion: '',
        modalidad: '',
        prioridad: '',
        jornada: '',
        estado: '',
        experiencia: '',
        descripcion: '',
        responsabilidades: ''
    });

    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        if (vacancy) {
            setFormData({
                puesto: vacancy.puesto || '',
                ubicacion: vacancy.ubicacion || '',
                modalidad: vacancy.modalidad || '',
                prioridad: vacancy.prioridad || '',
                jornada: vacancy.jornada || '',
                estado: vacancy.estado || '',
                experiencia: vacancy.experiencia || '',
                descripcion: vacancy.descripcion || '',
                responsabilidades: vacancy.responsabilidades || ''
            });
        }
    }, [vacancy]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await axiosConfig.patch(`/vacancies/${vacancy.id}`, formData);
            toast.success('Vacante actualizada correctamente');
            refreshVacancies();
            onClose();
        } catch (error) {
            toast.error('Error al actualizar la vacante');
            console.error(error.message);
        }
    };

    const handleCancel = () => {
        setShowCancelModal(true);
    };

    const confirmCancel = () => {
        setShowCancelModal(false);
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-3xl mt-16 shadow-2xl mb-10">
                <h2 className="text-2xl font-bold mb-4">Editar Vacante</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                        <label className="mb-1 text-lg font-semibold">Puesto*</label>
                        <input
                            type="text"
                            name="puesto"
                            value={formData.puesto}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC]"
                        />
                    </div>
                    <div>
                        <label className="mb-1 text-lg font-semibold">Ubicación*</label>
                        <input
                            type="text"
                            name="ubicacion"
                            value={formData.ubicacion}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC]"
                        />
                    </div>
                    <div>
                        <label className="mb-1 text-lg font-semibold">Modalidad*</label>
                        <select
                            name="modalidad"
                            value={formData.modalidad}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC]"
                        >
                            {opciones.modalidad.map((mod) => (
                                <option key={mod} value={mod}>
                                    {mod}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 text-lg font-semibold">Prioridad*</label>
                        <select
                            name="prioridad"
                            value={formData.prioridad}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC]"
                        >
                            {opciones.prioridad.map((pri) => (
                                <option key={pri} value={pri}>
                                    {pri}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 text-lg font-semibold">Jornada*</label>
                        <select
                            name="jornada"
                            value={formData.jornada}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC]"
                        >
                            {opciones.jornada.map((jor) => (
                                <option key={jor} value={jor}>
                                    {jor}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 text-lg font-semibold">Estado*</label>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC]"
                        >
                            {opciones.estado.map((est) => (
                                <option key={est} value={est}>
                                    {est}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 text-lg font-semibold">Experiencia</label>
                        <input
                            type="text"
                            name="experiencia"
                            value={formData.experiencia}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC]"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="mb-1 text-lg font-semibold">Descripción*</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC] h-32"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="mb-1 text-lg font-semibold">Responsabilidades*</label>
                        <textarea
                            name="responsabilidades"
                            value={formData.responsabilidades}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full bg-[#F5F2EC] h-32"
                        />
                    </div>
                </form>
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={handleCancel}
                        className="bg-white text-black border border-black px-4 py-2 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-950 text-white px-4 py-2 rounded-md"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>

            {showCancelModal && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 text-center flex flex-col items-center">
                        <div className="text-red-600 text-5xl mb-4 bg-red-400/30 rounded-full p-4"><img src={LogoCancelar} alt="Logo de cancelar" /></div>
                        <p className="text-lg mb-6">¿Desea descartar los cambios?</p>
                        <div className="flex justify-around gap-x-5">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="border px-4 py-2 rounded-md"
                            >
                                Volver
                            </button>
                            <button
                                onClick={confirmCancel}
                                className="bg-blue-950 text-white px-4 py-2 rounded-md"
                            >
                                Descartar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : null;
};

export default ModalEditarVacante;