const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path")
const methodOverride = require("method-override")

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Shiv@nsh@150399',
});

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

//Home page route
app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", { count })
        })
    } catch (err) {
        console.log(err);
        res.send("some err in db")
    }
})

//Show user route
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            // console.log(result);
            res.render("showusers.ejs", { users })
        })
    } catch (err) {
        console.log(err);
        res.send("some err in db")
    }
})


//Edit route
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs", { user });
        })
    } catch (err) {
        console.log(err);
        res.send("some err in db")
    }
})

//UPDATE (DB) Route
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    let { password: formPass, username: newUsername } = req.body;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (formPass != user.password) {
                res.send("Wrong password")
            } else {
                let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect("/user")
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.send("some err in db")
    }
})

app.listen("8080", () => {
    console.log("Listening on port 8080");
});





// let q = "INSERT INTO user(id,username, email, password) VALUES ?" //query
// // let users = [
// //     ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
// //     ["123c", "123_newuserc", "abc@gmail.comc", "abcc"],
// // ];
// let data = [];
// for (let i = 0; i <= 100; i++) {
//     data.push(getRandomUser()); //100 fake users data

// }