// import { useState, useEffect } from "react";
// import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import "@react-pdf-viewer/toolbar/lib/styles/index.css";
// import "@react-pdf-viewer/zoom/lib/styles/index.css";
// import PropTypes from "prop-types";

// const PdfModal = ({ pdfUrl, onClose }) => {
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Plugins para mejorar la funcionalidad
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//   const toolbarPluginInstance = toolbarPlugin();
//   const zoomPluginInstance = zoomPlugin();

//   const { zoomTo } = zoomPluginInstance;

//   useEffect(() => {
//     // Normaliza la URL del PDF
//     const fullUrl = pdfUrl.startsWith("/")
//       ? `${window.location.origin}${pdfUrl}`
//       : pdfUrl;

//     setUrl(fullUrl);
//     setLoading(true);
//     setError(null);

//     // Verificar que el PDF existe y es accesible
//     fetch(fullUrl, { method: "HEAD" })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Error al acceder al PDF: ${response.status}`);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error al verificar el PDF:", err);
//         setError("No se pudo acceder al PDF. Verifica la URL o los permisos.");
//         setLoading(false);
//       });
//   }, [pdfUrl]);

//   // Función para descargar el PDF
//   const downloadPdf = async () => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Error al descargar: ${response.status}`);
//       }

//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;

//       // Extraer nombre del archivo o usar predeterminado
//       const fileName = url.split("/").pop() || "documento.pdf";
//       link.download = fileName;

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(downloadUrl);
//     } catch (err) {
//       console.error("Error al descargar el PDF:", err);
//       setError("Error al descargar el PDF.");
//     }
//   };

//   // Abrir en nueva pestaña
//   const openInNewTab = () => {
//     window.open(url, "_blank");
//   };

//   return (
//     <div className="bg-white rounded-lg p-4 w-full h-full flex flex-col">
//       {/* Cabecera con título y botones */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-700">
//           Visualización del CV
//         </h2>
//         <div className="flex items-center space-x-2">
//           {/* Botón de descarga */}
//           <button
//             onClick={downloadPdf}
//             className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-md flex items-center"
//             title="Descargar PDF"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//               />
//             </svg>
//           </button>

//           {/* Botón de abrir en nueva pestaña */}
//           <button
//             onClick={openInNewTab}
//             className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-md flex items-center"
//             title="Abrir en nueva pestaña"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//               />
//             </svg>
//           </button>

//           {/* Botón de cerrar */}
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 p-2 rounded-md flex items-center"
//             title="Cerrar"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Contenedor principal del PDF */}
//       <div className="flex-1 overflow-hidden bg-gray-100 rounded-md">
//         {loading ? (
//           <div className="flex justify-center items-center h-full">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//             <p className="ml-3 text-gray-600">Cargando PDF...</p>
//           </div>
//         ) : error ? (
//           <div className="flex flex-col items-center justify-center h-full p-4">
//             <p className="text-red-600 mb-4">{error}</p>
//             <button
//               onClick={openInNewTab}
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//             >
//               Intentar abrir en nueva pestaña
//             </button>
//           </div>
//         ) : (
//           <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
//             <div style={{ height: "calc(100% - 8px)" }}>
//               <Viewer
//                 fileUrl={url}
//                 plugins={[
//                   defaultLayoutPluginInstance,
//                   toolbarPluginInstance,
//                   zoomPluginInstance,
//                 ]}
//                 defaultScale={SpecialZoomLevel.PageFit}
//                 onDocumentLoadError={(err) => {
//                   console.error("Error al cargar el documento:", err);
//                   setError(
//                     "Error al cargar el PDF. El archivo podría estar corrupto o inaccesible."
//                   );
//                 }}
//               />
//             </div>
//           </Worker>
//         )}
//       </div>
//     </div>
//   );
// };

// PdfModal.propTypes = {
//   pdfUrl: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default PdfModal;
import React from "react";

const PdfModal = () => {
  return <div>Este Modal esta en desarrollo</div>;
};

export default PdfModal;
