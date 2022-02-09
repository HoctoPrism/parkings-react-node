import { useEffect, useState } from 'react/cjs/react.development';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';
import { Button, Modal } from 'react-bootstrap';

function App (){

  document.title = "First";

  let parkings = "parkings";

  const [data, setData] = useState(null); // array of data
  const [oneParking, setOneParking] = useState(""); // get parking
  const [loading, setLoading] = useState(true); // WIP
  const [error, setError] = useState(null); // WIP
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  // Handle open and close for modal
  const [newPark, setShowNew] = useState(false);
  const [editPark, setShowEdit] = useState(false);
  const [delPark, setShowDelete] = useState(false);

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
      } else {
        setMessage("Une erreur est survenue");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // edit a parking
  let editParkForm = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/parkings/" + oneParking.id, {
        method: "PATCH",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          id: id ? id : parseInt(oneParking.id),
          name: name ? name : oneParking.name,
          type: type ? type : oneParking.type,
          city: city ? city : oneParking.city,
        }),
      });
      if (res.status === 200) {
        setMessage("Parking modifié (refresh pas implémenté encore)");
      } else {
        setMessage("Une erreur est survenue");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // delete a parking
  let deleteParking = async (e) =>{
    e.preventDefault();
    try {
      let res = await fetch('http://127.0.0.1:8000/parkings/' + oneParking.id, {
        method: 'DELETE'
      })
      if (res.status === 200) {
        setMessage("Parking supprimé (refresh pas implémenté encore)");
      } else {
        setMessage("Une erreur est survenue");
      }
    } catch (err) {
      console.log(err);
    }
  }
    
  return (
    <div className='d-flex flex-column'>
      <h1 className='text-center my-5'>Liste des {parkings}</h1>
      <button className='btn btn-primary my-3 align-self-center' onClick={ () => setShowNew(true) }>Ajouter un parking</button>
      <ul className='d-flex'>{data && data.map(({ id, name, city, type }) => (
          <li key={id} className="card mx-3 w-100 bg-secondary text-white">
            <div>ID : {id}</div>
            <div>Nom : {name}</div>
            <div>Type : {type}</div>
            <div>Ville : {city}</div>
            <div>
              <button className='btn btn-success' onClick={ () => {
                setShowEdit(true)
                setOneParking({id: id, name: name, type: type, city: city})
              }}>
              <Icon.Pencil /></button>
              <button className='btn btn-danger' onClick={ () => {
                setShowDelete(true)
                setOneParking({id: id, name: name})
              }}>
              <Icon.Trash /></button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal pour le nouveau parking */}
      <Modal show={newPark} onHide={ () => setShowNew(false) }>
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
          <Button variant="secondary" onClick={ () => setShowNew(false) }>Fermer</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour edit le parking */}
      <Modal show={editPark} onHide={ () => setShowEdit(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un parking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={editParkForm}>
          <input type="number" defaultValue={oneParking.id} placeholder="ID" onChange={(e) => setID(e.target.value)}/>
          <input type="text" defaultValue={oneParking.name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
          <input type="text" defaultValue={oneParking.type} placeholder="Type" onChange={(e) => setType(e.target.value)}/>
          <input type="text" defaultValue={oneParking.city} placeholder="City" onChange={(e) => setCity(e.target.value)}/>
          <input type="submit" value="Envoyer"/>
          <div className="fw-bold text-center mt-3">{message ? <p>{message}</p> : null}</div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => setShowEdit(false) }>Fermer</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour delete le parking */}
      <Modal show={delPark} onHide={ () => setShowDelete(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer un parking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>êtes vous sur de vouloir supprimer le parking : {oneParking.name}?</div>
            <div className="fw-bold text-center mt-3">{message ? <p>{message}</p> : null}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={ deleteParking }>Confirmer</Button>
          <Button variant="secondary" onClick={ () => setShowDelete(false) }>Annuler</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );

}

export default App;
