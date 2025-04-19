import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const App404 = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-4xl font-bold uppercase">Error 404 </h1>
        <span>Página no encontrada :( {""}</span>
        <Link to="/" className="mt-3 text-blue-500 flex">
          Volver al inicio <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default App404;
