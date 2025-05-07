import React from "react";


export default function TalentMatchPage() {
  return (
    <div className="font-sans bg-[#f4f6fb] text-gray-800">
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#ff7b00]">
          Talent <span className="text-gray-900">Match</span>
        </div>
        <nav className="space-x-4">
          <button className="text-gray-700 hover:text-[#ff7b00]">Quiénes somos</button>
          <button className="bg-[#ff7b00] text-white px-4 py-2 rounded-xl font-semibold">Ver vacantes</button>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-xl font-semibold">Acceso reclutadores</button>
        </nav>
      </header>

      <main className="text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Unimos personas con oportunidades <br /> en un <span className="text-[#ff7b00] italic">click</span>. Así de simple.
        </h1>
      </main>

      <section className="grid md:grid-cols-2 gap-10 px-8 md:px-16 py-10">
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2019/10/19/08/46/business-4558276_1280.jpg"
            alt="Personas conectándose"
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Sobre nosotros</h2>
          <p className="mb-4">
            Creemos que encontrar trabajo —o el candidato ideal— no debería ser complicado. Por eso creamos esta plataforma: para hacer que el proceso sea claro, ágil y humano, tanto para quienes buscan como para quienes contratan.
          </p>
          <p className="mb-4">
            Si buscas trabajo, aquí vas a encontrar vacantes reales, con procesos organizados y seguimiento claro.
          </p>
          <p className="mb-4">
            Si eres parte de un equipo de RRHH, te damos una herramienta fácil de usar para publicar vacantes, gestionar postulaciones y seguir el avance de cada proceso en un solo lugar.
          </p>
          <p>
            Estamos para hacerte la vida más fácil. Ya sea que estés buscando tu próxima oportunidad o buscando al próximo talento para tu equipo.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 px-8 md:px-16 py-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-[#4063c2]">Nuestra misión</h3>
          <p className="mb-4">
            Sabemos que buscar trabajo puede ser frustrante. También sabemos que para las empresas, contratar bien y rápido no siempre es fácil.
          </p>
          <p className="mb-4">
            Por eso creamos esta plataforma: para acercar a las personas correctas con las oportunidades adecuadas, sin vueltas.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Que los candidatos puedan postularse con confianza, sabiendo que hay un proceso claro detrás.</li>
            <li>Que los equipos de RRHH tengan una herramienta simple y ordenada.</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-[#4063c2]">Nuestro Impacto</h3>
          <p className="mb-4">
            Queremos cambiar la forma en que se conectan las personas y las oportunidades.
          </p>
          <p className="mb-4">
            Hoy, muchos procesos de selección son lentos, poco claros y frustrantes. Muchas personas quedan fuera por no falta de talento, sino por falta de acceso o visibilidad.
          </p>
          <p>
            ¿A dónde vamos?
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Un aliado estratégico para equipos de RRHH modernos.</li>
              <li>Una puerta abierta para quienes están buscando su sitio en el mundo laboral.</li>
            </ul>
          </p>
        </div>
      </section>
    </div>
  );
}
