export default function NuevoCandidato() {
  return (
    <div className="w-full p-6">
      {/* TÍTULO PRINCIPAL */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-black">Candidatos</h2>
      </div>

      {/* CONTENEDOR DEL FORMULARIO */}
      <h2 className="text-2xl font-semibold text-black">Candidatos</h2>
      <div className="border border-gray-400 rounded bg-white p-6 shadow-sm w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Nuevo candidato</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre y apellido*</label>
            <input
              type="text"
              className="w-full border border-gray-400 bg-gray-100 rounded p-2"
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Candidato a*</label>
            <input
              type="text"
              className="w-full border border-gray-400 bg-gray-100 rounded p-2"
              placeholder="Posición"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mail*</label>
            <input
              type="email"
              className="w-full border border-gray-400 bg-gray-100 rounded p-2"
              placeholder="email@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono*</label>
            <input
              type="tel"
              className="w-full border border-gray-400 bg-gray-100 rounded p-2"
              placeholder="+123456789"
            />
          </div>

          <div className="col-span-2">
            <button
              type="button"
              className="border border-gray-400 bg-white rounded px-4 py-2 text-sm"
            >
              + Importar CV
            </button>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Aptitudes</label>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-400 bg-gray-100 rounded p-2"
                placeholder="Palabra clave"
              />
              <input
                type="text"
                className="flex-1 border border-gray-400 bg-gray-100 rounded p-2"
                placeholder="Palabra clave"
              />
            </div>
          </div>

          <div className="col-span-2">
            <button
              type="button"
              className="border border-gray-400 bg-white rounded px-4 py-2 text-sm"
            >
              + Agregar aptitud
            </button>
          </div>

          <div className="col-span-2 flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-400 rounded bg-white text-black"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-900 text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
