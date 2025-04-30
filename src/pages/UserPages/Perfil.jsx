import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Perfil = () => {
    const [activeTab, setActiveTab] = useState("perfil");

    const {
        register: registerPerfil,
        handleSubmit: handleSubmitPerfil,
        formState: { errors: errorsPerfil }
    } = useForm({
        defaultValues: {
            nombre: "",
            telefono: "",
            fechadenacimiento: "",
            email: "",
            rol: ""
        }
    });

    const {
        register: registerSeguridad,
        handleSubmit: handleSubmitSeguridad,
        watch: watchSeguridad,
        formState: { errors: errorsSeguridad }
    } = useForm({
        defaultValues: {
            passwordActual: "",
            passwordNueva: "",
            passwordConfirmacion: ""
        }
    });

    const watchNuevaPassword = watchSeguridad("passwordNueva");

    // Manejar envío del formulario de perfil
    const onSubmitPerfil = (data) => {
        console.log("Datos del perfil:", data);
        // Aquí iría la lógica para enviar los datos al backend
    };

    // Manejar envío del formulario de seguridad
    const onSubmitSeguridad = (data) => {
        console.log("Datos de seguridad:", data);
        // Aquí iría la lógica para cambiar la contraseña
    };

    return (
        <div className="pt-16 flex flex-col items-center justify-center w-full min-h-[100vh] px-4 sm:px-6 py-8 sm:py-12">

            <section className="flex flex-col items-center justify-center mb-8 w-full">
                <div className="mb-4">
                    <FaUserCircle className="text-8xl sm:text-9xl" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Nombre y apellido</h2>
                <p className="text-lg text-gray-600">Ingeniero de Software</p>
            </section>

            <section className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
                <article className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("perfil")}
                        className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors duration-200 focus:outline-none
                            ${activeTab === "perfil" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        Mi perfil
                    </button>
                    <button
                        onClick={() => setActiveTab("seguridad")}
                        className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors duration-200 focus:outline-none
                            ${activeTab === "seguridad" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        Seguridad
                    </button>
                </article>

                {activeTab === "perfil" && (
                    <article className="p-6">
                        <form onSubmit={handleSubmitPerfil(onSubmitPerfil)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre y apellido</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        {...registerPerfil("nombre", {
                                            required: "El nombre y apellido es obligatorio",
                                            minLength: {
                                                value: 4,
                                                message: "El nombre debe tener al menos 4 caracteres"
                                            },
                                            pattern: {
                                                value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
                                                message: "Debe ingresar al menos nombre y apellido"
                                            }
                                        })}
                                        className={`border ${errorsPerfil.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Escribe tu nombre y apellido"
                                    />
                                    {errorsPerfil.nombre && <span className="text-red-500 text-xs mt-1">{errorsPerfil.nombre.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="telefono" className="text-sm font-medium text-gray-700">Número de teléfono</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        {...registerPerfil("telefono", {
                                            required: "El número de teléfono es obligatorio",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Ingrese un número válido de 10 dígitos"
                                            }
                                        })}
                                        className={`border ${errorsPerfil.telefono ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Escribe tu número de teléfono"
                                    />
                                    {errorsPerfil.telefono && <span className="text-red-500 text-xs mt-1">{errorsPerfil.telefono.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="fechadenacimiento" className="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                                    <input
                                        type="date"
                                        id="fechadenacimiento"
                                        {...registerPerfil("fechadenacimiento", {
                                            required: "La fecha de nacimiento es obligatoria"
                                        })}
                                        className={`border ${errorsPerfil.fechadenacimiento ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    />
                                    {errorsPerfil.fechadenacimiento && <span className="text-red-500 text-xs mt-1">{errorsPerfil.fechadenacimiento.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...registerPerfil("email", {
                                            required: "El correo es obligatorio",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Dirección de correo inválida"
                                            }
                                        })}
                                        className={`border ${errorsPerfil.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Escribe tu correo electrónico"
                                    />
                                    {errorsPerfil.email && <span className="text-red-500 text-xs mt-1">{errorsPerfil.email.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="rol" className="text-sm font-medium text-gray-700">Rol</label>
                                    <input
                                        type="text"
                                        id="rol"
                                        {...registerPerfil("rol", {
                                            required: "El rol es obligatorio"
                                        })}
                                        className={`border ${errorsPerfil.rol ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Escribe tu rol"
                                    />
                                    {errorsPerfil.rol && <span className="text-red-500 text-xs mt-1">{errorsPerfil.rol.message}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
                                <button type="button" className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </article>
                )}

                {activeTab === "seguridad" && (
                    <article className="p-6">
                        <form onSubmit={handleSubmitSeguridad(onSubmitSeguridad)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="passwordActual" className="text-sm font-medium text-gray-700">Contraseña actual</label>
                                    <input
                                        type="password"
                                        id="passwordActual"
                                        {...registerSeguridad("passwordActual", {
                                            required: "La contraseña actual es obligatoria",
                                            minLength: {
                                                value: 6,
                                                message: "La contraseña debe tener al menos 6 caracteres"
                                            }
                                        })}
                                        className={`border ${errorsSeguridad.passwordActual ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Ingresa tu contraseña actual"
                                    />
                                    {errorsSeguridad.passwordActual && <span className="text-red-500 text-xs mt-1">{errorsSeguridad.passwordActual.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="passwordNueva" className="text-sm font-medium text-gray-700">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        id="passwordNueva"
                                        {...registerSeguridad("passwordNueva", {
                                            required: "La nueva contraseña es obligatoria",
                                            minLength: {
                                                value: 8,
                                                message: "La contraseña debe tener al menos 8 caracteres"
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                                message: "La contraseña debe incluir mayúsculas, minúsculas y números"
                                            }
                                        })}
                                        className={`border ${errorsSeguridad.passwordNueva ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Crea una nueva contraseña"
                                    />
                                    {errorsSeguridad.passwordNueva && <span className="text-red-500 text-xs mt-1">{errorsSeguridad.passwordNueva.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="passwordConfirmacion" className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
                                    <input
                                        type="password"
                                        id="passwordConfirmacion"
                                        {...registerSeguridad("passwordConfirmacion", {
                                            required: "Debes confirmar la contraseña",
                                            validate: value => value === watchNuevaPassword || "Las contraseñas no coinciden"
                                        })}
                                        className={`border ${errorsSeguridad.passwordConfirmacion ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Confirma tu nueva contraseña"
                                    />
                                    {errorsSeguridad.passwordConfirmacion && <span className="text-red-500 text-xs mt-1">{errorsSeguridad.passwordConfirmacion.message}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
                                <button type="button" className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                                    Cambiar contraseña
                                </button>
                            </div>
                        </form>
                    </article>
                )}
            </section>
        </div>
    );
};

export default Perfil;