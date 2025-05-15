import React from "react";
import { Link } from "react-router-dom";
import { SiLinkedin } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#162C4D] text-white py-8 flex flex-col">
        <div className="max-w-screen-3xl mx-30 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 xl:gap-40">
            <div className="flex flex-col space-y-2">
              <h2 className="font-semibold text-2xl tracking-wide">
                {" "}
                <span className="text-white">Talent </span>
                <span className="text-orange-400 italic">Match</span>
              </h2>
              <p className="text-sm text-gray-300">
                Todos los derechos reservados a Talent Match{" "}
                {new Date().getFullYear()}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium">Contáctanos</h3>
              <p className="xl:text-sm text-gray-300 ">
                Envíanos un mensaje a{" "}
                <span className="md:text-xs sm:text-sm">
                  talent.match.group@gmail.com
                </span>
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium ">Quiénes somos</h3>
              <Link
                to="/about"
                className="text-sm text-gray-300 hover:text-blue-300 transition-colors"
              >
                Conócenos
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-medium">Seguimos</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/thetalentmatch/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <SiLinkedin className="text-xl text-blue-500 bg-white rounded-xs" />{" "}
                    Linkedin
                  </span>
                </a>
              </div>
            </div>
          </div>
          {/* Línea final */}
          <div className="mt-8 pt-4 text-sm text-gray-300">
            Parte del programa Smart Project - Foo Talent Group
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
