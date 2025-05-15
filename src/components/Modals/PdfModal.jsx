import { useState, useEffect } from "react";
import { FiExternalLink, FiDownload, FiX } from "react-icons/fi";
import axios from "axios";

const PdfModal = ({ cvUrl, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(pdfUrl, {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrlBlob(url);

        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error("Error al cargar el PDF:", error);
      }
    };

    fetchPdf();
    setLoading(true);
  }, [cvUrl]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !fullscreen) onClose();
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
      if (e.key === "f") toggleFullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, fullscreen]);

  const modalContainerClass = fullscreen
    ? "fixed inset-0 z-50"
    : "w-full h-full flex flex-col";

  return (
    <div className={modalContainerClass}>
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-t-lg">
        <h3 className="text-lg font-medium text-gray-800">
          Visualizador de CV
        </h3>
        <div className="flex gap-2">
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
            title="Abrir en nueva ventana"
          >
            <FiExternalLink className="w-5 h-5" />
          </a>

          {!fullscreen && (
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
              title="Cerrar"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 relative">
        {cvUrl ? (
          <iframe
            src={cvUrl}
            width="100%"
            height="600px"
            title="PDF Viewer"
            style={{ border: "none" }}
          />
        ) : (
          <p>Cargando PDF...</p>
        )}
      </div>
    </div>
  );
};

export default PdfModal;
