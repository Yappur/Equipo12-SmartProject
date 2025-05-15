import RoutesViews from "./routes/RoutesViews";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import CustomToaster from "./components/Modals/CustomToaster";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <RoutesViews />
          </main>
          <CustomToaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
