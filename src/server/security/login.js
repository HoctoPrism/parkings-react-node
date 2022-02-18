const express = require('express')
const fs = require('fs')
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const user = require('../user/user.json')
const endpoint = './src/server/user/user.json'

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
        res.status(400).send('Veuillez entrer un Username et un Password !');
		res.end();
    }

    // ça devrait être du query bdd, mais vu que j'ai un json c'est un peu de la merde
    object = user.find(o => o.username === username) // check if a user exists

    if (object && bcrypt.compare(password, object.password)) {
        /* mettre l'auth ici */

        const token = jwt.sign(
            { 
                user_id: user._id, username 
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "2h",
            }
        );

        fs.readFile(endpoint, function (err, data) {
            var json = JSON.parse(data);
            const foundIndex = user.findIndex(user => user.id === object.id)
            object.token = token
            json[foundIndex] = object
            fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
                if(err) console.log('error', err);
            });
        }) 
        res.end();

    } else {
        res.send('Username ou Password invalide !');
        res.end();
    }			
    res.end();
});

module.exports = app;