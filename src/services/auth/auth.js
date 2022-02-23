import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import jwtDecode from 'jwt-decode';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import { useEffect, useState } from 'react/cjs/react.development';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loggedFalse, loggedTrue } from '../../features/loginButton/loginButtonSlice';

const token = localStorage.getItem('access_token')

function Guard () {
  
  const dispatch = useDispatch()

  if (token) {   
    const decodedToken = jwtDecode(token)
    if (decodedToken && decodedToken.exp * 1000 < Date.now() === true) {
      localStorage.removeItem('access_token')
      dispatch(loggedFalse())
      return false // token expired
    } else {
      dispatch(loggedTrue())
      return true // token valid
    }
  } else {
    dispatch(loggedFalse())
    return false // no token
  }

}

function Register () {

  document.title = 'Inscription au site'

  let navigate = useNavigate();
  let location = useLocation();

  const { register, watch, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ mode: "onChange" });
  const username = watch('username', "");
  const password = watch('password', "");
  const [role, setRole] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [toastRegister, setShowToastRegister] = useState(false);
  const onSubmit = e => registerForm();

  const min = useRef()
  const max = useRef()
  const num = useRef()
  const spec = useRef()

  const minuscule = '(?=.*[a-z])'; // allow to test lowercase
  const majuscule = '(?=.*[A-Z])'; // allow to test uppercase
  const number = '(?=.*[0-9])'; // allow to test number
  const special = '(?=.*[!@#:$%^&])'; // allow to test special character
  
  useEffect(() => {
    // Check if password contains a lowercase
    if (password.match(minuscule)) {
      min.current.style.backgroundColor = "#4F9747"; // if yes, bg green
    } else {
      min.current.style.backgroundColor = "#ce0033"; // if not, bg red
    }

    // Check if password contains a uppercase
    if (password.match(majuscule)) {
      max.current.style.backgroundColor = "#4F9747"; // if yes, bg green
    } else {
      max.current.style.backgroundColor = "#ce0033"; // if not, bg red
    }

    // Check if password contains a number
    if (password.match(number)) {
      num.current.style.backgroundColor = "#4F9747"; // if yes, bg green
    } else {
      num.current.style.backgroundColor = "#ce0033"; // if not, bg red
    }

    // Check if password contains a special character
    if (password.match(special)) {
      spec.current.style.backgroundColor = "#4F9747"; // if yes, bg green
    } else {
      spec.current.style.backgroundColor = "#ce0033"; // if not, bg red
    }

  }, [password])

  let registerForm = async () => {
    setErrMessage('')
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
        setErrMessage('')
        setShowToastRegister(true)
        navigate('/', { replace: true });
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
      <Form className='w-25 mt-4' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='fw-bold'>Email</Form.Label>
          <Form.Control
            className='alt-bg-sombre text-clair border-0 shadow mb-2'
            type="text" 
            placeholder="username"
            {...register("username", {
              required: 'Veuillez saisir un email', 
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Veuillez saisir un email valide"
              }
            })}
          />
          { errMessage ? <div className='text-danger error'>{errMessage.username}</div> : null} {/* gestion d'erreur prevenant de node */}
          { errors.username ? <div className='text-danger error'>{errors.username.message}</div> : null} {/* gestion d'erreur prevenant de react */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='fw-bold'>Mot de passe</Form.Label>
          <Form.Control
            className='alt-bg-sombre text-clair border-0 shadow mb-2'
            type="password"
            placeholder="password"
            {...register("password", {
              required: 'Veuillez saisir un mot de passe', 
              minLength: {
                value: 8,
                message: "Le mot de passe doit faire au minimum 8 caractères"
              }, 
              pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                message: "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spéciale"
              }
            })}
          />
          { errMessage ? <div className='text-danger error'>{errMessage.password}</div> : null} {/* gestion d'erreur prevenant de node */}
          { errors.password ? <div className='text-danger error'>{errors.password.message}</div> : null} {/* gestion d'erreur prevenant de react */}
        </Form.Group>

        <div className="regex">
          <div className='d-flex justify-content-start align-items-center'>
              <div ref={min} className="bubble"></div>
              <div>Le mot de passe doit contenir au moins une minuscule</div>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
              <div ref={max} className="bubble"></div>
              <div>Le mot de passe doit contenir au moins une majuscule</div>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
              <div ref={num} className="bubble"></div>
              <div>Le mot de passe doit contenir au moins un chiffre</div>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
              <div ref={spec} className="bubble"></div>
              <div>Le mot de passe doit contenir au moins un caractère spécial</div>
          </div>
        </div>

        <Button type="submit" disabled={!isDirty || !isValid} className='bg-clair border-0 text-sombre'>VALIDER</Button>
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
    const dispatch = useDispatch()

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.pathname || "/"; //travail sur la redirection
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
            navigate(from, { replace: true });
            dispatch(loggedTrue())
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
      <Button href='register' className="bg-clair text-sombre border-0 my-2">Créer un compte</Button>
      { errMessage ? <h4 className='fw-bold text-danger'>{errMessage}</h4> : null}
      <div className='d-flex justify-content-center align-items-center flex-column '>
        <Form className='mt-4 w-25' onSubmit={login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='fw-bold'>Email</Form.Label>
            <Form.Control
              className='alt-bg-sombre text-clair border-0 shadow mb-2'
              type="text" 
              placeholder="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className='fw-bold'>Mot de passe</Form.Label>
              <Form.Control
                  className='alt-bg-sombre text-clair border-0 shadow mb-2'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe" 
              />
          </Form.Group>

          <Button type="submit" className='bg-clair border-0 text-sombre'>Connexion</Button>
        </Form>
      </div>

      <ToastContainer position="bottom-center">
        <Toast className="mb-3" delay={3000} autohide show={toastLogged} onClose={() => setShowToastLogged(false)}>
          <Toast.Header>
            <strong className="me-auto text-sombre">Vous êtes connecté !</strong>
          </Toast.Header>
        </Toast>
      </ToastContainer> 
    </div>
}

function Logout () {
  const dispatch = useDispatch()
  dispatch(loggedFalse())
  localStorage.removeItem('access_token');
  return true
}

export default {Guard, Register, Login, Logout};
