const express = require('express')
const app = express()
const fs = require('fs')
const bcrypt = require('bcryptjs')

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

app.post("/register", async (req, res) => {

    try {
        let { id, username, password, role } = req.body;

         // Validate user input
        if (!(username && password)) {
            res.status(400).send("Tous les champs doivent être remplis");
        }

        // check if user already exist
        const oldUser = user.find(item => item.username === username)

        if (oldUser) {
            return res.status(409).send("Ce username a déjà été utilisé, veuillez vous connecter !");
        }

        // create a new entry for this user if username doesnt exist
        password = await bcrypt.hash(password, 10);
        fs.readFile(endpoint, function (err, data) {
            var json = JSON.parse(data);
            json.push(JSON.parse(JSON.stringify({ id, username, password, role })))
            fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
                if(err) console.log('error', err);
            }); 
        }) 

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }

});

module.exports = app;
