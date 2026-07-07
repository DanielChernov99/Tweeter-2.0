import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { HashRouter, Route, Routes } from "react-router";
import { UserProvider } from "./context/UserContext";
import { TweetsProvider } from "./context/TweetsContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <UserProvider>
          <NavBar />

          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <TweetsProvider>
                    <HomePage />
                  </TweetsProvider>
                </ProtectedRoute>
              }
            />

            <Route
              path="/UserPage"
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;