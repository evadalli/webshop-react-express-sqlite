// backend server belepesi pontja
// ez fogja futtatni a servert

import express from "express";

import cors from "cors";

// az adatok adatbazisbol valo betoltesere
import sqlite3 from "sqlite3";

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
    },
    (err, rowCount) => {
      let statusCode = 200;
      let errorMessage = "";
      if (err) {
        //err object tartalmazhat erzekeny adatokat, ezert ne azt adjuk at a frontendnek
        errorMessage = "database error";
        statusCode = 500;
      }
      response
        .status(statusCode)
        .send(
          JSON.stringify({
            err: errorMessage,
            data: products,
            statusCode: statusCode,
          })
        );
    }
  );
});
// git commmit: backend: get /products

//request objektum body kulcsan talalhato objektum ~ termek objektum kulcsai
app.post("/products", (request, response) => {
  console.log(request.body);
  let statusCode = 200;
  let errorMessage = "";
  let responseBody = { name: request.body.name, price: request.body.price };

  //validalas
  // if + return = guard clause: ha nem teljesul az elofeltetel (precondition), akkor nem engedi tovabb a vegrehajtast
  if (
    typeof request.body.name != "string" ||
    request.body.name.length > 80 ||
    request.body.name == "" ||
    typeof request.body.price != "number" ||
    request.body.price < 0
  ) {
    errorMessage = "validation error";
    statusCode = 400;
    response
      .status(statusCode)
      .send(
        JSON.stringify({
          err: errorMessage,
          data: responseBody,
          statusCode: statusCode,
        })
      );
    return;
  }
  //sql injection megelozese erdekeben prepare statement-et hasznalunk kozvetlen sql futtatas helyett
  // - fontos, hogy ne konkatenaljuk be a parametereket
  // - hanem a preare statement-re hagyjuk ra a parameterek illeszteset
  // - kulonben ugyanugy erzekeny lesz sql injection-re
  const stmt = db.prepare(`INSERT INTO products (name, price) VALUES (?, ?)`);

  // itt a callback function nem lehet arrow function, csak hagyomanyos (mert egyebkent a this nem jon letre)
  stmt.run(request.body.name, request.body.price, function (err) {
    if (err) {
      errorMessage = "database error";
      statusCode = 500;
      responseBody = {};
    } else {
      // a this egy statement tipusu object, aminek 2 property-je van, elso a lastID (amit kapott a felvitt objektum)
      // masodik a changes (hany modositas lett, pl.: forEach-en belul tobb sor is lehet erintett)
      responseBody.id = this.lastID;
    }
    response
      .status(statusCode)
      .send(
        JSON.stringify({
          err: errorMessage,
          data: responseBody,
          statusCode: statusCode,
        })
      );
  });
});
// git commit: backend: post products api

// teszteles: valami valaszt kuldjunk vissza
// command-line: node index.js, server elinditasa, bongeszo, postman etc.

// git commit: backend: restful status code and response + validation

app.delete("/products/:id", function (request, response) {
  const id = request.params.id;
  let errorMessage = "";
  let statusCode = 200;
  let responseBody = { id: id, message: "Sikeres torles" };

  const stmt= db.prepare(`DELETE FROM products WHERE id=?`);
  stmt.run(id, function (err) {
    if (err) {
      errorMessage = "database error";
      statusCode = 500;
      responseBody = {};
    }
    response.status(statusCode).send(
      JSON.stringify({
        err: errorMessage,
        data: responseBody,
        statusCode: statusCode,
      })
    );
  });
});

app.put("/products/:id", function (request, response) {
  const id = request.params.id;
  let errorMessage = "";
  let statusCode = 200;
  let responseBody = {
    id: id,
    name: request.body.name,
    price: request.body.price,
  };

  if (
    typeof request.body.name != "string" ||
    request.body.name.length > 80 ||
    request.body.name == "" ||
    typeof request.body.price != "number" ||
    request.body.price < 0
  ) {
    errorMessage = "validation error";
    statusCode = 400;
    response.status(statusCode).send(
      JSON.stringify({
        err: errorMessage,
        data: responseBody,
        statusCode: statusCode,
      })
    );
    return;
  }
  const stmt = db.prepare(`UPDATE products SET name=?, price=? WHERE id=?`);
  stmt.run(request.body.name, request.body.price, id, function (err) {
    if (err) {
      errorMessage = "database error";
      statusCode = 500;
      responseBody = {};
    } else {
      responseBody.id = id;
    }
    response.status(statusCode).send(
      JSON.stringify({
        err: errorMessage,
        data: responseBody,
        statusCode: statusCode,
      })
    );
  });
});
