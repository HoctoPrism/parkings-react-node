import { useState } from 'react/cjs/react.development';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form } from 'react-bootstrap';

function Login () {

    document.title = 'Connexion au site'

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            // redirect ioci
          } else {
            console.log('caca');;
          }
        } catch (err) {
          console.log(err);
        }
    }

    return <div className='text-center'>
        <h1 className='mb-3'>Connexion</h1>
        <h3 className='mb-5'>Vous devez être connecté pour accéder au site</h3>
        <Form className='d-flex justify-content-center align-items-center flex-column' onSubmit={login}>
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
    </div>
}

export default Login;
