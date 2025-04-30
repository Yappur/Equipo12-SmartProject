import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RoutesViews from "./routes/RoutesViews";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {" "}
            <RoutesViews />
          </main>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
