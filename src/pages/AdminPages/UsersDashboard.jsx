import React from "react";
import UserTable from "../../components/Tables/UserTable";
import { cambiarTitulo } from "../../hooks/useCambiarTitulo";

const UsersDashboard = () => {
  cambiarTitulo("PanelUsuarios");
  return (
    <>
      <div className="">
        <UserTable />
      </div>
    </>
  );
};

export default UsersDashboard;
