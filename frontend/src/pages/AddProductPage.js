import { useState, useEffect } from 'react';


export default function AddProductPage() {

    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");

    const onAddProduct = (e) => {
        //submittolassal az urlap elkuldesre kerul
        //a response-ban erkezett adatiokkala react ujrarendereli az oldalt
        //ezt a default mukodest elozzuk meg
        e.preventDefault();
        fetch('http://localhost:8000/products', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name: name,
                price: price
            })
        })
        .then(resp => resp.text())
        .then(resp => console.log(resp))
    }


    return (
      <>
        <form>
          <p>
            <label>name</label>
            <input type="text" onInput={(e) => setName(e.target.value)} />
          </p>
          <p>
            <label>price</label>
            <input type="text" onInput={(e) => setPrice(e.target.value)} />
          </p>
          <button onClick={onAddProduct}>Add Product</button>
        </form>
      </>
    );
}