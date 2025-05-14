import React from "react";
import fotoMujer from "@/assets/img/FotoAboutMujer.png";
import fotoSofia from "@/assets/img/sofiaAbout.png";
import fotoLucas from "@/assets/img/LucasFernandezAbout.png";
import fotoMariana from "@/assets/img/mariaLopezAbout.png";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import Footer from "../../components/Navigate/Footer";
const Componente = () => {
  return <img src={fotoMujer} alt="Foto de mujer" />;
};

export default function TalentMatchPage() {
  return (
    <>
      <LandingNavbar />
      <div className="bg-[#f4f6fb] text-gray-800">
        <main className="text-center py-16 px-4 bg-[#D8E9FF]">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Unimos personas con oportunidades <br /> en un{" "}
            <span className="text-[#ff7b00] italic">click</span>. Así de simple.
          </h1>
        </main>
        <section className="bg-white flex flex-col md:flex-row items-center gap-4 px-8 md:px-16 py-10">
          {/* Imagen */}
          <div>
            <img
              src={fotoMujer}
              alt="Personas conectándose"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Sobre nosotros</h2>
            <p className="mb-4">
              Creemos que encontrar trabajo —o el candidato ideal— no debería
              ser complicado. Por eso creamos esta plataforma: para hacer que el
              proceso sea claro, ágil y humano, tanto para quienes buscan como
              para quienes contratan.
            </p>
            <p className="mb-4">
              Si buscas trabajo, aquí vas a encontrar vacantes reales, con
              procesos organizados y seguimiento claro.
            </p>
            <p className="mb-4">
              Si eres parte de un equipo de RRHH, te damos una herramienta fácil
              de usar para publicar vacantes, gestionar postulaciones y seguir
              el avance de cada proceso en un solo lugar.
            </p>
            <p>
              Estamos para hacerte la vida más fácil. Ya sea que estés buscando
              tu próxima oportunidad o buscando al próximo talento para tu
              equipo.
            </p>
          </div>
        </section>

        <section className="bg-white flex flex-col md:flex-row items-center gap-4 px-8 md:px-16 py-10">
          <div className="bg-[#D8E9FF] rounded-xl shadow-md p-6 w-[70%] h-[70vh]">
            <h3 className="text-xl font-bold mb-4 text-[#162C4D]">
              Nuestra misión
            </h3>
            <p className="mb-4">
              Sabemos que buscar trabajo puede ser frustrante. También sabemos
              que para las empresas, contratar bien y rápido no siempre es
              fácil.
            </p>
            <p className="mb-4">
              Por eso creamos esta plataforma: para acercar a las personas
              correctas con las oportunidades adecuadas, sin vueltas.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Que los candidatos puedan postularse con confianza, sabiendo que
                hay un proceso claro detrás.
              </li>
              <li>
                Los equipos de RRHH tengan una herramienta simple y poderosa
                para gestionar vacantes y postulaciones sin perder tiempo.
              </li>
            </ul>
            <p>
              Creemos que la tecnología tiene que estar al servicio de las
              personas, no al revés. Y trabajamos todos los días para que eso se
              note en cada parte de nuestra plataforma.
            </p>
          </div>

          <div className="bg-[#F9F9F9]  border rounded-xl shadow-md p-6 w-[70%] h-[70vh]">
            <h3 className="text-xl font-bold mb-4 text-[#162C4D]">
              Nuestro Impacto
            </h3>
            <p className="mb-4">
              Queremos cambiar la forma en que se conectan las personas y las
              oportunidades.
            </p>
            <p className="mb-4">
              Hoy, muchos procesos de selección son lentos, poco claros y
              frustrantes. Muchas personas quedan fuera por no falta de talento,
              sino por falta de acceso o visibilidad.
            </p>
            <p>
              ¿A dónde vamos?
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Un aliado estratégico para equipos de RRHH modernos.</li>
                <li>
                  Una puerta abierta para quienes están buscando su sitio en el
                  mundo laboral.
                </li>
              </ul>
            </p>
          </div>
        </section>

        <section className="bg-white px-8 md:px-16 py-10 ">
          <div className="bg-[#F9F9F9] border rounded-xl shadow-md p-6 w-full md:w-[100%] h-auto flex flex-col md:flex-row gap-4">
            {/* Columna 1: Título */}
            <div className="flex-1 flex items-center">
              <h3 className="text-3xl font-bold text-[#162C4D]">
                Qué Nos Hace Diferentes
              </h3>
            </div>

            {/* Columna 2: Párrafo */}
            <div className="flex-1 flex items-center">
              <p>
                Hay muchas plataformas, pero pocas que piensen en ambos lados:
                candidatos y reclutadores. Nosotros construimos una experiencia
                pensada para facilitarle la vida a todos los que participan en
                un proceso de selección.
              </p>
            </div>

            {/* Columna 3: Lista */}
            <div className="flex-1 flex items-center">
              <ul className="list-disc list-inside space-y-2">
                <li>Tecnología simple, no abrumadora</li>
                <li>Vacantes reales y activas</li>
                <li>Seguimiento transparente de postulaciones</li>
                <li>Un equipo humano detrás, siempre disponible</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-20 py-12 bg-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quiénes somos
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Conectamos personas con oportunidades, pero detrás también hay
              personas.
              <br />
              Conocé al equipo que impulsa TalentMatch y trabaja cada día para
              mejorar la forma en que empresas y talentos se encuentran.
            </p>
          </div>

          <div className="space-y-16">
            {/* Tarjeta 1 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={fotoMariana}
                alt="Mariana López"
                className="w-100 h-50 rounded-lg object-cover shrink-0"
              />
              <div className="bg-[#FFE3C4] rounded-xl shadow-md p-6 w-full  h-50">
                <h3 className="text-xl font-bold text-[#162C4D]">
                  Mariana López
                </h3>
                <p className="italic text-sm text-gray-600 mb-2">
                  – Co-Fundadora & CEO
                </p>
                <p className="text-gray-700">
                  Apasionada por la tecnología y los recursos humanos, Mariana
                  lidera la visión de TalentMatch con foco en la innovación y la
                  experiencia del usuario. Cuenta con más de 10 años en
                  reclutamiento digital en América Latina.
                </p>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6">
              <img
                src={fotoSofia}
                alt="Sofía Méndez"
                className="w-100 h-50 rounded-lg object-cover shrink-0"
              />
              <div className="bg-[#D8E9FF] rounded-xl shadow-md p-6 h-50 w-full">
                <h3 className="text-xl font-bold text-[#162C4D]">
                  Sofía Méndez
                </h3>
                <p className="italic text-sm text-gray-600 mb-2">
                  Directora de Producto
                </p>
                <p className="text-gray-700">
                  Sofía diseña soluciones centradas en el usuario que
                  simplifican los procesos de selección. Especialista en UX y
                  desarrollo de productos SaaS, se asegura de que nuestra
                  plataforma evolucione con las necesidades del mercado.
                </p>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={fotoLucas}
                alt="Lucas Fernández"
                className="w-100 h-50 rounded-lg object-cover shrink-0"
              />
              <div className="bg-[#FFE3C4] rounded-xl shadow-md p-6 h-50 w-full">
                <h3 className="text-xl font-bold text-[#162C4D]">
                  Lucas Fernández
                </h3>
                <p className="italic text-sm text-gray-600 mb-2">
                  CTO & Arquitecto de Software
                </p>
                <p className="text-gray-700">
                  Responsable de la arquitectura técnica de TalentMatch, Lucas
                  combina su experiencia en desarrollo backend con su pasión por
                  la eficiencia y la seguridad. Ha trabajado en startups
                  tecnológicas de alto crecimiento en la región.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#ff7b00] px-8 md:px-16 py-10 mb-10">
          <div className="flex flex-col items-center text-center space-y-4 w-full">
            <h3 className="text-3xl md:text-3xl font-bold text-white">
              ¡OFERTA LIMITADA!
            </h3>
            <h3 className="text-xl md:text-3xl  text-white">
              Primer mes gratis hasta el 15 de mayo
            </h3>
            <button className="mt-2 px-6 py-2 border-2 border-white text-[#ff7b00] bg-white font-semibold rounded hover:bg-orange-100 transition">
              Pedir aquí
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
