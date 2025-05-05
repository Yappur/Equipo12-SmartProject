import imgCandidto from "@/assets/img/candidato-seccion.png";
import img3d from "@/assets/img/3d.png";

const CandidatoSection = () => {
    return (
        <section className="bg-[#e5e7eb] py-20 px-6 font-poppins relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-28">
                {/* Texto */}
                <div className="w-full md:w-[50%] text-center md:text-left items-center md:items-start flex flex-col space-y-6 z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        ¿Eres un candidato?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700">
                        Navega por nuestra bolsa de trabajo y encuentra la oportunidad ideal para ti.
                    </p>
                    <a
                        href="#vacantes"
                        className="inline-block bg-white hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        aria-label="Ver vacantes activas"
                    >
                        Ver vacantes activas
                    </a>
                </div>


                {/* Imagen principal */}
                <figure className="w-full md:w-[45%] relative z-10">
                    <img
                        src={imgCandidto}
                        alt="Personas conversando en una reunión de candidatos"
                        className="w-full h-auto rounded-[24px] object-cover shadow-md"
                    />
                </figure>
            </div>

            {/* Figura decorativa */}
            <div className="absolute bottom-[-60px] left-[60px] w-[450px] xl:w-[520px] pointer-events-none opacity-40 animate-float">
                <img
                    src={img3d}
                    alt="Figura decorativa que simboliza la conexión entre candidatos y empresas"
                    className="w-full h-auto object-contain"
                />
            </div>
        </section>
    );
};

export default CandidatoSection;