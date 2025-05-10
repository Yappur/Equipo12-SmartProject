import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axiosConfig from "@/helpers/axios.config";
import { getAuth } from "firebase/auth";

const Perfil = () => {
    const [activeTab, setActiveTab] = useState("perfil");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    const {
        register: registerPerfil,
        handleSubmit: handleSubmitPerfil,
        setValue,
        formState: { errors: errorsPerfil },
    } = useForm({
        defaultValues: {
            displayName: "",
            phoneNumber: "",
            email: "",
            role: "",
        },
    });

    const {
        register: registerSeguridad,
        handleSubmit: handleSubmitSeguridad,
        watch: watchSeguridad,
        formState: { errors: errorsSeguridad },
    } = useForm({
        defaultValues: {
            password: "",
            passwordConfirmacion: "",
        },
    });

    const watchPassword = watchSeguridad("password");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const auth = getAuth();
                const user = auth.currentUser;

                if (!user) {
                    throw new Error("Usuario no autenticado");
                }

                const uid = user.uid;
                const response = await axiosConfig.get(`/users/${uid}`);
                setUserData(response.data);

                setValue("displayName", response.data.displayName || "");
                setValue("email", response.data.email || "");
                setValue(
                    "phoneNumber",
                    response.data.phoneNumber || ""
                );
                setValue("role", response.data.role || "");
            } catch (err) {
                console.error("Error al obtener datos del usuario:", err);
                setError(
                    "Error al cargar los datos del usuario. Asegúrate de haber iniciado sesión correctamente."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [setValue]);

    const onSubmitPerfil = async (data) => {
        try {
            setLoading(true);

            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error("Usuario no autenticado");
            }

            const uid = user.uid;

            const updateData = {
                displayName: data.displayName,
                phoneNumber: data.phoneNumber || "",
                email: userData.email,
                photoURL: userData.photoURL || ""
            };

            console.log("Datos a enviar:", updateData);

            await axiosConfig.patch(`/users/${uid}`, updateData);

            alert("Perfil actualizado correctamente");

            setUserData((prevData) => ({
                ...prevData,
                displayName: data.displayName,
                phoneNumber: data.phoneNumber || prevData.phoneNumber,
            }));
        } catch (err) {
            console.error("Error al actualizar el perfil:", err);

            if (err.response) {
                console.log("Respuesta del error:", err.response.data);
                setError(`Error: ${err.response.data.message || JSON.stringify(err.response.data)}`);
            } else {
                setError("Error al actualizar el perfil. El servidor no pudo procesar la solicitud.");
            }
        } finally {
            setLoading(false);
        }
    };

    const onSubmitSeguridad = async (data) => {
        try {
            setLoading(true);

            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error("Usuario no autenticado");
            }

            const uid = user.uid;

            await axiosConfig.patch(`/users/${uid}/password`, {
                password: data.password,
            });

            document.getElementById("password").value = "";
            document.getElementById("passwordConfirmacion").value = "";

            alert("Contraseña actualizada correctamente");
        } catch (err) {
            console.error("Error al cambiar la contraseña:", err);

            if (err.response && err.response.data && err.response.data.message) {
                setError(`Error: ${err.response.data.message}`);
            } else {
                setError("Error al cambiar la contraseña.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading && !userData) {
        return (
            <div className="pt-16 flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="ml-2">Cargando...</span>
            </div>
        );
    }

    return (
        <div className="pt-16 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 sm:py-12">
            {error && (
                <div className="w-full max-w-4xl mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <section className="flex flex-col items-center justify-center mb-8 w-full">
                <div className="mb-4">
                    <FaUserCircle className="text-8xl sm:text-9xl text-blue-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {userData?.displayName || "Nombre y apellido"}
                </h2>
                <p className="text-lg text-gray-600">
                    {userData?.role === "admin" ? "Super Admin" : "Reclutador"}
                </p>
            </section>

            <section className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
                <article className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab("perfil")}
                        className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors duration-200 focus:outline-none
                            ${activeTab === "perfil"
                                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        Mi perfil
                    </button>
                    <button
                        onClick={() => setActiveTab("seguridad")}
                        className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors duration-200 focus:outline-none
                            ${activeTab === "seguridad"
                                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        Seguridad
                    </button>
                </article>

                {activeTab === "perfil" && (
                    <article className="p-6">
                        <form
                            onSubmit={handleSubmitPerfil(onSubmitPerfil)}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="displayName"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Nombre y apellido
                                    </label>
                                    <input
                                        type="text"
                                        id="displayName"
                                        {...registerPerfil("displayName", {
                                            required: "El nombre y apellido es obligatorio",
                                            validate: value => {
                                                const words = value.trim().split(/\s+/);
                                                if (words.length < 2) {
                                                    return "Debe ingresar nombre y apellido";
                                                }

                                                for (const word of words) {
                                                    if (word.length < 2) {
                                                        return "El nombre y apellido debe tener al menos 2 caracteres";
                                                    }
                                                }
                                                return true;
                                            }
                                        })}
                                        className={`border ${errorsPerfil.displayName ? "border-red-500" : "border-gray-300"
                                            } rounded-md p-2`}
                                        placeholder="Escribe tu nombre y apellido"
                                    />
                                    {errorsPerfil.displayName && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errorsPerfil.displayName.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="phoneNumber"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Número de teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        {...registerPerfil("phoneNumber", {
                                            pattern: {
                                                value: /^\+[0-9]{11,}$/,
                                                message: "Ingrese un número de teléfono válido",
                                            },
                                        })}
                                        className={`border ${errorsPerfil.phoneNumber
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } rounded-md p-2`}
                                        placeholder="Ej: +52123456789"
                                    />
                                    {errorsPerfil.phoneNumber && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errorsPerfil.phoneNumber.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...registerPerfil("email")}
                                        className="border border-gray-300 rounded-md p-2 bg-gray-100"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500">
                                        El correo no puede ser modificado
                                    </p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="role"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Rol
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        {...registerPerfil("role")}
                                        className="border border-gray-300 rounded-md p-2 bg-gray-100"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500">
                                        El rol no puede ser modificado
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
                                    onClick={() => window.history.back()}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                                    disabled={loading}
                                >
                                    {loading ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                        </form>
                    </article>
                )}

                {activeTab === "seguridad" && (
                    <article className="p-6">
                        <form
                            onSubmit={handleSubmitSeguridad(onSubmitSeguridad)}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Nueva contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...registerSeguridad("password", {
                                            required: "La nueva contraseña es obligatoria",
                                            minLength: {
                                                value: 5,
                                                message:
                                                    "La contraseña debe tener al menos 5 caracteres",
                                            },
                                        })}
                                        className={`border ${errorsSeguridad.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } rounded-md p-2`}
                                        placeholder="Crea una nueva contraseña"
                                    />
                                    {errorsSeguridad.password && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errorsSeguridad.password.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="passwordConfirmacion"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Confirmar contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="passwordConfirmacion"
                                        {...registerSeguridad("passwordConfirmacion", {
                                            required: "Debes confirmar la contraseña",
                                            validate: (value) =>
                                                value === watchPassword ||
                                                "Las contraseñas no coinciden",
                                        })}
                                        className={`border ${errorsSeguridad.passwordConfirmacion
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } rounded-md p-2`}
                                        placeholder="Confirma tu nueva contraseña"
                                    />
                                    {errorsSeguridad.passwordConfirmacion && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {errorsSeguridad.passwordConfirmacion.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
                                    onClick={() => window.history.back()}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                                    disabled={loading}
                                >
                                    {loading ? "Actualizando..." : "Cambiar contraseña"}
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
