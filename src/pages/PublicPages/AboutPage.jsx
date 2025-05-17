import React from "react";
import FotoMujer from "../../assets/img/WebP/FotoAboutMujer.webp";
import fotoSofia from "../../assets/img/WebP/sofiaAbout.webp";
import fotoLucas from "../../assets/img/WebP/LucasFernandezAbout.webp";
import fotoMariana from "../../assets/img/WebP/mariaLopezAbout.webp";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import Footer from "../../components/Navigate/Footer";
import useAboutAnimations from "../../hooks/animate/useAboutAnimations";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

export default function TalentMatchPage() {
  useCambiarTitulo("About");
  const {
    headerRef,
    aboutImageRef,
    aboutTextRef,
    missionRef,
    impactRef,
    differencesRef,
    teamTitleRef,
    teamCardsRef,
  } = useAboutAnimations();

  const addTeamCardRef = (el) => {
    if (el && !teamCardsRef.current.includes(el)) {
      teamCardsRef.current.push(el);
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="font-sans bg-[#f4f6fb] text-black">
        <main ref={headerRef} className="text-center py-16 px-4 bg-[#D8E9FF]">
          <h1 className="text-4xl md:text-6xl  mb-4">
            Unimos personas con oportunidades <br /> en un{" "}
            <span className="text-[#ff7b00]  font-medium  italic">click</span>.
            Así de simple.
          </h1>
        </main>
        <section className="bg-white flex flex-col md:flex-row items-center justify-center gap-16 px-8 md:px-20 py-16">
          <div
            ref={aboutImageRef}
            className="w-full h-[400px] md:h-[600px] md:w-1/3 relative flex items-center justify-center"
          >
            <img
              src={FotoMujer || "/placeholder.svg"}
              alt="Personas conectándose"
              className="rounded-4xl object-cover md:object-contain w-full h-full"
            />
          </div>

          <div
            ref={aboutTextRef}
            className="w-full md:w-1/2 flex flex-col justify-center space-y-7 text-center md:text-left"
          >
            <div className="">
              <h2 className="text-4xl poppins font-bold">Sobre nosotros</h2>
            </div>

            <p className="text-lg">
              Creemos que encontrar trabajo —o al candidato ideal— no debería
              ser complicado. Por eso creamos esta plataforma: para hacer que el
              proceso sea claro, ágil y humano, tanto para quienes buscan como
              para quienes contratan.
            </p>
            <p className="text-lg">
              Si buscas trabajo, acá vas a encontrar vacantes reales, con
              procesos organizados y seguimiento claro.
            </p>
            <p className="text-lg">
              Si eres parte de un equipo de RRHH, te damos una herramienta fácil
              de usar para publicar vacantes, gestionar postulaciones y seguir
              el avance de cada proceso en un solo lugar.{" "}
            </p>
            <p className="text-lg">
              Estamos para hacerte la vida más fácil. Ya sea que estés buscando
              tu próxima oportunidad o buscando al próximo talento para tu
              equipo.
            </p>
          </div>
        </section>
        <section className="bg-white flex flex-col lg:flex-row justify-center gap-10 px-6 md:px-16 pb-15">
          <div
            ref={missionRef}
            className="bg-[#D8E9FF] text-[#162C4D] p-12 py-16 lg:mx-0 rounded-4xl shadow-md w-full lg:w-1/3 h-auto"
          >
            <h3 className="text-4xl font-bold mb-4 ">Nuestra misión</h3>
            <p className="mb-4 text-md">
              Sabemos que buscar trabajo puede ser frustrante. También sabemos
              que para las empresas, contratar bien y rápido no siempre es
              fácil. <br /> Por eso creamos esta plataforma: para acercar a las
              personas correctas con las oportunidades adecuadas, sin vueltas.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <p>Queremos que:</p>
              <li>
                Los candidatos puedan postularse con confianza, sabiendo que hay
                un proceso claro detrás.
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

          <div
            ref={impactRef}
            className="bg-[#F9F9F9] text-[#162C4D] border rounded-4xl shadow-md p-12 py-16 w-full lg:w-1/3 h-auto"
          >
            <h3 className="text-4xl font-bold mb-4  ">Nuestro Impacto</h3>
            <p className="mb-4">
              Queremos cambiar la forma en que se conectan las personas y las
              oportunidades. <br />
              Hoy, muchos procesos de selección son lentos, poco claros o
              injustos. Y muchas personas quedan fuera no por falta de talento,
              sino por falta de acceso o visibilidad.
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
        <section
          ref={differencesRef}
          className="bg-white px-6 md:px-20 py-12 border-t-2 border-[#162C4D] border-b-2"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 items-start">
            <div>
              <h3 className="text-4xl font-semibold text-[#162C4D]">
                Qué Nos Hace <br className="hidden md:block" />
                Diferentes
              </h3>
            </div>

            {/* Columna 2: Texto */}
            <div>
              <p className="text-[#162C4D] font-medium">
                Hay muchas plataformas, pero pocas que piensen en ambos lados:
                candidatos y reclutadores. Nosotros construimos una experiencia
                pensada para facilitarle la vida a todos los que participan en
                un proceso de selección.
              </p>
            </div>

            {/* Columna 3: Lista */}
            <div>
              <ul className="list-disc list-inside font-medium text-[#162C4D] space-y-1">
                <li>
                  Tecnología simple,{" "}
                  <span className="font-bold">no abrumadora</span>
                </li>
                <li>
                  <span className="font-bold">Vacantes reales</span> y activas
                </li>
                <li>
                  <span className="font-bold">Seguimiento transparente</span> de
                  postulaciones
                </li>
                <li>
                  Un <span className="font-bold">equipo humano</span> detrás,
                  siempre disponible
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="px-6 md:px-20 py-12 bg-white">
          <div ref={teamTitleRef} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl mt-8 font-semibold mb-4">
              Quiénes somos
            </h2>
            <p className="max-w-3xl mx-auto font-medium text-lg">
              Conectamos personas con oportunidades, pero detrás también hay
              personas.
              <br />
              Conocé al equipo que impulsa TalentoMatch y trabaja cada día para
              mejorar la forma en que empresas y talentos se encuentran.
            </p>
          </div>

          <div className="space-y-8">
            {/* Tarjeta 1 - Mariana López */}
            <div className="flex flex-col md:flex-row items-stretch gap-8 max-w-5xl mx-auto overflow-hidden rounded-2xl">
              <div className="w-full md:w-[40%]">
                <img
                  src={fotoMariana || "/placeholder.svg?height=300&width=300"}
                  alt="Mariana López"
                  className="w-full h-full object-cover rounded-4xl"
                />
              </div>
              <div className="bg-[#FFE3C4] text-[#162C4D] rounded-4xl p-8 w-full md:w-[60%]">
                <h3 className="text-4xl font-semibold text-[#162C4D]">
                  Mariana López
                </h3>
                <p className="text-sm my-2 font-medium text-[#162C4D] mb-4">
                  — Co-Fundadora & CEO
                </p>
                <p className="font-medium text-[#162C4D]">
                  Apasionada por la tecnología y los recursos humanos, Mariana
                  lidera la visión de TalentMatch con foco en la innovación y la
                  experiencia del usuario. Cuenta con más de 10 años en
                  reclutamiento digital en América Latina.
                </p>
              </div>
            </div>

            {/* Tarjeta 2 - Sofía Méndez */}
            <div className="flex flex-col md:flex-row-reverse items-stretch gap-8 max-w-5xl mx-auto overflow-hidden">
              <div className="w-full md:w-[40%]">
                <img
                  src={fotoSofia || "/placeholder.svg?height=300&width=300"}
                  alt="Sofía Méndez"
                  className="w-full h-full object-cover rounded-4xl"
                />
              </div>
              <div className="bg-[#D8E9FF] text-[#162C4D] rounded-4xl p-8 w-full md:w-[60%]">
                <h3 className="text-4xl font-semibold text-[#162C4D]">
                  Sofía Méndez
                </h3>
                <p className="text-sm my-2 font-medium text-[#162C4D] mb-4">
                  Directora de Producto
                </p>
                <p className="font-medium text-[#162C4D]">
                  Sofía diseña soluciones centradas en el usuario que
                  simplifican los procesos de selección. Especialista en UX y
                  desarrollo de productos SaaS, se asegura de que nuestra
                  plataforma evolucione con las necesidades del mercado.
                </p>
              </div>
            </div>

            {/* Tarjeta 3 - Lucas Fernández */}
            <div className="flex flex-col md:flex-row items-stretch gap-8 max-w-5xl mx-auto overflow-hidden">
              <div className="w-full md:w-[40%]">
                <img
                  src={fotoLucas || "/placeholder.svg?height=300&width=300"}
                  alt="Lucas Fernández"
                  className="w-full h-full object-cover rounded-4xl"
                />
              </div>
              <div className="bg-[#FFE3C4] text-[#162C4D] rounded-4xl p-8 w-full md:w-[60%]">
                <h3 className="text-2xl font-bold text-[#162C4D]">
                  Lucas Fernández
                </h3>
                <p className="text-sm my-2 font-medium text-[#162C4D] mb-4">
                  CTO & Arquitecto de Software
                </p>
                <p className="font-medium text-[#162C4D]">
                  Responsable de la arquitectura técnica de TalentMatch, Lucas
                  combina su experiencia en desarrollo backend con su pasión por
                  la eficiencia y la seguridad. Ha trabajado en startups
                  tecnológicas de alto crecimiento en la región.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
