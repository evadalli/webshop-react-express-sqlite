import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>WEBSHOP NAVBAR </h1>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/add-product">Add Product</Link>
      <Outlet />
    </div>
  );
}

export default App;
