import { useState } from "react";

const servicios = [
  {
    id: 1,
    img: "https://plus.unsplash.com/premium_photo-1661288470388-c5006797bdff?w=500&auto=format&fit=crop&q=60",
    texto: "Identificación de talento estratégico con procesos modernos y efectivos de selección.",
    detalle: "Utilizamos herramientas avanzadas de evaluación y un enfoque personalizado para encontrar el candidato ideal que encaje en tu cultura organizacional.",
  },
  {
    id: 2,
    img: "https://plus.unsplash.com/premium_photo-1679857224535-85d45adae907?w=500&auto=format&fit=crop&q=60",
    texto: "Tecnología aplicada al reclutamiento para agilizar cada etapa del proceso.",
    detalle: "Automatizamos tareas repetitivas y usamos algoritmos de coincidencia inteligente para filtrar los mejores perfiles de forma rápida y eficiente.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1549923746-9507eec27243?w=500&auto=format&fit=crop&q=60",
    texto: "Consultoría personalizada para fortalecer tus procesos de selección.",
    detalle: "Nuestros expertos te asesoran para mejorar tu estrategia de atracción y fidelización del talento humano, alineándola a tus objetivos de negocio.",
  },
];

const ServiciosSection = () => {
  const [modalInfo, setModalInfo] = useState(null);

  return (
    <section className="bg-white text-center px-6 py-20 font-poppins relative">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900">
        Nuestros servicios
      </h2>
      <p className="text-gray-600 mb-14 max-w-2xl mx-auto text-lg leading-relaxed">
        Potenciamos tu proceso de selección con soluciones estratégicas, tecnológicas y personalizadas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {servicios.map((servicio) => (
          <article
            key={servicio.id}
            className="bg-[#f5f5f5] rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <img
              src={servicio.img}
              alt="Servicio"
              className="w-24 h-24 object-cover rounded-full mb-6 shadow-md"
            />
            <p className="text-gray-800 text-base leading-relaxed mb-6">
              {servicio.texto}
            </p>
            <button
              onClick={() => setModalInfo(servicio)}
              className="bg-white hover:bg-gray-100 text-black font-medium py-2 px-6 rounded-full shadow transition duration-300"
            >
              Ver más
            </button>
          </article>
        ))}
      </div>

      {modalInfo && (
  <div
    className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    role="dialog"
    aria-modal="true"
  >
    <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-5 shadow-xl text-left relative animate-fade-in-up">
      <button
        onClick={() => setModalInfo(null)}
        className="absolute top-4 right-5 text-2xl text-gray-600 hover:text-gray-900"
        aria-label="Cerrar modal"
      >
        &times;
      </button>

      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={modalInfo.img}
          alt="Imagen del servicio"
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
        <h3 className="text-2xl font-bold text-gray-900">Detalles del servicio</h3>
        <p className="text-gray-700 text-base leading-relaxed">
          {modalInfo.detalle}
        </p>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default ServiciosSection;
