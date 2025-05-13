import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosConfig from "@/helpers/axios.config";
import { getAuth, updateProfile } from "firebase/auth";
import { uploadProfileImage } from "@/firebase/Upload/uploadProfileImage";
import { useAuth } from "@/context/AuthContext";

const Perfil = () => {
    const [activeTab, setActiveTab] = useState("perfil");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef(null);
    const { updateProfileImage, isAuthenticated, idUser, loading: authLoading } = useAuth();

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
                if (authLoading) return;

                if (!isAuthenticated) {
                    throw new Error("Usuario no autenticado");
                }

                setLoading(true);

                const auth = getAuth();
                const user = auth.currentUser;
                let uid;

                if (user) {
                    uid = user.uid;
                } else if (idUser && idUser.uid) {
                    uid = idUser.uid;
                } else {
                    try {
                        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
                        if (token) {
                            const { data } = await axiosConfig.post("/auth/verify-token", { idToken: token });
                            uid = data.uid;
                        } else {
                            throw new Error("No se pudo determinar el ID del usuario");
                        }
                    } catch (tokenError) {
                        console.error("Error al verificar el token:", tokenError);
                        throw new Error("Error al verificar el token");
                    }
                }

                const response = await axiosConfig.get(`/users/${uid}`);
                setUserData(response.data);

                setValue("displayName", response.data.displayName || "");
                setValue("email", response.data.email || "");
                setValue("phoneNumber", response.data.phoneNumber || "");
                setValue("role", response.data.role || "");

                if (user && response.data.photoURL && !user.photoURL) {
                    await updateProfile(user, {
                        photoURL: response.data.photoURL
                    });

                    if (typeof updateProfileImage === 'function') {
                        updateProfileImage(response.data.photoURL);
                    }
                }
            } catch (err) {
                console.error("Error al obtener datos del usuario:", err);
                toast.error("Error al cargar los datos del usuario. Asegúrate de haber iniciado sesión correctamente.");
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchUserData();
        }
    }, [setValue, updateProfileImage, isAuthenticated, authLoading, idUser]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            if (!file.type.startsWith('image/')) {
                toast.error("El archivo debe ser una imagen");
                return;
            }

            setUploadingImage(true);
            setError(null);

            const photoURL = await uploadProfileImage(file);

            const auth = getAuth();
            const user = auth.currentUser;
            let uid;

            if (user) {
                uid = user.uid;
                await updateProfile(user, {
                    photoURL
                });
            } else if (idUser && idUser.uid) {
                uid = idUser.uid;
            } else {
                throw new Error("No se pudo determinar el ID del usuario");
            }

            await axiosConfig.patch(`/users/${uid}`, {
                photoURL
            });

            if (typeof updateProfileImage === 'function') {
                updateProfileImage(photoURL);
            }

            setUserData(prevData => ({
                ...prevData,
                photoURL
            }));

            toast.success("Foto de perfil actualizada correctamente");
        } catch (err) {
            console.error("Error al subir la imagen:", err);
            toast.error("Error al actualizar la foto de perfil");
        } finally {
            setUploadingImage(false);
        }
    };

    const onSubmitPerfil = async (data) => {
        try {
            setLoading(true);

            const auth = getAuth();
            const user = auth.currentUser;
            let uid;

            if (user) {
                uid = user.uid;
            } else if (idUser && idUser.uid) {
                uid = idUser.uid;
            } else {
                throw new Error("No se pudo determinar el ID del usuario");
            }

            const updateData = {
                displayName: data.displayName,
                phoneNumber: data.phoneNumber || "",
                email: userData.email,
                photoURL: userData.photoURL || ""
            };

            await axiosConfig.patch(`/users/${uid}`, updateData);

            toast.success("Perfil actualizado correctamente");

            setUserData((prevData) => ({
                ...prevData,
                displayName: data.displayName,
                phoneNumber: data.phoneNumber || prevData.phoneNumber,
            }));
        } catch (err) {
            console.error("Error al actualizar el perfil:", err);

            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Error al actualizar el perfil");
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
            let uid;

            if (user) {
                uid = user.uid;
            } else if (idUser && idUser.uid) {
                uid = idUser.uid;
            } else {
                throw new Error("No se pudo determinar el ID del usuario");
            }

            await axiosConfig.patch(`/users/${uid}/password`, {
                password: data.password,
            });

            document.getElementById("password").value = "";
            document.getElementById("passwordConfirmacion").value = "";

            toast.success("Contraseña actualizada correctamente");
        } catch (err) {
            console.error("Error al cambiar la contraseña:", err);

            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Error al cambiar la contraseña");
            }
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="pt-16 flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="ml-2">Verificando autenticación...</span>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="pt-16 flex flex-col items-center justify-center h-screen">
                <div className="text-red-500 text-xl mb-4">
                    No has iniciado sesión o tu sesión ha expirado
                </div>
                <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Iniciar sesión
                </a>
            </div>
        );
    }

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

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3 flex flex-col items-center">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />

                    <div
                        className="mb-4 relative cursor-pointer group"
                        onClick={handleImageClick}
                    >
                        {userData?.photoURL ? (
                            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
                                <img
                                    src={userData.photoURL}
                                    alt="Foto de perfil"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                                    <FaCamera className="text-white text-2xl" />
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <FaUserCircle className="text-8xl sm:text-9xl text-blue-600" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity duration-200">
                                    <FaCamera className="text-white text-2xl" />
                                </div>
                            </div>
                        )}

                        {uploadingImage && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white bg-opacity-75 rounded-full p-2">
                                    <div className="w-6 h-6 border-2 border-t-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <h2 className="text-xl font-medium text-center">
                        {userData?.displayName || "Nombre y apellido"}
                    </h2>
                    <p className="text-lg text-center">
                        {userData?.role}
                    </p>
                </div>

                <div className="md:col-span-9">
                    <section className="w-full overflow-hidden">
                        <div className="border-b border-gray-200">
                            <div className="flex justify-start">
                                <button
                                    onClick={() => setActiveTab("perfil")}
                                    className={`py-4 px-6 text-center font-medium text-lg transition-colors duration-200 focus:outline-none
                                        ${activeTab === "perfil"
                                            ? "border-b-4 border-[#f88623] -mb-px"
                                            : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    Mi perfil
                                </button>
                                <button
                                    onClick={() => setActiveTab("seguridad")}
                                    className={`py-4 px-6 text-center font-medium text-lg transition-colors duration-200 focus:outline-none
                                        ${activeTab === "seguridad"
                                            ? "border-b-4 border-[#f88623] -mb-px"
                                            : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    Seguridad
                                </button>
                            </div>
                        </div>

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
                                                className="font-medium text-gray-700"
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
                                                className={`bg-[#f5f2ec] border ${errorsPerfil.displayName ? "border-red-500" : "border-[#f5f2ec]"
                                                    } rounded-md p-3`}
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
                                                className="font-medium text-gray-700"
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
                                                className={`bg-[#f5f2ec] border ${errorsPerfil.phoneNumber
                                                    ? "border-red-500"
                                                    : "border-[#f5f2ec]"
                                                    } rounded-md p-3`}
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
                                                className="font-medium text-gray-700"
                                            >
                                                Correo electrónico
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                {...registerPerfil("email")}
                                                className="bg-[#f5f2ec] border border-[#f5f2ec] rounded-md p-3"
                                                disabled
                                            />
                                            <p className="text-xs text-gray-500">
                                                El correo no puede ser modificado
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label
                                                htmlFor="role"
                                                className="font-medium text-gray-700"
                                            >
                                                Rol
                                            </label>
                                            <input
                                                type="text"
                                                id="role"
                                                {...registerPerfil("role")}
                                                className="bg-[#f5f2ec] border border-[#f5f2ec] rounded-md p-3"
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
                                            className="border border-[#152d53] py-2 px-6 rounded-md hover:bg-gray-200 transition-colors"
                                            onClick={() => window.history.back()}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-[#152d53] text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
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
                                                className="font-medium text-gray-700"
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
                                                className={`bg-[#f5f2ec] border ${errorsSeguridad.password
                                                    ? "border-red-500"
                                                    : "border-[#f5f2ec]"
                                                    } rounded-md p-3`}
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
                                                className="font-medium text-gray-700"
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
                                                className={`bg-[#f5f2ec] border ${errorsSeguridad.passwordConfirmacion
                                                    ? "border-red-500"
                                                    : "border-[#f5f2ec]"
                                                    } rounded-md p-3`}
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
            </div>
        </div>
    );
};

export default Perfil;
