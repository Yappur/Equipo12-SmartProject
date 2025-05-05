import React from "react";
import FormRegister from "../../components/Forms/FormRegister";
import Sidebar from "../../components/Navigate/Sidebar";

const UserRegister = () => {
  return (
    <section className="pt-16 min-h-screen flex">
      <Sidebar />

      <main className="flex-grow flex items-center justify-center bg-white">
        <FormRegister />
      </main>
    </section>
  );
};

export default UserRegister;
