const express = require('express')
const fs = require('fs')
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const user = require('../user/user.json')

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

app.post('/login', async (req, res) => {

    const { username, password } = req.body;
    
	if (!(username && password)) {
        res.status(400).send({message: 'Veuillez entrer un Username et un Password !'});
		res.end();
    }

    // ça devrait être du query bdd, mais vu que j'ai un json c'est un peu de la merde
    object = user.find(o => o.username === username) // check if a user exists

    if (object && bcrypt.compare(password, object.password)) {
        
        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.SECRET_KEY,
            { expiresIn: "10s" }
        );

        res.status(200).send({'token': token})
        res.end();

    } else {
        res.status(400).send({message: 'Username ou Password invalide !'});
        res.end();
    }			
    res.end();
});

module.exports = app;