import { useEffect, useState } from 'react/cjs/react.development';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import update from 'immutability-helper';

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
  const [toastMessage, setToastMessage] = useState("");

  // Handle open and close for modal
  const [newPark, setShowNew] = useState(false);
  const [editPark, setShowEdit] = useState(false);
  const [delPark, setShowDelete] = useState(false);

  const [toastEdit, setShowToastEdit] = useState(false);
  const [toastDel, setShowToastDel] = useState(false);

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
      let newPark = {
        id: parseInt(id),
        name: name,
        type: type,
        city: city,
      }
      let res = await fetch("http://127.0.0.1:8000/parkings/", {
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(newPark),
      });
      if (res.status === 200) {
        data.push(newPark)
        setName("");
        setType("");
        setCity("");
        setID("");
        setMessage("Parking ajouté ! Vous pouvez en ajouter un autre");
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
      let updatedPark = {
        id: id ? id : parseInt(oneParking.id),
        name: name ? name : oneParking.name,
        type: type ? type : oneParking.type,
        city: city ? city : oneParking.city,
      }
      let res = await fetch("http://127.0.0.1:8000/parkings/" + oneParking.id, {
        method: "PATCH",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(updatedPark),
      });
      if (res.status === 200) {
        const foundIndex = data.findIndex(x => x.id === oneParking.id);
        setData(update(data, { [foundIndex]: {$set: updatedPark}}))
        setShowEdit(false)
        setShowToastEdit(true)
        setToastMessage('Parking modifié !')
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
        const foundIndex = data.findIndex(x => x.id === oneParking.id);
        setData(update(data, { $splice: [[foundIndex, 1]]}))
        setShowDelete(false)
        setShowToastDel(true)
        setToastMessage("Parking supprimé");
      } else {
        setMessage("Une erreur est survenue");
      }
    } catch (err) {
      console.log(err);
    }
  }
    
  return (
    <div className='container d-flex flex-column'>
      <h1 className='text-center my-5'>Liste des {parkings}</h1>
      <button className='btn bg-clair my-3 align-self-center' onClick={ () => setShowNew(true) }>AJOUTER UN PARKING</button>
      <ul className='row row-cols-6'>{data && data.map(({ id, name, city, type }) => (
        <li key={id} className="col card shadow alt-bg-sombre m-3 pt-2">
          <div>ID : {id}</div>
          <div>Nom : {name}</div>
          <div>Type : {type}</div>
          <div>Ville : {city}</div>
          <div className='my-2 d-flex justify-content-evenly align-items-center'>
            <button className='btn btn-success d-flex align-items-center py-2' onClick={ () => {
              setShowEdit(true)
              setOneParking({id: id, name: name, type: type, city: city})
            }}>
            <Icon.Pencil />
            </button>
            <button className='btn btn-danger d-flex align-items-center py-2' onClick={ () => {
              setShowDelete(true)
              setOneParking({id: id, name: name})
            }}>
            <Icon.Trash />
            </button>
          </div>
        </li>
        ))}
      </ul>

      {/* Modal pour le nouveau parking */}
      <Modal show={newPark} onHide={ () => setShowNew(false) } >
        <Modal.Header className="bg-sombre">
          <Modal.Title>Ajouter un parking</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-sombre">
          <form onSubmit={newParkForm} className="d-flex flex-column p-3">
            <input type="number" value={id} placeholder="ID" onChange={(e) => setID(e.target.value)} className="alt-bg-sombre border-0 rounded text-clair my-2 p-2"/>
            <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} className="alt-bg-sombre border-0 rounded text-clair my-2 p-2"/>
            <input type="text" value={type} placeholder="Type" onChange={(e) => setType(e.target.value)} className="alt-bg-sombre border-0 rounded text-clair my-2 p-2"/>
            <input type="text" value={city} placeholder="City" onChange={(e) => setCity(e.target.value)} className="alt-bg-sombre border-0 rounded text-clair my-2 p-2"/>
            <input type="submit" className='btn bg-clair mt-4' value="Envoyer"/>
            <div className="fw-bold text-center mt-3">{message ? <p>{message}</p> : null}</div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-sombre">
          <Button className='bg-clair border-0 text-sombre' onClick={ () => setShowNew(false) }>Fermer</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour edit le parking */}
      <Modal show={editPark} onHide={ () => setShowEdit(false) }>
        <Modal.Header className="bg-sombre">
          <Modal.Title>Modifier un parking</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-sombre">
        <form onSubmit={editParkForm} className="d-flex flex-column p-3">
          <input type="number" defaultValue={oneParking.id} placeholder="ID" onChange={(e) => setID(e.target.value)} className="alt-bg-sombre border-0 rounded text-clair my-2 p-2"/>
          <input type="text" defaultValue={oneParking.name} placeholder="Name" onChange={(e) => setName(e.target.value)} className="alt-bg-sombre border-0 rounded text-clair my-2 p-2"/>
          <input type="text" defaultValue={oneParking.type} placeholder="Type" onChange={(e) => setType(e.target.value)} className="alt-bg-sombre border-0 rounded text-clair my-2 p-2"/>
          <input type="text" defaultValue={oneParking.city} placeholder="City" onChange={(e) => setCity(e.target.value)} className="alt-bg-sombre border-0 rounded text-clair my-2 p-2"/>
          <input type="submit" className='btn bg-clair mt-4' value="Envoyer"/>
          <div className="fw-bold text-center mt-3">{message ? <p>{message}</p> : null}</div>
        </form>
        </Modal.Body>
        <Modal.Footer className="bg-sombre">
          <Button className='bg-clair border-0 text-sombre' onClick={ () => setShowEdit(false) }>Fermer</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour delete le parking */}
      <Modal show={delPark} onHide={ () => setShowDelete(false) }>
        <Modal.Header className="bg-sombre">
          <Modal.Title>Supprimer un parking</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-sombre">
          <div>
            <div>êtes vous sur de vouloir supprimer le parking : {oneParking.name}?</div>
            <div className="fw-bold text-center mt-3">{message ? <p>{message}</p> : null}</div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-sombre">
          <Button variant="danger" onClick={ deleteParking }>Confirmer</Button>
          <Button onClick={ () => setShowDelete(false) } className='bg-clair border-0 text-sombre'>Annuler</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast pour edit le parking */}
      <ToastContainer position="bottom-center">
        <Toast className="mb-3" delay={3000} autohide show={toastEdit} onHide={ () => setShowToastEdit(false) } onClose={() => setShowToastEdit(false)}>
          <Toast.Header>
            <strong className="me-auto text-sombre">{toastMessage}</strong>
          </Toast.Header>
        </Toast>
      </ToastContainer> 

      {/* Toast pour edit le parking */}
      <ToastContainer position="bottom-center">
        <Toast className="mb-3" delay={3000} autohide show={toastDel} onHide={ () => setShowToastDel(false) } onClose={() => setShowToastDel(false)}>
          <Toast.Header>
            <strong className="me-auto text-sombre">{toastMessage}</strong>
          </Toast.Header>
        </Toast>
      </ToastContainer> 
    </div>
  );

}

export default App;
