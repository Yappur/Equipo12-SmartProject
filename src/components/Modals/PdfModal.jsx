// import { useState, useEffect } from "react";
// import { FiExternalLink, FiDownload, FiX } from "react-icons/fi";
// import { Document, Page, pdfjs } from "react-pdf";

// // Configurar la misma versión para API y Worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

// // // Importante: Establecer la versión de la API para que coincida con el Worker
// // if (typeof window !== "undefined") {
// //   // Solo ejecutar en el cliente
// //   pdfjs.version = "3.4.120";
// // }

// const PdfModal = ({ cvUrl, onClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [error, setError] = useState(null);

//   const getProxyUrl = (originalUrl) => {
//     if (!originalUrl) return null;

//     try {
//       const firebaseUrl = new URL(originalUrl);
//       const pathWithParams = firebaseUrl.pathname + firebaseUrl.search;

//       // Build the proxy URL
//       return `/api${pathWithParams}`;
//     } catch (e) {
//       console.error("Error processing URL:", e);
//       return originalUrl; // Return the original URL in case of error
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//   }, [cvUrl]);

//   useEffect(() => {
//     const fetchPdf = async () => {
//       if (!cvUrl) return;

//       try {
//         setLoading(true);
//         const proxyUrl = getProxyUrl(cvUrl);

//         // Add timestamp to avoid caching issues
//         const urlWithCache = `${proxyUrl}${
//           proxyUrl.includes("?") ? "&" : "?"
//         }timestamp=${new Date().getTime()}`;

//         console.log("Attempting to load PDF from:", urlWithCache);

//         const response = await fetch(urlWithCache);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const blob = await response.blob();
//         const blobUrl = URL.createObjectURL(blob);
//         setPdfBlob(blobUrl);
//         setError(null);
//       } catch (error) {
//         console.error("Error downloading PDF:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (cvUrl) {
//       fetchPdf();
//     }

//     // Clean up the blob URL when component unmounts or URL changes
//     return () => {
//       if (pdfBlob) {
//         URL.revokeObjectURL(pdfBlob);
//       }
//     };
//   }, [cvUrl]);

//   const toggleFullscreen = () => {
//     setFullscreen(!fullscreen);
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//     setLoading(false);
//   };

//   const changePage = (offset) => {
//     setPageNumber((prevPageNumber) => {
//       const newPageNumber = prevPageNumber + offset;
//       return Math.min(Math.max(1, newPageNumber), numPages || 1);
//     });
//   };

//   const previousPage = () => changePage(-1);
//   const nextPage = () => changePage(1);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape" && !fullscreen) onClose();
//       if (e.key === "Escape" && fullscreen) setFullscreen(false);
//       if (e.key === "f") toggleFullscreen();
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [onClose, fullscreen]);

//   const modalContainerClass = fullscreen
//     ? "fixed inset-0 z-50"
//     : "w-full h-full flex flex-col";

//   return (
//     <div className={modalContainerClass}>
//       <div className="flex justify-between items-center bg-gray-100 p-2 rounded-t-lg">
//         <h3 className="text-lg font-medium text-gray-800">
//           Visualizador de CV {numPages && `(${pageNumber} de ${numPages})`}
//         </h3>
//         <div className="flex gap-2">
//           <a
//             href={cvUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
//             title="Abrir en nueva ventana"
//           >
//             <FiExternalLink className="w-5 h-5" />
//           </a>

//           <a
//             href={cvUrl}
//             download
//             className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
//             title="Descargar PDF"
//           >
//             <FiDownload className="w-5 h-5" />
//           </a>

//           <button
//             onClick={toggleFullscreen}
//             className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
//             title={
//               fullscreen ? "Salir de pantalla completa" : "Pantalla completa"
//             }
//           >
//             {fullscreen ? "⤓" : "⤢"}
//           </button>

//           {!fullscreen && (
//             <button
//               onClick={onClose}
//               className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-200"
//               title="Cerrar"
//             >
//               <FiX className="w-5 h-5" />
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="w-full h-full overflow-auto flex flex-col items-center bg-gray-200 p-4">
//         {loading && (
//           <div className="flex items-center justify-center h-full w-full">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             <p className="ml-2">Cargando PDF...</p>
//           </div>
//         )}

//         {!loading && pdfBlob && (
//           <>
//             <Document
//               file={pdfBlob}
//               onLoadSuccess={onDocumentLoadSuccess}
//               onLoadError={(err) => {
//                 console.error("Error loading PDF:", err);
//                 setError(err.message);
//                 setLoading(false);
//               }}
//               loading={
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               }
//               className="pdf-document"
//               error={
//                 <div className="text-red-500">
//                   Error al cargar el documento PDF
//                 </div>
//               }
//             >
//               <Page
//                 pageNumber={pageNumber}
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//                 className="shadow-lg"
//                 scale={fullscreen ? 1.5 : 1}
//                 error={
//                   <div className="text-red-500">
//                     Error al renderizar la página
//                   </div>
//                 }
//               />
//             </Document>

//             {numPages > 1 && (
//               <div className="flex justify-center mt-4 gap-4">
//                 <button
//                   onClick={previousPage}
//                   disabled={pageNumber <= 1}
//                   className={`px-4 py-2 rounded ${
//                     pageNumber <= 1
//                       ? "bg-gray-300 text-gray-500"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   Anterior
//                 </button>
//                 <button
//                   onClick={nextPage}
//                   disabled={pageNumber >= numPages}
//                   className={`px-4 py-2 rounded ${
//                     pageNumber >= numPages
//                       ? "bg-gray-300 text-gray-500"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   Siguiente
//                 </button>
//               </div>
//             )}
//           </>
//         )}

//         {!loading && (error || !pdfBlob) && (
//           <div className="text-red-500 bg-red-100 p-4 rounded max-w-lg">
//             <p className="font-bold mb-2">Error al cargar el PDF</p>
//             <p className="mb-2">{error || "No se pudo cargar el documento"}</p>
//             <p className="mb-2">URL: {cvUrl}</p>
//             <p className="text-sm mb-4">
//               Este error puede ser causado por restricciones CORS al acceder
//               archivos desde Firebase Storage en desarrollo local o problemas
//               con la carga del PDF.js worker.
//             </p>
//             <div className="flex flex-col gap-2">
//               <a
//                 href={cvUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600"
//               >
//                 Abrir PDF en nueva ventana
//               </a>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PdfModal;
