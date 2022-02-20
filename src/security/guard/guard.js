import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import jwtDecode from 'jwt-decode';

function Guard () {

    const token = localStorage.getItem('access_token')
    let activeToken = true
    
    if (token) {   
        const decodedToken = jwtDecode(token)
        if (decodedToken && decodedToken.exp * 1000 < Date.now() === true) {
            localStorage.removeItem('access_token')
            return activeToken = false
        } else {
            return activeToken
        }
    } else {
        return activeToken = false
    }

}

export default Guard;
