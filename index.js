const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken')


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

//Connect
db.connect((err) => {
    if(err){
       throw err;
    }
    console.log('MySQL Connected...');
});

const app = express();

//Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodedb';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...')
    });
})

app.listen('3000', () => {
    console.log('Server started on port 3000')
});
