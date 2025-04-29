import React from "react";
import { FaUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const Home = () => {
    return (
        <div className="pt-16 flex flex-col items-center justify-center w-full min-h-[100vh] px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
            <section className="flex flex-col items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold">
                    Bienvenido a Talent Match
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-center">
                    ¿Qué vas a hacer hoy? Puedes dar estos primeros pasos:
                </p>
            </section>

            <section className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-16 lg:gap-28">
                <article className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                    <div>
                        <IoSearch className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-medium mt-2 text-center">
                        Nuevo candidato
                    </p>
                </article>

                <article className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                    <div>
                        <FaUser className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-medium mt-2 text-center">
                        Nueva vacante
                    </p>
                </article>
            </section>
        </div>
    );
};

export default Home;