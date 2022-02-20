import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./home/home";
import Login from "./security/login/login";
import Parking from "./parking/parking";
import PrivateRoute from "./server/security/protected-route";
import Guard from "./security/guard/guard";

function App () {

  class Navbar extends React.Component {

    constructor(props) {
      super(props);
      const activeLink = ({ isActive }) => (isActive ? 'active' : 'inactive')
      Guard()
    }

    componentDidMount() {
      document.title = this.props.title
      Guard()
    }

    render() {
      return <nav className="py-3 mb-5 fs-3 alt-bg-sombre">
        <div className="ms-2">Projet React/Node : </div>
        <div className="ms-3 d-flex justify-content-between">
          <div>
            <NavLink to="/" className={this.activeLink} >Accueil</NavLink>
            <NavLink to="parkings" className={this.activeLink} >Parkings</NavLink>
          </div>
          <div>
            <Button href="login" className="bg-clair text-sombre border-0 px-4 py-2" > { Guard() === false ? 'CONNEXION' : 'DECONNEXION' } </Button>
          </div>
        </div>
      </nav>
    }
  }

  return <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ <PrivateRoute Component={Home} /> } >Accueil</Route>
        <Route path="parkings" element={ <PrivateRoute Component={Parking} /> } >Parking</Route>
        <Route path="login" element={ <PrivateRoute Component={Login} /> } >Login</Route>
        <Route path="*" element={
          <div className="text-center fs-1 fw-bold">
            <p>Il n'y a rien ici !</p>
            <p>:'(</p>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;