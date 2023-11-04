/*migracios script irasa*/

import sqlite3 from "sqlite3";

/*adatbazis kapcsolatot reprezentalo objektum az sqlite3 kommunikáciojara az adatbazissal*/

const db = new sqlite3.Database("webshop.db");

db.serialize(() => {

    /* sema elokeszitese ~ migracio */
    /* primary key: ellenorzi, hogy ugyanaz az id nem lehet ketszer */
    /* autoincrement: ha az id egesz szam, akkor nem kell megadni uj sornal, mert automatikusan kiosztja a kovetkezo id-t */

    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(80),
        price INTEGER
    )`);

    /* kezdoadatok betoltese ~ seedelese */
    db.run(`INSERT INTO products (name, price) VALUES ("laterator", 4200)`);
    db.run(`INSERT INTO products (name, price) VALUES ("anterior foo", 5500)`);
    db.run(`INSERT INTO products (name, price) VALUES ("posterior bar", 7000)`);
})

/* teszt: letrejon-e a webshop.db, migracios script lefuttatasa
parancssor: node dbinit.js*/

/*download sqlite command-line tools, open sqlite, command-line: .open webshop.db, .tables*/

// .gitignore: **/ node_modules - barhol van node modules, azt ignoralja 

/* git commit: "backend: dbinit" */

