import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import NavBar from "./components/Navbar";
import { HashRouter, Route, Routes } from "react-router";
import { UserProvider } from "./context/UserContext";
import { TweetsProvider } from "./context/TweetsContext";

function App() {
  return (
    <HashRouter>
      <UserProvider>
        <TweetsProvider>
          <NavBar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/UserPage" element={<UserPage />} />
          </Routes>
        </TweetsProvider>
      </UserProvider>
    </HashRouter>
  );
}

export default App;