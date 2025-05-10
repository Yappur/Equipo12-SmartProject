import { Link } from "react-router-dom";
import { FaUserGear, FaMagnifyingGlass, FaUserPlus } from "react-icons/fa6";
import crearUserIcon from "../../assets/img/DesingExports/crearUser.svg";
import bagIcon from "../../assets/img/DesingExports/bag.svg";

const RecruiterView = () => {
  return (
    <div className="flex ">
      <div className="pt-16 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
        <section className="flex flex-col items-center mt-10 justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-medium">
            ¡Bienvenido a{" "}
            <span className="text-[#152d53] font-bold">Talent</span>{" "}
            <span className="text-orange-400 italic font-bold">Match</span>!
          </h1>
          <p className="text-2xl sm:text-xl md:text-2xl text-center font-light">
            ¿Qué vas a hacer hoy? Puedes dar estos primeros pasos:
          </p>
        </section>

        <section className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-16 lg:gap-40 text-gray-500 ">
          <Link
            to="/crear/vacante"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl transition-all hover:bg-slate-50 duration-300 transform hover:scale-[1.02]"
          >
            <img src={bagIcon} alt="Bag" className="ml-8" />
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Nueva Vacante
            </p>
          </Link>

          <Link
            to="/reclutador/candidatos"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl transition-all hover:bg-slate-50 duration-300 transform hover:scale-[1.02]"
          >
            <img src={crearUserIcon} alt="CreateUser" className="ml-5" />
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Agregar Candidato
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default RecruiterView;
