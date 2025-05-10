import RoutesViews from "./routes/RoutesViews";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <AuthProvider>
          <main className="flex-grow">
            {" "}
            <RoutesViews />
          </main>
          <Toaster position="top-center" />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
