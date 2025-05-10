import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* <DemoSection /> */}

      <footer className="bg-[#162C4D] text-white py-10 px-6">
         <div className="flex flex-col items-center space-y-4">
        <h1 className="text-xl font-medium">Nuestras redes</h1>
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
        {/* Línea final */}
        <div>
          &copy; {new Date().getFullYear()} Talen Match - Foo Talent
        </div>
      </footer>
    </>
  );
};

export default Footer;
