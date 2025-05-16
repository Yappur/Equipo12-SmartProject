import { useEffect, useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import axiosConfig from "../../helpers/axios.config";
import { FaChevronDown } from "react-icons/fa";
import Modal from "../Modals/Modal";
import UserIcon from "../../assets/img/user.webp"; // Asegúrate de tener esta imagen en la ruta correcta

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
          response.data.slice(0, 3).map((user) => ({
            ...user,
            estado: user.estado || "Activo",
          }))
        );
      } else if (response.data && Array.isArray(response.data.users)) {
        setUserActive(
          response.data.users.slice(0, 3).map((user) => ({
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
            <h2 className="text-lg text-black">Usuarios</h2>
            <Link
              to="/admin/panelUsuarios"
              className="text-sm text-black hover:underline"
            >
              Ver todos
            </Link>
          </div>
<div className="border-t border-gray-300 mt-4">
  {usersActive.map((user) => (
    <div
      key={user.id}
      className="flex flex-col md:flex-row items-center py-4 border-b border-gray-200 hover:bg-gray-50 transition duration-200"
    >
      {/* Icono o foto de perfil */}
      <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4">
        <img
          className="w-16 h-16 md:w-10 md:h-10 rounded-full object-cover border border-gray-300"
          src={user.photoURL || UserIcon}
          alt="Foto de perfil del usuario"
        />
      </div>

      {/* Información del usuario */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center w-full text-center md:text-left">
        <div className="text-gray-800 font-medium text-lg">
          {user.displayName}
        </div>

        <div className="text-gray-600 text-sm capitalize">
          {user.role === "admin" ? "Supervisor" : "Reclutador"}
        </div>

        <div className="text-gray-500 text-sm">
          {formatMonthYear(user.createdAt)}
        </div>

        <div className="text-gray-500 text-sm truncate">
          {user.email}
        </div>
      </div>
    </div>
  ))}
</div>

        </>
      )}
    </div>
  );
};

export default UserActiveTable;
