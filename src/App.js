import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./home/home";
import Login from "./login/login";
import Parking from "./parking/parking";
import PrivateRoute from "./server/security/protected-route";

function App () {

  class Navbar extends React.Component {

    constructor(props) {
      super(props);
      const activeLink = ({ isActive }) => (isActive ? 'active' : 'inactive')
    }

    componentDidMount() {
      document.title = this.props.title
    }

    render() {
      return <nav className="py-3 mb-5 fs-3 alt-bg-sombre">
        <div className="ms-2">Projet React/Node : </div>
        <div className="text-center">
          <NavLink to="/" className={this.activeLink} >Accueil</NavLink>
          <NavLink to="parkings" className={this.activeLink} >Parkings</NavLink>
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