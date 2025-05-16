import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Modal from "../Modals/Modal";
import axiosConfig from "../../helpers/axios.config";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { customStyles, paginationOptions } from "./DashboardsStyles";
import Loader from "../Common/Loader";
import SearchBar from "./SearchBar";
import { showToast } from "../Modals/CustomToaster";
import iconEliminar from "../../assets/img/DesingExports/Eliminar.svg";

const UserTable = () => {
  const [filtrarUsuarios, setFiltrarUsuarios] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // MODALES
  const [deleteModal, setDeleteModal] = useState(false);
  const [changeRoleModal, setChangeRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const obtenerUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosConfig.get("/users");

      if (response.data && Array.isArray(response.data)) {
        setUsuarios(response.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        setUsuarios(response.data.users);
      } else {
        setUsuarios([]);
        setError("No se pudieron cargar los datos correctamente");
      }
    } catch (error) {
      setError("Error al cargar los usuarios. Intente nuevamente.");
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const openChangeRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role === "admin" ? "user" : "admin");
    setChangeRoleModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosConfig.delete(`/users/${selectedUser.uid}`);
      obtenerUsuarios();
      setDeleteModal(false);
      showToast(`Usuario eliminado exitosamente.`, "success");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleChangeRole = async () => {
    try {
      await axiosConfig.patch(`/users/${selectedUser.uid}/role`, {
        role: newRole,
      });
      obtenerUsuarios();
      setChangeRoleModal(false);
      showToast("Tus cambios se guardaron exitosamente.", "success");
    } catch (error) {
      console.error("Error al cambiar el rol del usuario:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "No disponible";
    const date = new Date(timestamp);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.displayName,
      sortable: true,
    },
    {
      name: "Rol",
      cell: (row) => {
        const roles = ["user", "admin"];

        const colorClass =
          row.role === "user"
            ? "bg-[#fcffd2] text-gray-800"
            : "bg-[#d8e9ff] text-gray-800";

        const displayName = {
          user: "Reclutador",
          admin: "Supervisor",
        };

        return (
          <select
            value={row.role}
            onChange={(e) => openChangeRoleModal(row, e.target.value)}
            className={`text-sm font-medium rounded-4xl px-2 py-1 ${colorClass}`}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {displayName[role]}
              </option>
            ))}
          </select>
        );
      },
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => {
        const telefono = row.phoneNumber;
        const mostrar =
          !telefono || telefono.toLowerCase() === "no disponible"
            ? "Sin Número"
            : telefono;

        return (
          <span
            className={mostrar === "Sin Número" ? "text-red-500 italic" : ""}
          >
            {mostrar}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => formatDate(row.createdAt),
      sortable: true,
    },

    {
      name: "Eliminar",
      cell: (row) => (
        <div className=" mx-7.5 flex justify-center items-center">
          <img
            src={iconEliminar}
            onClick={() => openDeleteModal(row)}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            alt="Eliminar"
          />
        </div>
      ),
    },
  ];

  const filtrarData = usuarios.filter((user) => {
    const searchTerm = filtrarUsuarios.toLowerCase();
    const nombre = (user.fullName || "").toLowerCase();
    const correo = (user.email || "").toLowerCase();
    const telefono = (user.phoneNumber || "").toLowerCase();

    return (
      nombre.includes(searchTerm) ||
      correo.includes(searchTerm) ||
      telefono.includes(searchTerm)
    );
  });

  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-medium text-[#152D53] ">Usuarios</h1>
        <Link
          to={"/admin/crear/usuario"}
          className="bg-[#152D53] hover:bg-[#0c1b33] text-white py-2 px-4 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Crear usuario
        </Link>
      </div>

      <SearchBar
        value={filtrarUsuarios}
        onChange={setFiltrarUsuarios}
        disabled={loading}
      />

      <div>
        <p className="text-gray-500 text-sm mb-3">
          Número de usuarios encontrados: {filtrarData.length}
        </p>
      </div>

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
        <Loader text={"Cargando usuarios..."} />
      ) : (
        <DataTable
          columns={columns}
          data={filtrarData}
          pagination
          pointerOnHover
          responsive
          paginationComponentOptions={paginationOptions}
          customStyles={customStyles}
          noDataComponent="No hay usuarios disponibles"
          progressPending={loading}
          sortIcon={<FaChevronDown size={10} />}
        />
      )}

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        tipo="delete"
        titulo="Eliminar Usuario"
        mensaje={`¿Estás seguro de que deseas eliminar al usuario ${
          selectedUser?.displayName || ""
        }? Esta acción no se puede deshacer.`}
        btnPrimario="Sí, eliminar"
        btnSecundario="Cancelar"
        accionPrimaria={handleDelete}
      />

      <Modal
        isOpen={changeRoleModal}
        onClose={() => setChangeRoleModal(false)}
        tipo="confirm"
        titulo="Cambiar Rol de Usuario"
        mensaje={`¿Estás seguro de cambiar el rol de ${
          selectedUser?.displayName || ""
        } a ${newRole === "admin" ? "Supervisor" : "Reclutador"}?`}
        btnPrimario="Si, Confirmar"
        btnSecundario="Cancelar"
        accionPrimaria={handleChangeRole}
      />
    </div>
  );
};

export default UserTable;
