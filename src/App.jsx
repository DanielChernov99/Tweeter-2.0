import { useState } from 'react'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import NavBar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router";

function App() {


  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "Guest";
  });

  function checkValidName(name) {
    if (!name || name.trim() === "") {
      return false;
    }

    if (/\d/.test(name)) {
      return false;
    }

    return true;
  }

  const changeName = (newName) => {
    if (!checkValidName(newName)) {
      return false;
    }

    const cleanName = newName.trim();

    setUserName(cleanName);
    localStorage.setItem("userName", cleanName);

    return true;
  }



  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage userName={userName} />}/>
        <Route path="/UserPage" element={<UserPage userName={userName} changeName={changeName}/>}/>
      </Routes>
        
    </BrowserRouter>
  )
}

export default App
