import jwtDecode from 'jwt-decode'
import React from 'react'
import Home from '../../home/home'
import Login from '../../login/login'

const PrivateRoute = ({Component}) => {

    let token = jwtDecode(localStorage.getItem('access_token'))
    let expToken;

    if (token && token.exp * 1000 < Date.now() === false) {
        if (Component.name === 'Login') {
            return expToken = <Home />
        } else {
            return expToken = <Component />
        }
    } else {
        return expToken = <Login />
    }

}

export default PrivateRoute
