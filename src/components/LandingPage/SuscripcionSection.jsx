import formas3d from "@/assets/img/formas3d.png"; // Asegúrate de que la ruta sea correcta

const SuscripcionSection = () => {
  return (
    <section className="bg-gray-200 relative overflow-hidden py-20 px-6 font-poppins">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
          Mejora el seguimiento en tus procesos de selección
        </h2>
        <form className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <label htmlFor="email" className="sr-only">
            Introduce tu correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Introduce tu email..."
            aria-label="Correo electrónico"
            className="w-full md:w-2/3 px-5 py-3 rounded-md text-black text-base shadow-sm outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-6 py-3 rounded-md shadow-md transition-all duration-300"
          >
            Suscribirme
          </button>
        </form>
      </div>

      {/* Imagen decorativa 3D  */}
      <img
        src={formas3d} // <- reemplaza esto
        alt="Decoración 3D"
        className="absolute right-0 bottom-0 w-64 md:w-80  pointer-events-none animate-float"
      />
    </section>
  );
};

export default SuscripcionSection;
