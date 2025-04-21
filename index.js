const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Shiv@nsh@150399',
});

let q = "INSERT INTO user(id,username, email, password) VALUES ?" //query
// let users = [
//     ["123b", "123_newuserb", "abc@gmail.comb", "abcb"],
//     ["123c", "123_newuserc", "abc@gmail.comc", "abcc"],
// ];

try {
    connection.query(q, [users], (err, result) => {
        if (err) throw err;
        console.log(result);
    })

} catch (err) {
    console.log(err);

}

connection.end();

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

// console.log(getRandomUser());
