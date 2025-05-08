import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PropTypes from "prop-types";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfModal = ({ cvUrl, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [pdfError, setPdfError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Asegurarse de que tenemos una URL absoluta
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fullUrl = cvUrl.startsWith("/")
      ? `${window.location.origin}${cvUrl}`
      : cvUrl;

    setPdfUrl(fullUrl);
    setLoading(true);
    setPdfError(null);
  }, [cvUrl]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(null);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error al cargar el PDF:", error);
    setPdfError(
      "No se pudo cargar el PDF. Verifica la URL o los permisos de acceso."
    );
    setLoading(false);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  const changeZoom = (factor) => {
    setZoomLevel((prevZoom) => {
      const newZoom = prevZoom * factor;
      return Math.min(Math.max(0.5, newZoom), 2.5);
    });
  };

  // Método para abrir el PDF en una nueva pestaña
  const openPdfInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  const downloadPdf = async () => {
    try {
      // Crear un elemento <a> temporal
      const link = document.createElement("a");
      link.href = pdfUrl;

      // Extraer el nombre del archivo de la URL o usar un nombre predeterminado
      const fileName = pdfUrl.split("/").pop() || "documento.pdf";
      link.download = fileName;

      // Agregar al DOM, hacer clic y eliminar
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      setPdfError("Error al descargar el PDF. Intenta abrir en nueva pestaña.");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">
          Visualización del CV
        </h2>
        <div className="flex items-center space-x-2">
          {/* Botón de descarga */}
          <button
            onClick={downloadPdf}
            className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-md flex items-center"
            title="Descargar PDF"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>

          {/* Botón de abrir en nueva pestaña */}
          <button
            onClick={openPdfInNewTab}
            className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-md flex items-center"
            title="Abrir en nueva pestaña"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-md flex items-center"
            title="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-100 p-4 rounded-md">
        {pdfError ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-red-600 mb-4">{pdfError}</p>
            <button
              onClick={openPdfInNewTab}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Abrir PDF en nueva pestaña
            </button>
          </div>
        ) : (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-600">Cargando PDF...</p>
              </div>
            }
            noData={
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-red-600 mb-4">
                  No se pudo cargar el PDF. Verifica la URL.
                </p>
                <button
                  onClick={openPdfInNewTab}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Abrir PDF en nueva pestaña
                </button>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={zoomLevel}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              error={<p>Error al renderizar la página.</p>}
            />
          </Document>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => changeZoom(1.2)}
            className="bg-blue-50 text-blue-600 p-2 rounded hover:bg-blue-100"
            title="Acercar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => changeZoom(0.8)}
            className="bg-blue-50 text-blue-600 p-2 rounded hover:bg-blue-100"
            title="Alejar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Página {pageNumber} de {numPages || "?"}
        </p>

        <div className="flex space-x-2">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className={`p-2 rounded ${
              pageNumber <= 1
                ? "bg-gray-200 text-gray-400"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className={`p-2 rounded ${
              pageNumber >= numPages
                ? "bg-gray-200 text-gray-400"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

PdfModal.propTypes = {
  cvUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PdfModal;
