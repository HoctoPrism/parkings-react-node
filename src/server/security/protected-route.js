import jwtDecode from 'jwt-decode'
import React from 'react'
import Home from '../../home/home'
import Login from '../../security/login/login'

const PrivateRoute = ({Component}) => {

    const token = localStorage.getItem('access_token');
    let expToken;

    if (token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken && decodedToken.exp * 1000 < Date.now() === false) {
            if (Component.name === 'Login') {
                return expToken = <Home />
            } else {
                return expToken = <Component />
            }
        } else {
            return expToken = <Login />
        }
    } else {
        return expToken = <Login />
    }


}

export default PrivateRoute
