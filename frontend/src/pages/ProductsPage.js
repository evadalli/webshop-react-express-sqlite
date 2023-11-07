import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  // backend oldalon inicializalt server host-ra get keres
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((resp) => resp.json())
      .then((resp) => {
        setProducts(resp.data);
      });
  }, []);
  return (
    <>
      {products.map((product) => (
        <>
          <ProductCard product={product} />
          <Link to={`/products/${product.id}`}>{product.name} Details</Link>
        </>
      ))}
    </>
  );
}
