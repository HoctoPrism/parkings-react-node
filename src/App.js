import { useEffect, useState } from 'react/cjs/react.development';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';

function App (){

  document.title = "First";

  let parkings = "parkings";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  function editParking(id){
    fetch('http://127.0.0.1:8000/parkings/' + id, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
  }
    
  return (
    <div>
      <h1 className='text-center my-5'>Liste des {parkings}</h1>
      <ul className='d-flex'>{data && data.map(({ id, name, city, type }) => (
          <li key={id} className="card mx-3 w-100 bg-secondary text-white">
            <div>{id}</div>
            <div>{name}</div>
            <div>{type}</div>
            <div>{city}</div>
            <div>
              <button className='btn btn-danger' onClick={editParking.bind(this, id)}><Icon.Trash /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;
