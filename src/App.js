import { useEffect, useState } from 'react/cjs/react.development';
import './App.css';

function App (){

  document.title = "First";

  let parkings = "parkings";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:7000/parkings`)
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
    
  return (
    <div>
      <h1>Liste des {parkings}</h1>
      <ul>{data && data.map(({ id, name, city, type }) => (
          <li key={id} className="card">
            <div>{id}</div>
            <div>{name}</div>
            <div>{type}</div>
            <div>{city}</div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;
