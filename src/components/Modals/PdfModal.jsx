import { useState, useEffect } from "react";
import { FiExternalLink, FiDownload, FiX } from "react-icons/fi";

const PdfModal = ({ cvUrl, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
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

      {/* Iframe para mostrar el PDF */}
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}
        <iframe
          src={`${cvUrl}#toolbar=1&view=FitH`}
          className="w-full h-full border-0"
          title="Visor de CV"
          onLoad={handleIframeLoad}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};

export default PdfModal;
