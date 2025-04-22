import React from "react";
import UserTable from "../../components/Tables/UserTable";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const UserPanel = () => {
  return (
    <>
      <div className="container mx-auto my-20">
        <Link to="/admin" className="mt-5 text-blue-500 flex">
          Volver atras <ChevronRight />
        </Link>
        <UserTable />
      </div>
    </>
  );
};

export default UserPanel;
