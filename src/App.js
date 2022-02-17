import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./home/home";
import Parking from "./parking/parking";

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
        <Route path="/" element={<Home />} >Accueil</Route>
        <Route path="parkings" element={<Parking />} >Parking</Route>
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