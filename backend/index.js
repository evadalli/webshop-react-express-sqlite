// backend server belepesi pontja
// ez fogja futtatni a servert

import  express  from "express";

import cors from "cors";

// az adatok adatbazisbol valo betoltesere
import  sqlite3  from "sqlite3";

// adatbazis kapcsolat letrehozasa
const db = new sqlite3.Database("webshop.db");

// server inicializalasa
const app = express();

// cors factory fuggveny, amieloallit egy express.js middleware-t, ami engedelyezi a cors-t
// - ez kell ahhoz, hogy a 3000-es porton futo frontend kommunikalni tudjon a 8000-es porton futo backend-del
app.use(cors());

//post request body parser-hez 
// - http request body json felolvasasara kepes middleware regisztracioja (factory fuggveny)
app.use(express.json());

// server elinditasa megadott porton
app.listen(8000);

// vegpontok bekotese - request handler
app.get("/products", (request, response) => {
    const products = [];

    // lekerdezes lefuttatasa, cb function utasitasanak vegrehajtasa minden sorra
    db.each(
      "SELECT * FROM products",
      (err, row) => {
        products.push(row);
      }, () => response.send(JSON.stringify(products))
    );
});
// git commmit: backend: get /products

//request objektum body kulcsan talalhato objektum ~ termek objektum kulcsai
app.post("/products", (request, response) => {
  
  //sql injection megelozese erdekeben prepare statement-et hasznalunk kozvetlen sql futtatas helyett
  // - fontos, hogy ne konkatenaljuk be a parametereket
  // - hanem a preare statement-re hagyjuk ra a parameterek illeszteset
  // - kulonben ugyanugy erzekeny lesz sql injection-re
  const stmt = db.prepare(`INSERT INTO products (name, price) VALUES (?, ?)`);
  stmt.run(request.body.name, request.body.price, (err) => {
    response.send("OK")
  } );

})
// git commit: backend: post products api

// teszteles: valami valaszt kuldjunk vissza
// command-line: node index.js, server elinditasa, bongeszo, postman etc.