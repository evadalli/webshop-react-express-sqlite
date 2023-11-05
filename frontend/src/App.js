import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>WEBSHOP NAVBAR </h1>
      <Link to="/">Home</Link>
      <Link to="/products">Termékek</Link>
      <Link to="/add-product">Termék hozzáadása</Link>
      <Outlet />
    </div>
  );
}

export default App;
