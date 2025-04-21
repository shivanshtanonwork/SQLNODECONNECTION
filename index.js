const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

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


let q = "INSERT INTO user(id,username, email, password) VALUES ?" //query
// let users = [
//     ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
//     ["123c", "123_newuserc", "abc@gmail.comc", "abcc"],
// ];
let data = [];
for (let i = 0; i <= 100; i++) {
    data.push(getRandomUser()); //100 fake users data

}

try {
    connection.query(q, [data], (err, result) => {
        if (err) throw err;
        console.log(result);
    })

} catch (err) {
    console.log(err);

}

connection.end();

