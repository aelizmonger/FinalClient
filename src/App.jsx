import "./App.css"
import { useEffect, useState } from "react";
//import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";



import LoginComponent from "./Components/LoginRegister/Login";
import RegisterComponent from "./Components/LoginRegister/Register";
import NavbarComponent from "./Components/NavBar/NavBar";
import MainComponent from "./Components/Main/main";
import UploadComponent from "./Components/FileUpload/FileUpload";
//import ImageGrid from "./Components/FileUpload/ImageGrid";
//import Modal from "./Components/FileUpload/modal";

function App() {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [view, setView] = useState("home");
 //const [selectedImg, setSelectedImg] = useState(null);

  const changeView = (newView) => {
   setView(newView);
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const getSessionToken = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined
    ) {
      setToken(localStorage.getItem("token"));
    } else {
      console.log("no session token");
    }
  };

  const updateSessionToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const deleteSessionToken = () => {
    localStorage.clear();
    setToken(null);
    console.log("token deleted");
  };

  useEffect(getSessionToken, []);

  return (
    <div className="App">
      <NavbarComponent
        isLogin={isLogin}
        toggleLogin={toggleLogin}
        token={token}
        deleteSessionToken={deleteSessionToken}
        changeView={changeView}
      />
      {token ? (
        view === "home" ? (
          <>
            <MainComponent changeView={changeView} token={token} />
          </>
        ) : 
        view === "saved" ? (
          <>
         
          <UploadComponent />
        
            )
            </>
        ) : (
          <h1>INVALID VIEW</h1>
        )
      ) : isLogin ? (
        <LoginComponent updateSessionToken={updateSessionToken} />
      ) : (
        <RegisterComponent updateSessionToken={updateSessionToken} />
      )}
    </div>
  );
}

export default App;