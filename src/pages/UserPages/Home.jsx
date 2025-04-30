import React from "react";
import { FaUserGear } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";

const Home = () => {
    return (
        <div className="pt-16 flex flex-col items-center justify-center w-full min-h-[100vh] px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
            <section className="flex flex-col items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold">
                    ¡Bienvenido, Administrador!
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-center">
                    Super administrador
                </p>
            </section>

            <section className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-16 lg:gap-28">
                <article className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                    <div>
                        <FaUserPlus className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-medium mt-2 text-center">
                        Crear usuario
                    </p>
                </article>

                <article className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                    <div>
                        <FaUserGear className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-medium mt-2 text-center">
                        Modificar usuario
                    </p>
                </article>
            </section>
        </div>
    );
};

export default Home;