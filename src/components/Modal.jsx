import { FaRegCheckCircle, FaRegTrashAlt, FaSave } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
export default function Modal({
  isOpen,
  onClose,
  tipo = "success",
  titulo,
  mensaje,
  btnPrimario = "Aceptar",
  btnSecundario = "Cancelar",
  accionPrimaria,
  accionSecundaria,
}) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (tipo) {
      case "success":
        return <FaRegCheckCircle className="h-12 w-12 text-gray-500" />;
      case "error":
        return <RiCloseCircleLine className="h-12 w-12 text-gray-500" />;
      case "confirm":
        return <FaSave className="h-12 w-12 text-gray-500" />;
      case "delete":
        return <FaRegTrashAlt className="h-12 w-12 text-gray-500" />;
      default:
        return <FaRegCheckCircle className="h-12 w-12 text-gray-500" />;
    }
  };

  const handleAccionPrimaria = () => {
    if (accionPrimaria) accionPrimaria();
    onClose();
  };

  const handleAccionSecundaria = () => {
    if (accionSecundaria) accionSecundaria();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg shadow-black/75">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              {getIcon()}
            </div>

            <h3 className="text-xl font-bold">{titulo}</h3>

            {mensaje && <p className="text-sm text-gray-600">{mensaje}</p>}

            <div className="mt-2 flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              {tipo === "success" || tipo === "error" ? (
                <button
                  onClick={handleAccionPrimaria}
                  className="w-full rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                >
                  {btnPrimario}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAccionSecundaria}
                    className="w-full rounded bg-white px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    {btnSecundario}
                  </button>
                  <button
                    onClick={handleAccionPrimaria}
                    className="w-full rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                  >
                    {btnPrimario}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
