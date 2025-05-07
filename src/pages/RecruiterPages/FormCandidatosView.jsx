import React from "react";
import FormCandidatos from "../../components/forms/FormCandidatos";
import Sidebar from "../../components/Navigate/Sidebar";
const FormCandidatosView = () => {
    return (
      <section className="pt-16 min-h-screen flex">
        <div className="flex ">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />
      </div>
  
        <main className="flex-grow flex items-center justify-center bg-white">
          <FormCandidatos />
        </main>
      </section>
    );
  };
  
  export default FormCandidatosView;
  