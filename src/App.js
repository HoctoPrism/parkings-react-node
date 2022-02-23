import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import './App.css';
import LoginButton from "./features/loginButton/LoginButton";
import './services/auth/auth.css'

function App () {

  function Navbar () {

    document.title = "Accueil"
    const activeLink = ({ isActive }) => (isActive ? 'active' : 'inactive')
    
    useEffect(() => {
    })

      return (<nav className="py-3 mb-5 fs-3 alt-bg-sombre">
        <div className="ms-2">Projet React/Node : </div>
        <div className="ms-3 d-flex justify-content-between">
          <div>
            <NavLink to="/" className={activeLink} >Accueil</NavLink>
            <NavLink to="parkings" className={activeLink} >Parkings</NavLink>
          </div>
          <div>
            <LoginButton />
          </div>
        </div>
      </nav>
    )
  }

  return <div>
    <Navbar />
  </div>
}

export default App;