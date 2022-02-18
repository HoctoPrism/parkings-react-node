const express = require('express')
const app = express()
const bodyParser = require('body-parser');
require("dotenv").config();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

const parking = require("./parking/parking");
const login = require("./security/login");
const register = require("./security/register");
const auth = require("./security/auth");

app.use(
    function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    },
    express.json()
);

app.use(parking);
app.use(login);
app.use(register);
app.use(auth);

app.listen(8000, () => {
    console.log('Serveur à l\'écoute')
})