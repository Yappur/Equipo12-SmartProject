import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RoutesViews from "./routes/RoutesViews";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <RoutesViews />
        <Footer />
      </Router>
    </>
  );
}

export default App;
