const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();

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


// let q = "INSERT INTO user(id,username, email, password) VALUES ?" //query
// // let users = [
// //     ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
// //     ["123c", "123_newuserc", "abc@gmail.comc", "abcc"],
// // ];
// let data = [];
// for (let i = 0; i <= 100; i++) {
//     data.push(getRandomUser()); //100 fake users data

// }

app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result[0]["count(*)"]);
            res.send(result[0]["count(*)"]);
        })
    } catch (err) {
        console.log(err);
        res.send("some err in db")
    }

})

app.listen("8080", () => {
    console.log("Listening on port 8080");
});








// connection.end();