import React, { useState, useEffect } from "react";
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
        formState: { errors: errorsPerfil }
    } = useForm({
        defaultValues: {
            nombre: "",
            telefono: "",
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
            passwordNueva: "",
            passwordConfirmacion: ""
        }
    });

    const watchNuevaPassword = watchSeguridad("passwordNueva");

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

                setValue("nombre", response.data.displayName || "");
                setValue("email", response.data.email || "");
                setValue("telefono", response.data.phoneNumber || "");
                setValue("rol", response.data.role || "");

            } catch (err) {
                console.error("Error al obtener datos del usuario:", err);
                setError("Error al cargar los datos del usuario. Asegúrate de haber iniciado sesión correctamente.");
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

            await axiosConfig.patch(`/users/${uid}`, {
                email: data.email,
                nombre: data.nombre,
                telefono: data.telefono || ""
            });
            
            alert("Perfil actualizado correctamente");

            setUserData(prevData => ({
                ...prevData,
                displayName: data.nombre,
                phoneNumber: data.telefono || prevData.phoneNumber
            }));

        } catch (err) {
            console.error("Error al actualizar el perfil:", err);
            setError("Error al actualizar el perfil. Verifica que hayas iniciado sesión.");
        } finally {
            setLoading(false);
        }

        const uid = user.uid;
        const response = await axiosConfig.get(`/users/${uid}`);
        setUserData(response.data);

        setValue("nombre", response.data.displayName || "");
        setValue("email", response.data.email || "");
        setValue(
          "telefono",
          response.data.phoneNumber !== "No disponible"
            ? response.data.phoneNumber
            : ""
        );
        setValue("rol", response.data.role || "");
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
        displayName: data.nombre,
      };

      if (data.telefono) {
        updateData.phoneNumber = data.telefono;
      }

      await axiosConfig.put(`/users/${uid}`, updateData);
      alert("Perfil actualizado correctamente");

      setUserData((prevData) => ({
        ...prevData,
        displayName: data.nombre,
        phoneNumber: data.telefono || prevData.phoneNumber,
      }));
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      setError(
        "Error al actualizar el perfil. Verifica que hayas iniciado sesión."
      );
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


            await axiosConfig.patch(`/users/${uid}/password`, {
                password: data.passwordNueva
            });

      await axiosConfig.patch(`/users/${uid}/password`, {
        oldPassword: data.passwordActual,
        newPassword: data.passwordNueva,
      });


            document.getElementById("passwordNueva").value = "";
            document.getElementById("passwordConfirmacion").value = "";

      document.getElementById("passwordActual").value = "";
      document.getElementById("passwordNueva").value = "";
      document.getElementById("passwordConfirmacion").value = "";
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
                            ${
                              activeTab === "perfil"
                                ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
          >
            Mi perfil
          </button>
          <button
            onClick={() => setActiveTab("seguridad")}
            className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors duration-200 focus:outline-none
                            ${
                              activeTab === "seguridad"
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
                    htmlFor="nombre"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nombre y apellido
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    {...registerPerfil("nombre", {
                      required: "El nombre y apellido es obligatorio",
                      minLength: {
                        value: 4,
                        message: "El nombre debe tener al menos 4 caracteres",
                      },
                    })}
                    className={`border ${
                      errorsPerfil.nombre ? "border-red-500" : "border-gray-300"
                    } rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Escribe tu nombre y apellido"
                  />
                  {errorsPerfil.nombre && (
                    <span className="text-red-500 text-xs mt-1">
                      {errorsPerfil.nombre.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="telefono"
                    className="text-sm font-medium text-gray-700"
                  >
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    {...registerPerfil("telefono", {
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Ingrese un número válido de 10 dígitos",
                      },
                    })}
                    className={`border ${
                      errorsPerfil.telefono
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Escribe tu número de teléfono"
                  />
                  {errorsPerfil.telefono && (
                    <span className="text-red-500 text-xs mt-1">
                      {errorsPerfil.telefono.message}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {userData?.displayName}
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
                                            }
                                        })}
                                        className={`border ${errorsPerfil.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
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
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Ingrese un número válido de 10 dígitos"
                                            }
                                        })}
                                        className={`border ${errorsPerfil.telefono ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                                        placeholder="Escribe tu número de teléfono"
                                    />
                                    {errorsPerfil.telefono && <span className="text-red-500 text-xs mt-1">{errorsPerfil.telefono.message}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...registerPerfil("email")}
                                        className="border border-gray-300 rounded-md p-2 bg-gray-100"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500">El correo no puede ser modificado</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="rol" className="text-sm font-medium text-gray-700">Rol</label>
                                    <input
                                        type="text"
                                        id="rol"
                                        {...registerPerfil("rol")}
                                        className="border border-gray-300 rounded-md p-2 bg-gray-100"
                                        disabled
                                    />
                                    <p className="text-xs text-gray-500">El rol no puede ser modificado</p>
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
                                    {loading ? 'Guardando...' : 'Guardar'}
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
                                    <label htmlFor="passwordNueva" className="text-sm font-medium text-gray-700">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        id="passwordNueva"
                                        {...registerSeguridad("passwordNueva", {
                                            required: "La nueva contraseña es obligatoria",
                                            minLength: {
                                                value: 5,
                                                message: "La contraseña debe tener al menos 5 caracteres"
                                            }
                                        })}
                                        className={`border ${errorsSeguridad.passwordNueva ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
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
                                        className={`border ${errorsSeguridad.passwordConfirmacion ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                                        placeholder="Confirma tu nueva contraseña"
                                    />
                                    {errorsSeguridad.passwordConfirmacion && <span className="text-red-500 text-xs mt-1">{errorsSeguridad.passwordConfirmacion.message}</span>}
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
                                    {loading ? 'Actualizando...' : 'Cambiar contraseña'}
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
