import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  // backend oldalon inicializalt server host-ra get keres
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
      });
  });
  return (
    <>
      {products.map((product) => (
        <ProductCard product={product}/>
      ))}
    </>
  );
}


