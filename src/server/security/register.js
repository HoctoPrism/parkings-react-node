const express = require('express')
const app = express()
const fs = require('fs')
const bcrypt = require('bcryptjs')

const user = require('../user/user.json')
const { body, check, validationResult } = require('express-validator')
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

app.post("/register", 

    check('password')
    .notEmpty().withMessage("un mot de passe doit être rempli").bail()
    .isLength({ min:8 }).withMessage("le mot de passe doit faire au minimum 8 caractères").bail()
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&]).{8,}/).withMessage("le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spéciale").bail(),

    check('username')
    .notEmpty().withMessage("Veuillez saisir un email").bail()
    .isEmail().withMessage("Veuillez saisir un email").bail()    
    .custom( async username => {
        if (user.find(item => item.username === username)) {
            return Promise.reject('Cet email a déjà été utilisé !')
        }
    }).bail(),

    async (req, res) => {

    try {
        let { username, password, role } = req.body;
        
        let error = validationResult(req)
        let finalTab = {
            username: null,
            password: null
        }
        if (error.errors.length === 0) {
            // create a new entry for this user if username doesnt exist
            password = await bcrypt.hash(password, 10);
            fs.readFile(endpoint, function (err, data) {
                var json = JSON.parse(data);
                var id = json.slice(-1).pop().id + 1
                var role = ["ROLE_USER"]
                json.push(JSON.parse(JSON.stringify({ id, username, password, role })))
                fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
                    if(err) console.log('error', err);
                }); 
            }) 

            // return new user
            res.status(200).send('done');
        } else {
            error.errors.forEach( element => {
                if (element.param == "username") {
                    finalTab["username"] = element.msg
                }
                if (element.param == "password") {
                    finalTab["password"] = element.msg
                }
            })
            return res.status(400).json(finalTab)
        }

    } catch (err) {
        console.log(err);
    }

});

module.exports = app;
