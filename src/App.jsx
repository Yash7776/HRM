import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Nabvar from "./components/Nabvar";
import PrivateRoute from "./utils/PrivateRoutes";
import { AuthProvider } from './context/AuthContex.jsx';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Employess from "./components/EmployeeList.jsx";
import AddEmployee from "./components/AddEmployee.jsx";
import Base from "./components/Base.jsx";

function App() {
  // Use useLocation inside a component that is within BrowserRouter
  const location = useLocation();

  // Check if the current route is /login
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex min-h-screen"> {/* Flex container for sidebar and content */}
      {/* Conditionally render Base (sidebar) if not on /login */}
      {!isLoginPage && <Base />}
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Nabvar /> {/* If you have a navbar, place it here */}
        <main className="flex-1">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/employess" element={<Employess />} />
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employess/add" element={<AddEmployee />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

// Wrap App with BrowserRouter
function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;