const bodyParser = require("body-parser");

require("dotenv").config();

require('./models/user');

const middlewares = require('./middlewares');

const api = require ('./api');
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "App.js"
    });
});

app.use("/api/v1", api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

module.exports = app;
