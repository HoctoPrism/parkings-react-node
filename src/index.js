import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './services/route/protected-route';
import Home from "./home/home";
import Parking from "./parking/parking";
import Auth from "./services/auth/auth";
import { Provider } from 'react-redux';
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Routes>
          <Route exact path="/" element={ <PrivateRoute Component={Home} /> } >Accueil</Route>
          <Route path="parkings" element={ <PrivateRoute Component={Parking} /> } >Parking</Route>
          <Route path="login" element={ <PrivateRoute Component={Auth.Login} /> } >Login</Route>
          <Route path="logout" element={ <PrivateRoute Component={Auth.Logout} /> } >Logout</Route>
          <Route path="register" element={ <Auth.Register /> } >Register</Route>
          <Route path="*" element={
            <div className="text-center fs-1 fw-bold">
              <p>Il n'y a rien ici !</p>
              <p>:'(</p>
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
