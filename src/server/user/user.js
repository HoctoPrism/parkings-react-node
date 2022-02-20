const express = require('express')
const app = express()
const jwt = require("jsonwebtoken");
const user = require('./user.json')

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

app.post('/current-user', async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const current = user.find(user => user.username === decoded.username)
    return res.status(200).send(current)
});

module.exports = app;