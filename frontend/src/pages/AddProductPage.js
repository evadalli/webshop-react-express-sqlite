import { useState } from 'react';


export default function AddProductPage() {

    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");

    const onAddProduct = (e) => {
        //submittolassal az urlap elkuldesre kerul
        //a response-ban erkezett adatiokkala react ujrarendereli az oldalt
        //ezt a default mukodest elozzuk meg
        e.preventDefault();

        // kattintas mellekhatasakent esedekes fetch, nem a betoltes mellekhatasakent, ezert nem useEffect
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
        .then(resp => resp.json())
        .then(resp => {
          if(resp.statusCode !== 200) {
            alert(resp.err)
          } else {
            alert("Sikeres feltoltes!");
            setName("");
            setPrice("");
          }
        }
          )
    }


    return (
      <>
        <form>
          <p>
            <label>name</label>
            <input type="text" value={name} onInput={(e) => setName(e.target.value)} />
          </p>
          <p>
            <label>price</label>
            <input type="text" value={price} onInput={(e) => setPrice(Number(e.target.value))} />
          </p>
          <button onClick={onAddProduct}>Add Product</button>
        </form>
      </>
    );
}
// git commit: "frontend: handle status code"