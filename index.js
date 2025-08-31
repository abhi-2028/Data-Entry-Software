const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DB',
    password: 'Abhi@2005'
});

let q = "INSERT INTO `user` (id, username, email, password) VALUES ?";


let getRandomUser = () => [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
];


app.get("/home", (req,res) => {
    let q = 'SELECT count(*) FROM user';

    try { 
    connection.query(q,(err, result) => {
        if(err) throw err;
        let user = result[0]["count(*)"];
        res.render("home.ejs", { user });
    }); 
    } catch (err) { 
        console.log(err); 
        res.send("Some error in DB");
    }; 
});

app.get("/users", (req,res) => {
    let q = 'SELECT * FROM user';

    try { 
    connection.query(q,(err, users) => {
        if(err) throw err;
        res.render("showusers.ejs", { users });
    }); 
    } catch (err) { 
        console.log(err); 
        res.send("Some error in DB");
    }; 
});

app.get("/users/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/users", (req,res) => {
    const { username, email, password } = req.body;
    const id = faker.string.uuid();

    let q = `INSERT INTO user (id, username, email, password) VALUES (? ,? ,? ,?)`;

    try { 
    connection.query(q,[id, username, email, password],(err, users) => {
        if(err) throw err;
        res.redirect("/users");
    }); 
    } catch (err) { 
        console.log(err); 
        res.send("Some error in DB");
    };

});

app.get("/users/search", (req,res) => {
    let { search } = req.query;
    let q = `SELECT * FROM user WHERE username LIKE ? OR email LIKE ?`;

    try { 
    connection.query(q,[`%${search}%`, `%${search}%`],(err, users) => {
        if(err) throw err;
        res.render("showusers.ejs", { users });
    }); 
    } catch (err) { 
        console.log(err); 
        res.send("Some error in DB");
    };
});

app.get("/users/:id/edit" ,(req,res) => {
    let { id }= req.params;
    let q = `SELECT * FROM USER WHERE id = "${id}"`;

    try { 
    connection.query(q,(err, result) => {
        if(err) throw err;
        let user = result[0];
        res.render("edit.ejs",{ user });
    }); 
    } catch (err) { 
        console.log(err); 
        res.send("Some error in DB");
    };
});

app.patch("/users/:id", (req, res) => {
    let { id } = req.params;
    let { username: newUsername, password: formPass } = req.body;

    let q = `SELECT * FROM user WHERE id = ?`;
    connection.query(q, [id], (err, result) => {
        if (err) throw err;
        let user = result[0];

        if (formPass !== user.password) {
            res.send("Wrong Password ❌");
        } else {
            let q2 = `UPDATE user SET username = ? WHERE id = ?`;
            connection.query(q2, [newUsername, id], (err, result) => {
                if (err) throw err;
                res.redirect("/users");
            });
        }
    });
});

app.delete("/users/:id", (req, res) => {
    let { id } = req.params;

    let q = `DELETE FROM user WHERE id = ?`;
    connection.query(q, [id], (err, result) => {
        if (err) throw err;
        res.redirect("/users");
    });
});


app.listen("8080",()=>{
    console.log("Listening to port 8080");
});

// try { 
//     connection.query(q,[data],(err, result) => {
//         if(err) throw err; c
//         onsole.log(result); 
//     }); 
// } catch (err) { 
//     console.log(err); 
// }; 

// connection.end();