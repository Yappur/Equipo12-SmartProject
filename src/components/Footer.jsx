import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#162C4D] text-white py-10 px-6">
      

      {/* Línea final */}
      <div>
        &copy; {new Date().getFullYear()} Talen Match - Foo Talent
      </div>
    </footer>
  );
};

export default Footer;
