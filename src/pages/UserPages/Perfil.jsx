import { FaUserCircle } from "react-icons/fa";

const Perfil = () => {
    return (
        <div className="pt-16 flex flex-col items-center justify-center w-full min-h-[100vh] px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
            <FaUserCircle className="text-2xl" />
            <h2>Nombre y apellido</h2>
        </div>
    );
};

export default Perfil;