import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import Logout from "./components/auth/Logout.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./components/shared/PrivateRoute.jsx"; // Import the PrivateRoute component
import Notification from "./components/notifications/Notifications.jsx"; // Import your Notification component

function App() {
  return (
    <>
      <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              
              {/* Protected routes */}
              <Route
                path="/notifications"
                element={
                  <PrivateRoute>
                    <Notification />
                  </PrivateRoute>
                }
              />
              <Route path="/notification" element={<Notification />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;