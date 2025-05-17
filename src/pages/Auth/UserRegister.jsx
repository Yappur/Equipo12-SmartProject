import React from "react";
import FormRegister from "../../components/Forms/FormRegister";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

const UserRegister = () => {
  useCambiarTitulo("CrearUsuario");
  return (
    <div className="">
      <FormRegister />
    </div>
  );
};

export default UserRegister;
