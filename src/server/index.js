const express = require('express')
const fs = require('fs')
const app = express()
const parkings = require('./parkings.json')
const endpoint = "./src/server/parkings.json"

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

app.get('/parkings', (req,res) => {
    res.status(200).json(parkings)
    res.status(404).send('parking non trouvé :(')
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

app.post('/parkings', (req,res) => {
    fs.readFile(endpoint, function (err, data) {
        var json = JSON.parse(data);
        json.push(JSON.parse(JSON.stringify(req.body)))
        fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
            if(err) console.log('error', err);
        });
    })
    res.status(200).json(parkings)
})

app.patch('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const foundIndex = parkings.findIndex(parking => parking.id === id)
    fs.readFile(endpoint, function (err, data) {
        var json = JSON.parse(data);
        json[foundIndex] = JSON.parse(JSON.stringify(req.body))
        fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
            if(err) console.log('error', err);
        });
    }) 
    res.status(200).json(parkings)
})

app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const foundIndex = parkings.findIndex(parking => parking.id === id)
    fs.readFile(endpoint, function (err, data) {
        var json = JSON.parse(data);
        json.splice(foundIndex, 1);
        fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
            if(err) console.log('error', err);
        });
    }) 
    res.status(200).json(parkings)
})

app.listen(8000, () => {
    console.log('Serveur à l\'écoute')
})