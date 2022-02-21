import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./home/home";
import Parking from "./parking/parking";
import PrivateRoute from "./server/security/protected-route";
import Auth from "./services/auth";

function App () {

  class Navbar extends React.Component {

    constructor(props) {
      super(props);
      document.title = "Accueil"
      const activeLink = ({ isActive }) => (isActive ? 'active' : 'inactive')
      this.state = {
        logButton: 'CONNEXION'
      }
      Auth.Guard()
    }
    
    componentDidMount(){
      if (Auth.Guard()) {
        return this.setState({logButton : "DECONNEXION"})
      } else {
        return this.state.logButton
      }
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
            { Auth.Guard() ? (
              <Button 
                onClick={ () => { Auth.Logout() } }
                className="bg-clair text-sombre border-0 px-4 py-2 me-3"> 
                {this.state.logButton} 
              </Button>
            ) : (
              <div>
                <Button
                  href='register'
                  className="bg-clair text-sombre border-0 px-4 py-2"> 
                  INSCRIPTION 
                </Button>
                <Button
                  href='login'
                  className="bg-clair text-sombre border-0 px-4 py-2"> 
                  {this.state.logButton} 
                </Button>
              </div>
            ) 
            }
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
        <Route path="login" element={ <PrivateRoute Component={Auth.Login} /> } >Login</Route>
        <Route path="register" element={ <Auth.Register /> } >Register</Route>
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