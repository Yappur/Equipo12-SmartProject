// HeroSection.jsx
import imgMujer from '@/assets/img/mujer-hero.png';
import formas3d from '@/assets/img/formas3d.png';

const HeroSection = () => {
    return (
        <section className="relative px-10 flex flex-col lg:flex-row items-center mx-auto max-w-7xl py-16 gap-10 lg:gap-36 bg-white font-inter">
            <figure className="w-full max-w-md flex-shrink-0">
                <img
                    src={imgMujer}
                    alt="Ejecutiva sonriente en oficina"
                    className="w-full h-auto rounded-[30px] object-cover"
                />
            </figure>
            <div className="text-center gap-y-5 lg:text-left">
                <header>
                    <h1 className="text-4xl md:text-7xl font-semibold text-gray-900">
                        Talent <em className="italic font-normal">Match</em>
                    </h1>
                    <p className="mt-4 text-2xl text-gray-700 leading-relaxed ">
                        Como agilizar tu día<br className="hidden md:block" />
                        reclutando nuevo talento para<br className="hidden md:block" />
                        tu empresa.
                    </p>
                </header>
                <nav className="mt-10">
                    <a
                        href="#mas-informacion"
                        className="inline-block cursor-pointer bg-[#d5d5d5] text-black py-3 px-8 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                        aria-label="Más información sobre Talent Match"
                    >
                        Más información
                    </a>
                </nav>
            </div>
            <img
                src={formas3d}
                alt="Decoración abstracta en 3D"
                className="absolute bottom-5 right-0 md:size-40 lg:size-80 animate-float hidden lg:block"
                aria-hidden="true"
            />
        </section>
    );
};

export default HeroSection;