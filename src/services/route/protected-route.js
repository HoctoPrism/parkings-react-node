import React from 'react'
import Home from '../../home/home'
import Auth from '../auth/auth'

const PrivateRoute = ({Component}) => {

    let expToken;
    if (Auth.Guard()) {
        if (Component.name === 'Login') {
            return expToken = <Home />
        } else {
            return expToken = <Component />
        }
    } else {
        return expToken = <Auth.Login />
    }

}

export default PrivateRoute
