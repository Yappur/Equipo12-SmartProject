import React from "react";
import DemoSection from "./LandingPage/DemoSection";

const Footer = () => {
  return (
    <>
    <DemoSection />
    <footer className="bg-[#162C4D] text-white py-10 px-6">
      

      {/* Línea final */}
      <div>
        &copy; {new Date().getFullYear()} Talen Match - Foo Talent
      </div>
    </footer>
    </>
  );
};

export default Footer;
