import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RoutesViews from "./routes/RoutesViews";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Contenedor raíz de la app con flex */}
      <Router>
        <Navbar />
        <main className="flex-grow"> {/* El contenido principal crece para llenar el espacio disponible */}
          <RoutesViews />
        </main>
        <Footer /> {/* El footer siempre se mantiene abajo */}
      </Router>
    </div>
  );
}

export default App;

