import { useRef, useEffect, useState } from "react";
import { FaRegCheckCircle, FaRegTrashAlt, FaSave } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { slideInUp, slideOutDown } from "../helpers/animate";
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
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      slideInUp(modalRef.current);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    slideOutDown(modalRef.current, () => {
      onClose();
    });
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (tipo) {
      case "success":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C6F6D5] ">
            <FaRegCheckCircle className="h-10 w-10 text-[#1FC16B] " />
          </div>
        );
      case "error":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FBAAB2] ">
            <RiCloseCircleLine className="h-10 w-10 text-[#D00416] " />
          </div>
        );
      case "confirm":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#AFCEFF] ">
            <FaSave className="h-10 w-10 text-[#3D75CE]" />
          </div>
        );
      case "delete":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FBAAB2] ">
            <FaRegTrashAlt className="h-10 w-10 text-[#D00416] " />
          </div>
        );
      default:
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C6F6D5] ">
            <FaRegCheckCircle className="h-10 w-10 text-[#1FC16B] " />
          </div>
        );
    }
  };

  const handleAccionPrimaria = () => {
    if (accionPrimaria) accionPrimaria();
    handleClose();
  };

  const handleAccionSecundaria = () => {
    if (accionSecundaria) accionSecundaria();
    handleClose();
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={handleBackdropClick}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          ref={modalRef}
          className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg shadow-black/75"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="">{getIcon()}</div>

            <h3 className="text-xl font-bold">{titulo}</h3>

            {mensaje && <p className="text-sm text-gray-600">{mensaje}</p>}

            <div className="mt-2 flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              {tipo === "success" || tipo === "error" ? (
                <button
                  onClick={handleAccionPrimaria}
                  className="w-full rounded bg-[#152D53] px-4 py-2 text-white hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  {btnPrimario}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAccionSecundaria}
                    className="w-full rounded border border-[#152D53] px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    {btnSecundario}
                  </button>
                  <button
                    onClick={handleAccionPrimaria}
                    className="w-full rounded bg-[#152D53] px-4 py-2 text-white hover:bg-gray-800 transition duration-300 ease-in-out"
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
