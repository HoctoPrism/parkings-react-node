import { useEffect, useState } from 'react/cjs/react.development';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';
import { Button, Modal } from 'react-bootstrap';

function App (){

  document.title = "First";

  let parkings = "parkings";

  const [data, setData] = useState(null); // array of data
  const [loading, setLoading] = useState(true); // WIP
  const [error, setError] = useState(null); // WIP
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  // Handle open and close for modal
  const [newPark, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // list all parkings
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/parkings`)
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // create a new parking
  let newParkForm = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/parkings/", {
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          id: parseInt(id),
          name: name,
          type: type,
          city: city,
        }),
      });
      if (res.status === 200) {
        setName("");
        setType("");
        setCity("");
        setID("");
        setMessage("Parking ajouté (refresh pas implémenté encore)");
        console.log();
      } else {
        setMessage("Une erreur est survenue");
      }
    } catch (err) {
      console.log(err);
    }
}

  // delete a parking
  function deleteParking(id){
    try {
      fetch('http://127.0.0.1:8000/parkings/' + id, {
        method: 'DELETE',
      })
      .then(res => res.text())
      .then(res => console.log('deleted'))
    } catch (err) {
      console.log(err);
    }
  }
    
  return (
    <div className='d-flex flex-column'>
      <h1 className='text-center my-5'>Liste des {parkings}</h1>
      <button className='btn btn-primary my-3 align-self-center' onClick={handleShow}>Ajouter un parking</button>
      <ul className='d-flex'>{data && data.map(({ id, name, city, type }) => (
          <li key={id} className="card mx-3 w-100 bg-secondary text-white">
            <div>{id}</div>
            <div>{name}</div>
            <div>{type}</div>
            <div>{city}</div>
            <div>
              <button className='btn btn-danger' onClick={deleteParking.bind(this, id)}><Icon.Trash /></button>
            </div>
          </li>
        ))}
      </ul>
      <Modal show={newPark} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un parking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={newParkForm}>
          <input type="number" value={id} placeholder="ID" onChange={(e) => setID(e.target.value)}/>
          <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
          <input type="text" value={type} placeholder="Type" onChange={(e) => setType(e.target.value)}/>
          <input type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
          <input type="submit" value="Envoyer"/>
          <div className="fw-bold text-center mt-3">{message ? <p>{message}</p> : null}</div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}

export default App;
