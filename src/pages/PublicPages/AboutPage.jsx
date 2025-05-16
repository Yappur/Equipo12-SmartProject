import React from "react";
import FotoMujer from "../../assets/img/FotoAboutMujer.png";
import fotoSofia from "../../assets/img/sofiaAbout.png";
import fotoLucas from "../../assets/img/LucasFernandezAbout.png";
import fotoMariana from "../../assets/img/MariaLopezAbout.png";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import Footer from "../../components/Navigate/Footer";

export default function TalentMatchPage() {
  return (
    <div className="font-sans bg-[#f4f6fb] text-gray-800">
      <LandingNavbar />

      <main className="text-center py-16 px-4 bg-[#D8E9FF]">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Unimos personas con oportunidades <br /> en un{" "}
          <span className="text-[#ff7b00] italic">click</span>. Así de simple.
        </h1>
      </main>

      <section className="bg-white flex flex-col md:flex-row items-center gap-8 px-6 md:px-16 py-10">
        <div className="w-full md:w-1/2">
          <img
            src={FotoMujer}
            alt="Personas conectándose"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Sobre nosotros</h2>
          <p className="mb-4">
            Creemos que encontrar trabajo —o el candidato ideal— no debería ser
            complicado...
          </p>
          <p className="mb-4">Si buscas trabajo, aquí vas a encontrar...</p>
          <p className="mb-4">
            Si eres parte de un equipo de RRHH, te damos una herramienta...
          </p>
          <p>
            Estamos para hacerte la vida más fácil. Ya sea que estés buscando
            tu próxima oportunidad o talento.
          </p>
        </div>
      </section>

      <section className="bg-white  flex flex-col lg:flex-row gap-8 px-6 md:px-16 py-10">
        <div className="bg-[#D8E9FF] rounded-xl shadow-md p-6 w-full lg:w-1/2 h-auto">
          <h3 className="text-xl font-bold mb-4 text-[#162C4D]">
            Nuestra misión
          </h3>
          <p className="mb-4">
            Sabemos que buscar trabajo puede ser frustrante...
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              Que los candidatos puedan postularse con confianza...
            </li>
            <li>
              Los equipos de RRHH tengan una herramienta simple...
            </li>
          </ul>
          <p>
            Creemos que la tecnología tiene que estar al servicio de las
            personas...
          </p>
        </div>

        <div className="bg-[#F9F9F9] border rounded-xl shadow-md p-6 w-full lg:w-1/2 h-auto">
          <h3 className="text-xl font-bold mb-4 text-[#162C4D]">
            Nuestro Impacto
          </h3>
          <p className="mb-4">
            Queremos cambiar la forma en que se conectan las personas...
          </p>
          <p className="mb-4">
            Hoy, muchos procesos de selección son lentos...
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Un aliado estratégico para equipos de RRHH modernos.</li>
            <li>
              Una puerta abierta para quienes están buscando su sitio laboral.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 md:px-20 py-12 border-t border-b">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
    {/* Columna 1: Título */}
    <div>
      <h3 className="text-2xl font-bold text-[#162C4D]">
        Qué Nos Hace <br className="hidden md:block" />
        Diferentes
      </h3>
    </div>

    {/* Columna 2: Texto */}
    <div>
      <p className="text-gray-700">
        Hay muchas plataformas, pero pocas que piensen en ambos lados:
        candidatos y reclutadores. Nosotros construimos una experiencia
        pensada para facilitarle la vida a todos los que participan en un proceso
        de selección.
      </p>
    </div>

    {/* Columna 3: Lista */}
    <div>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li><span className="font-medium">Tecnología simple</span>, no abrumadora</li>
        <li><span className="font-medium">Vacantes reales</span> y activas</li>
        <li><span className="font-medium">Seguimiento transparente</span> de postulaciones</li>
        <li>Un <span className="font-medium">equipo humano</span> detrás, siempre disponible</li>
      </ul>
    </div>
  </div>
</section>


     <section className="px-6 md:px-20 py-12 bg-white">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">Quiénes somos</h2>
    <p className="text-gray-700 max-w-2xl mx-auto">
      Conectamos personas con oportunidades, pero detrás también hay personas.
      <br />
      Conocé al equipo que impulsa TalentMatch y trabaja cada día para mejorar la forma
      en que empresas y talentos se encuentran.
    </p>
  </div>

  <div className="space-y-16">
    {/* Tarjeta 1 */}
    <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl mx-auto">
      <img
        src={fotoMariana}
        alt="Mariana López"
        className="w-full md:w-[300px] h-[200px] rounded-lg object-cover"
      />
      <div className="bg-[#FFE3C4] rounded-xl shadow-md p-6 w-full min-h-[200px] md:min-h-[250px]">
        <h3 className="text-xl font-bold text-[#162C4D]">Mariana López</h3>
        <p className="italic text-sm text-gray-600 mb-2">– Co-Fundadora & CEO</p>
        <p className="text-gray-700">
          Apasionada por la tecnología y los recursos humanos, Mariana lidera la visión de TalentMatch con foco en la innovación y la experiencia del usuario. Cuenta con más de 10 años en reclutamiento digital en América Latina.
        </p>
      </div>
    </div>

    {/* Tarjeta 2 */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-6 max-w-5xl mx-auto">
      <img
        src={fotoSofia}
        alt="Sofía Méndez"
        className="w-full md:w-[300px] h-[200px] rounded-lg object-cover"
      />
      <div className="bg-[#D8E9FF] rounded-xl shadow-md p-6 w-full min-h-[200px] md:min-h-[250px]">
        <h3 className="text-xl font-bold text-[#162C4D]">Sofía Méndez</h3>
        <p className="italic text-sm text-gray-600 mb-2">Directora de Producto</p>
        <p className="text-gray-700">
          Sofía diseña soluciones centradas en el usuario que simplifican los procesos de selección. Especialista en UX y desarrollo de productos SaaS, se asegura de que nuestra plataforma evolucione con las necesidades del mercado.
        </p>
      </div>
    </div>

    {/* Tarjeta 3 */}
    <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl mx-auto">
      <img
        src={fotoLucas}
        alt="Lucas Fernández"
        className="w-full md:w-[300px] h-[200px] rounded-lg object-cover"
      />
      <div className="bg-[#FFE3C4] rounded-xl shadow-md p-6 w-full min-h-[200px] md:min-h-[250px]">
        <h3 className="text-xl font-bold text-[#162C4D]">Lucas Fernández</h3>
        <p className="italic text-sm text-gray-600 mb-2">CTO & Arquitecto de Software</p>
        <p className="text-gray-700">
          Responsable de la arquitectura técnica de TalentMatch, Lucas combina su experiencia en desarrollo backend con su pasión por la eficiencia y la seguridad. Ha trabajado en startups tecnológicas de alto crecimiento en la región.
        </p>
      </div>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
}
