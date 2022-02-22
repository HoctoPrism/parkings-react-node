import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import jwtDecode from 'jwt-decode';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { useState } from 'react/cjs/react.development';
import App from '../App';

const token = localStorage.getItem('access_token')

function Guard () {
  
  if (token) {   
    const decodedToken = jwtDecode(token)
    if (decodedToken && decodedToken.exp * 1000 < Date.now() === true) {
      localStorage.removeItem('access_token')
      return false // token expired
    } else {
      return true // token valid
    }
  } else {
    return false // no token
  }

}

function Register () {

  document.title = 'Inscription au site'

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [toastRegister, setShowToastRegister] = useState(false);

  let register = async (e) => {
      e.preventDefault();
      try {
        let register = {
          username: username,
          password: password,
          role: role
        }
        let res = await fetch("http://127.0.0.1:8000/register/", {
          method: "POST",
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(register),
        });
        if (res.status === 200) {
          setShowToastRegister(true)
        } else {
          res.json().then(( errValue => setErrMessage(errValue) ));
        }
      } catch (err) {
        console.log(err);
      }
  }

  return <div className='text-center'>
    <h1 className='mb-3'>Inscription au site</h1>
    <div className='d-flex justify-content-center align-items-center'>
      <Form className='w-25 mt-4' onSubmit={register}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        { errMessage ? <div className='fw-bold text-danger'>{errMessage.username}</div> : null}
          <Form.Label className='fw-bold'>Email</Form.Label>
          <Form.Control
            className='alt-bg-sombre text-clair border-0 shadow'
            name="emailOrUsername"
            type="text" 
            placeholder="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        { errMessage ? <div className='fw-bold text-danger'>{errMessage.password}</div> : null}
            <Form.Label className='fw-bold'>Mot de passe</Form.Label>
            <Form.Control
              className='alt-bg-sombre text-clair border-0 shadow'
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe" 
            />
        </Form.Group>

        <Button type="submit" className='bg-clair border-0 text-sombre'>VALIDER</Button>
      </Form>
    </div>

    <ToastContainer position="bottom-center">
      <Toast className="mb-3" delay={3000} autohide show={toastRegister} onClose={() => setShowToastRegister(false)}>
        <Toast.Header>
          <strong className="me-auto text-sombre">Inscription terminé ! Vous pouvez vous connecter !</strong>
        </Toast.Header>
      </Toast>
    </ToastContainer> 
  </div>
}

function Login () {

    document.title = 'Connexion au site'

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [toastLogged, setShowToastLogged] = useState(false);

    let login = async (e) => {
        e.preventDefault();
        try {
          let login = {
            username: username,
            password: password,
          }
          let res = await fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(login),
          });
          if (res.status === 200) {
            res.json().then( (resValue) => localStorage.setItem('access_token', resValue.token) );
            setShowToastLogged(true)
          } else {
            res.json().then(( errValue => setErrMessage(errValue.message) ));
          }
        } catch (err) {
          console.log(err);
        }
    }

    return <div className='text-center'>
      <h1 className='mb-3'>Connexion</h1>
      <h3>Vous devez être connecté pour accéder au site</h3>
      { errMessage ? <h4 className='fw-bold text-danger'>{errMessage}</h4> : null}
      <Form className='d-flex justify-content-center align-items-center flex-column mt-4' onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='fw-bold'>Email ou username</Form.Label>
          <Form.Control
            name="emailOrUsername"
            type="text" 
            placeholder="email ou username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='fw-bold'>Mot de passe</Form.Label>
            <Form.Control
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe" 
            />
        </Form.Group>

        <Button type="submit" className='bg-clair border-0 text-sombre'>Connexion</Button>
      </Form>

      <ToastContainer position="bottom-center">
        <Toast className="mb-3" delay={3000} autohide show={toastLogged} onClose={() => setShowToastLogged(false)}>
          <Toast.Header>
            <strong className="me-auto text-sombre">Vous êtes connecté !</strong>
          </Toast.Header>
        </Toast>
      </ToastContainer> 
    </div>
}

function Logout() {
  localStorage.removeItem('access_token')
  return window.location.href = '/'
}

export default {Guard, Register, Login, Logout};
