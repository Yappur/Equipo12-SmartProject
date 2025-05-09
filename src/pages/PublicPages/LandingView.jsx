import { Link } from "react-router-dom";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import DemoSection from "../../components/LandingPage/DemoSection";
import Footer from "../../components/Footer";

//Images
import imgMujer from "@/assets/img/mujer-hero.png";
import imgVacantes from "@/assets/img/vacantes-landing.jpg";
import imgHerramientas1 from "@/assets/img/herramientas-1.jpg";
import imgHerramientas2 from "@/assets/img/herramientas-2.jpg";
import imgHerramientas3 from "@/assets/img/herramientas-3.jpg";
import VacancieTable from "../../components/Tables/VacancieTable";

export default function LandingView() {
    return (
        <div className="min-h-screen w-full">
            <LandingNavbar />

            <main className="container-fluid mx-auto py-12 md:py-20">
                <div className="mx-20 md:px-15 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
                            Encuentra talento todo en un solo lugar.
                        </h2>
                        <p className="text-gray-600">
                            Publica vacantes, gestiona postulaciones y lleva el control
                            completo del proceso de selección con nuestra plataforma para
                            reclutadores.
                        </p>
                        <div className="pt-4">
                            <Link
                                href="#"
                                className="bg-blue-900 hover:bg-blue-950 text-white rounded-full px-6 py-4"
                            >
                                Comienza acá
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <figure className="w-full max-w-md flex-shrink-0">
                            <img
                                src={imgMujer}
                                alt="Ejecutiva sonriente en oficina"
                                className="w-full h-auto rounded-[30px] object-cover"
                            />
                        </figure>
                    </div>
                </div>

                {/* Vacantes Section */}
                <section className="bg-gray-50 mt-10 py-16 w-full">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-8">
                            <span className="text-orange-500 font-medium">Candidatos</span>
                            <h2 className="text-3xl md:text-4xl font-semibold text-orange-500 mt-2">
                                ¿Buscas trabajo?
                            </h2>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                                Navega entre decenas de ofertas actualizadas, postúlate
                                fácilmente y haz seguimiento a tu proceso.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto mt-12">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Vacantes disponibles
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Realiza la búsqueda en nuestra bolsa de trabajo actual.
                            </p>
                            <div>
                                <VacancieTable isPublic/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recruiters Section */}
                <section className="py-16 container mx-auto md-px-0 px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="order-2 md:order-1">
                            <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden">
                                <img
                                    src={imgVacantes}
                                    alt="Reclutadores usando la plataforma"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <span className="text-blue-600 font-medium">Reclutadores</span>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Software de reclutamiento que{" "}
                                <span className="text-blue-500">simplifica el proceso</span>
                            </h2>
                            <p className="text-gray-600 mt-4">
                                Desde la publicación de la vacante hasta la contratación final.
                                Gestiona todo en un solo lugar: vacantes, etapas, candidatos y
                                reclutadores. Beneficios clave:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-md">
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
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Panel de control intuitivo
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-md">
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
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Seguimiento de postulaciones
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-md">
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
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Creación y edición de vacantes
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-md">
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
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Reportes y métricas de procesos
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link
                                    href="#"
                                    className="bg-blue-900 hover:bg-blue-950 text-white rounded-full px-6 py-4"
                                >
                                    Solicita Acceso
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Acerca Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <span className="text-blue-500">Acerca de nosotros:</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            Nuestras herramientas para tu empresa
                        </h2>
                        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                            Unimos personas con oportunidades. Así de simple.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-4">
                                    <div className="h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                                        <img
                                            src={imgHerramientas1}
                                            alt="Base de talento"
                                            width={300}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                        Tu base de talento
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Arma tu base de talento según lo que necesita tu empresa.
                                        Guarda, organiza y encuentra candidatos más rápido, sin
                                        perder tiempo revisando CVs sueltos.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-4">
                                    <div className="h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                                        <img
                                            src={imgHerramientas2}
                                            alt="Gestión de postulaciones"
                                            width={300}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                        Gestión de postulaciones
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Recibe, organiza y haz seguimiento de todas las personas que
                                        se postulan a tus vacantes. Visualiza fácilmente quién
                                        aplicó y mantén todo el proceso ordenado.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-4">
                                    <div className="h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                                        <img
                                            src={imgHerramientas3}
                                            alt="Software integrado"
                                            width={300}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                        Software integrado
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Gestiona todo el proceso de reclutamiento desde el inicio al
                                        fin en una sola plataforma que te permite visualizar:
                                        Estados, contactos, detalles y prioridad con solo un click.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
