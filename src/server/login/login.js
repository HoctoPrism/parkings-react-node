const express = require('express')
const fs = require('fs')
const app = express()
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

app.post('/login', function(req, res) {

	let username = req.body.username;
	let password = req.body.password;

	if (username && password) {
        // ça devrait être du query bdd, mais vu que j'ai un json c'est un peu de la merde
        object = user.find(o => o.username === username)
        if (object.username == username && object.password == password) {
            /* mettre l'auth ici */
            res.redirect('/');
        } else {
            res.send('Username ou Password invalide !');
        }			
        res.end();
	} else {
		res.send('Veuillez entrer un Username et un Password !');
		res.end();
	}
});

module.exports = app;