import { useEffect, useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import axiosConfig from "../../helpers/axios.config";
import { FaChevronDown } from "react-icons/fa";
import Modal from "../Modals/Modal";

const UserActiveTable = () => {
  const [usersActive, setUserActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  const openChangeStatusModal = (user, status) => {
    setSelectedUser(user);
    setNewStatus(status);
    setChangeStatusModal(true);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setSuccessModal(true);
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosConfig.get("/users");

      if (response.data && Array.isArray(response.data)) {
        setUserActive(
          response.data.slice(0, 4).map((user) => ({
            ...user,
            estado: user.estado || "Activo",
          }))
        );
      } else if (response.data && Array.isArray(response.data.users)) {
        setUserActive(
          response.data.users.slice(0, 4).map((user) => ({
            ...user,
            estado: user.estado || "Activo",
          }))
        );
      } else {
        setUserActive([]);
        setError("No se pudieron cargar los datos correctamente");
      }
    } catch (error) {
      setError("Error al cargar los usuarios. Intente nuevamente.");
      setUserActive([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async () => {
    try {
      await axiosConfig.patch(`/users/${selectedUser.uid}/status`, {
        status: newStatus,
      });
      getUsers();
      setChangeStatusModal(false);
      showSuccessMessage(
        `El estado de ${selectedUser.displayName} ha sido actualizado a ${newStatus} correctamente`
      );
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={obtenerUsuarios}
            className="ml-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <Loader text={"Cargando usuarios activos..."} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-black">Usuarios Activos</h2>
            <Link
              to="/admin/panelUsuarios"
              className="text-sm text-gray-500 hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="border-t border-gray-200">
            {usersActive.map((user) => (
              <div
                key={user.id}
                className="flex items-center py-4 border-b border-gray-200"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-20 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="font-medium text-[#00254B]">
                    {user.displayName}
                  </div>
                </div>
                <div className="flex-shrink-0 w-30 text-black capitalize">
                  {user.role}
                </div>
                <div className="flex-shrink-0 w-16 text-black">
                  {formatMonthYear(user.createdAt)}
                </div>
                <div className="flex-shrink-0 ml-4">
                  <button className="flex items-center px-3 py-1 rounded-full">
                    <div
                      className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer ${
                        user.estado === "Activo"
                          ? "bg-[#ADDFC4] text-black"
                          : "bg-[#d8e9ff] text-black"
                      }`}
                      onClick={() =>
                        openChangeStatusModal(
                          user,
                          user.estado === "Activo" ? "Inactivo" : "Activo"
                        )
                      }
                    >
                      {user.estado}{" "}
                      <FaChevronDown className="inline ml-1 text-xs" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
            <Modal
              isOpen={changeStatusModal}
              onClose={() => setChangeStatusModal(false)}
              tipo="confirm"
              titulo="Cambiar Estado de Usuario"
              mensaje={`¿Estás seguro de cambiar el estado de ${
                selectedUser?.displayName || ""
              } a ${newStatus}?`}
              btnPrimario="Confirmar Cambio"
              btnSecundario="Cancelar"
              accionPrimaria={handleChangeStatus}
            />

            <Modal
              isOpen={successModal}
              onClose={() => setSuccessModal(false)}
              tipo="success"
              titulo="El cambio se realizo con exito"
              mensaje={successMessage}
              btnPrimario="Aceptar"
              accionPrimaria={() => setSuccessModal(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserActiveTable;
