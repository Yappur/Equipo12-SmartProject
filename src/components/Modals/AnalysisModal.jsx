import React from "react";

const AnalysisModal = ({
  onClose,
  onStartAnalysis,
  cvCount,
  setCvCount,
  totalRecibidos,
  isAnalysisView,
  analysisResults,
}) => {
  // Si estamos mostrando la vista de resultados
  if (!isAnalysisView && analysisResults) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/50"></div>
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Resultados del Análisis
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800">
                    Total procesados
                  </h3>
                  <p className="text-2xl font-bold">
                    {analysisResults.processedCount}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800">
                    Exitosos
                  </h3>
                  <p className="text-2xl font-bold">
                    {analysisResults.successfulCount}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800">
                    Fallidos
                  </h3>
                  <p className="text-2xl font-bold">
                    {analysisResults.failureCount}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800">
                    Pendientes
                  </h3>
                  <p className="text-2xl font-bold">
                    {analysisResults.totalApplications -
                      analysisResults.processedCount}
                  </p>
                </div>
              </div>

              {analysisResults.batches &&
                analysisResults.batches.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                      Detalles por lote:
                    </h3>
                    {analysisResults.batches.map((batch, index) => (
                      <div key={index} className="border rounded-lg p-3 mb-2">
                        <p>
                          Lote {index + 1}: {batch.processed} procesados,{" "}
                          {batch.successful} exitosos
                        </p>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            <div className="text-center">
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg transition duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Vista principal del modal de análisis
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Analizar Currículums
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Se analizarán los CVs en estado "Recibido" y se cambiarán a "En
              revisión" o "Descartado" según corresponda.
            </p>

            <label className="block text-gray-700 text-sm font-medium mb-2">
              ¿Cuántos currículums deseas analizar?
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setCvCount(Math.max(1, cvCount - 1))}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={totalRecibidos}
                value={cvCount}
                onChange={(e) =>
                  setCvCount(
                    Math.max(
                      1,
                      Math.min(parseInt(e.target.value) || 1, totalRecibidos)
                    )
                  )
                }
                className="w-16 py-2 px-3 text-center border-t border-b border-gray-300"
              />
              <button
                onClick={() =>
                  setCvCount(Math.min(cvCount + 1, totalRecibidos))
                }
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {totalRecibidos} candidatos disponibles para analizar
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={onStartAnalysis}
              disabled={totalRecibidos === 0}
              className={`${
                totalRecibidos === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium py-2 px-8 rounded-lg transition duration-300`}
            >
              Comenzar Análisis
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisModal;
