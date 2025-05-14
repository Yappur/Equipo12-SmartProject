import { useState, useEffect } from "react";
import { FiExternalLink, FiDownload, FiX } from "react-icons/fi";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const PdfModal = ({ cvUrl, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [cvUrl]);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(cvUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setPdfBlob(blobUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error al descargar el PDF:", error);
        setLoading(false);
      }
    };

    fetchPdf();
  }, [cvUrl]);

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
      <div className="w-full h-full">
        {loading && <p>Cargando PDF...</p>}
        {!loading && pdfBlob && (
          <Document
            file={pdfBlob}
            onLoadError={(err) => console.error("Error al cargar PDF:", err)}
          >
            <Page pageNumber={1} width={600} />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PdfModal;
