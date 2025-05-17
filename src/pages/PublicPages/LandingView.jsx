import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import Footer from "../../components/Navigate/Footer";
import { initAnimations } from "../../helpers/animate";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

// Images
import imgMujer from "@/assets/img/WebP/mujer-hero.webp";
import imgVacantes from "@/assets/img/WebP/vacantes-landing.webp";
import imgHerramientas1 from "@/assets/img/WebP/herramientas-1.webp";
import imgHerramientas2 from "@/assets/img/WebP/herramientas-2.webp";
import imgHerramientas3 from "@/assets/img/WebP/herramientas-3.webp";
import VacancieTable from "../../components/Tables/VacancieTable";
import VacancieCards from "../../components/Cards/VacancieCards";

export default function AnimatedLandingView() {
  useCambiarTitulo("Landing");

  const heroTitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const heroButtonRef = useRef(null);
  const heroImageRef = useRef(null);

  const vacantesTitleRefs = useRef([]);
  const vacantesDescriptionRef = useRef(null);
  const vacantesContentRef = useRef(null);

  const recruitersImageRef = useRef(null);
  const recruitersTitleRef = useRef(null);
  const recruitersDescriptionRef = useRef(null);
  const benefitItemRefs = useRef([]);
  const recruitersButtonRef = useRef(null);

  const herramientasHeaderRef = useRef(null);
  const herramientaCardRefs = useRef([]);

  // Inicializar animaciones
  useEffect(() => {
    const refs = {
      hero: {
        title: heroTitleRef.current,
        description: heroDescriptionRef.current,
        button: heroButtonRef.current,
        image: heroImageRef.current,
      },
      vacantes: {
        title: vacantesTitleRefs.current,
        description: vacantesDescriptionRef.current,
        content: vacantesContentRef.current,
      },
      recruiters: {
        image: recruitersImageRef.current,
        title: recruitersTitleRef.current,
        description: recruitersDescriptionRef.current,
        benefits: benefitItemRefs.current,
        button: recruitersButtonRef.current,
      },
      herramientas: {
        header: herramientasHeaderRef.current,
        cards: herramientaCardRefs.current,
      },
    };

    const cleanup = initAnimations(refs);

    return cleanup;
  }, []);

  const addToRefs = (el, refsArray) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  };

  return (
    <>
      <LandingNavbar className="" />
      <div className="min-h-screen w-full overflow-x-hidden">
        <main className="container-fluid mx-auto py-12 md:py-20 pt-24">
          {/* Hero Section */}
          <div className="hero-section bg-white max-w-screen-xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2
                ref={heroTitleRef}
                className="text-3xl md:text-5xl font-medium text-gray-800 leading-tight [text-wrap:balance]"
              >
                Encuentra talento todo en un solo lugar.
              </h2>
              <p
                ref={heroDescriptionRef}
                className="text-gray-800 text-lg md:text-2xl leading-relaxed"
              >
                Publica vacantes, gestiona postulaciones y lleva{" "}
                <br className="hidden md:block" />
                el control completo del proceso de selección{" "}
                <br className="hidden md:block" />
                con nuestra plataforma para reclutadores.
              </p>
              <div>
                <Link
                  ref={heroButtonRef}
                  to="/about"
                  className="bg-[#152d53] hover:bg-blue-950 text-white rounded-full px-12 py-4 inline-block transform transition-transform hover:scale-105 duration-300"
                >
                  Comienza acá
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <figure
                ref={heroImageRef}
                className="w-full max-w-sm flex-shrink-0 overflow-hidden"
              >
                <img
                  src={imgMujer || "/placeholder.svg"}
                  alt="Ejecutiva sonriente en oficina"
                  className="w-full h-auto rounded-[30px] object-cover transform transition-transform hover:scale-[1.02] duration-500"
                />
              </figure>
            </div>
          </div>

          {/* Vacantes Section */}
          <section className="bg-gray-100 mt-10 py-16 w-full">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <span
                  ref={(el) => addToRefs(el, vacantesTitleRefs)}
                  className="inline-block text-[#F88623] font-medium" // [#FAA358]
                >
                  Candidatos
                </span>
                <h2
                  ref={(el) => addToRefs(el, vacantesTitleRefs)}
                  className="text-3xl md:text-5xl font-medium  text-[#F88623] mt-2"
                >
                  ¿Buscas trabajo?
                </h2>
                <p
                  ref={vacantesDescriptionRef}
                  className="mt-4 max-w-2xl mx-auto text-lg"
                >
                  Navega entre decenas de ofertas actualizadas, postúlate <br />
                  fácilmente y haz seguimiento a tu proceso.
                </p>
              </div>

              <div ref={vacantesContentRef} className="max-w-5xl mx-auto mt-12">
                <h3 className="text-lg md:text-3xl font-medium  text-[#F88623] mb-4">
                  Vacantes disponibles
                </h3>
                <p className="mb-6">
                  Realiza la búsqueda en nuestra bolsa de trabajo actual.
                </p>
              </div>
              <div>
                <div className="hidden md:block">
                  <VacancieTable isPublic />
                </div>
                <div className="block md:hidden">
                  <VacancieCards />
                </div>
              </div>
            </div>
          </section>

          {/* Recruiters Section */}
          <section className="py-16 container mx-auto md-px-0 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div
                  ref={recruitersImageRef}
                  className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden"
                >
                  <img
                    src={imgVacantes || "/placeholder.svg"}
                    alt="Reclutadores usando la plataforma"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div
                ref={recruitersImageRef}
                className="order-1 md:order-2 space-y-6"
              >
                <span className="inline-block text-blue-600 font-medium">
                  Reclutadores
                </span>
                <h2
                  ref={recruitersTitleRef}
                  className="text-3xl font-bold text-gray-900"
                >
                  Software de reclutamiento que{" "}
                  <span className="text-blue-500">simplifica el proceso</span>
                </h2>
                <p
                  ref={recruitersDescriptionRef}
                  className="text-gray-600 mt-4"
                >
                  Desde la publicación de la vacante hasta la contratación
                  final. Gestiona todo en un solo lugar: vacantes, etapas,
                  candidatos y reclutadores. Beneficios clave:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {[
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M9 9h.01" />
                          <path d="M15 9h.01" />
                          <path d="M9 15h.01" />
                          <path d="M15 15h.01" />
                        </svg>
                      ),
                      title: "Panel de control intuitivo",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M17 6.1H3" />
                          <path d="M21 12.1H3" />
                          <path d="M15.1 18H3" />
                        </svg>
                      ),
                      title: "Seguimiento de postulaciones",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      ),
                      title: "Creación y edición de vacantes",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M3 3v18h18" />
                          <path d="m19 9-5 5-4-4-3 3" />
                        </svg>
                      ),
                      title: "Reportes y métricas de procesos",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => addToRefs(el, benefitItemRefs)}
                      className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="bg-blue-100 p-2 rounded-md">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Acerca Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div ref={herramientasHeaderRef}>
                <span className="text-blue-500">Acerca de nosotros:</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                  Nuestras herramientas para tu empresa
                </h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                  Unimos personas con oportunidades. Así de simple.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    img: imgHerramientas1,
                    title: "Tu base de talento",
                    desc: "Arma tu base de talento según lo que necesita tu empresa. Guarda, organiza y encuentra candidatos más rápido, sin perder tiempo revisando CVs sueltos.",
                  },
                  {
                    img: imgHerramientas2,
                    title: "Gestión de postulaciones",
                    desc: "Recibe, organiza y haz seguimiento de todas las personas que se postulan a tus vacantes. Visualiza fácilmente quién aplicó y mantén todo el proceso ordenado.",
                  },
                  {
                    img: imgHerramientas3,
                    title: "Software integrado",
                    desc: "Gestiona todo el proceso de reclutamiento desde el inicio al fin en una sola plataforma que te permite visualizar: Estados, contactos, detalles y prioridad con solo un click.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => addToRefs(el, herramientaCardRefs)}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="p-4">
                      <div className="h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                        <img
                          src={item.img || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer className="footer-content" />
      </div>
    </>
  );
}
