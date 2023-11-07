import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({name: "", price: ""});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}`)
      .then((resp) => resp.json())
      .then((resp) => setProduct(resp.data)); // data volt, de az az egesz object 
    console.log(product);
  }, []);

  const onEditProduct = (e) => {
    //submittolassal az urlap elkuldesre kerul
    //a response-ban erkezett adatokkal react ujrarendereli az oldalt
    //ezt a default mukodest elozzuk meg
    e.preventDefault();

    // kattintas mellekhatasakent esedekes fetch, nem a betoltes mellekhatasakent, ezert nem useEffect
    fetch(`http://localhost:8000/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name: product.name,
        price: product.price,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.statusCode !== 200) {
          alert(resp.err);

        } else {
          alert("Sikeres feltoltes!");
          navigate("/products");
        }
      });
  };

  const onDeleteProduct = () => {
    if(window.confirm("Biztosan torlod?")) {
    
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.statusCode !== 200) {
          alert(resp.err);
          return;
        } else {
          alert("Sikeres torles!");
          navigate("/products");
        }
      });
  }};

  return (
    <>
      <form>
        <p>
          <label>new name</label>
          <input
            type="text"
            value={product.name}
            onInput={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </p>
        <p>
          <label>new price</label>
          <input
            type="text"
            value={product.price}
            onInput={(e) => setProduct({ ...product, price: Number(e.target.value) })
            }
          />
        </p>
        <button onClick={onEditProduct}>Edit Product</button>
      </form>
      <button type="button" onClick={onDeleteProduct}>
        Delete Product
      </button>
    </>
  );
}
