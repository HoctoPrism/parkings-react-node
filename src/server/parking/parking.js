const express = require('express')
const fs = require('fs')
const app = express()
const parking = require('./parking.json')
const endpoint = "./src/server/parking/parking.json"

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

// Get all parkings
app.get('/parking', (req,res) => {
    res.status(200).json(parking)
    res.status(404).send('parking non trouvé :(')
})

// Get one parking
app.get('/parking/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parking.find(parking => parking.id === id)
    res.status(200).json(parking)
})

// Create new parking
app.post('/parking', (req,res) => {
    fs.readFile(endpoint, function (err, data) {
        var json = JSON.parse(data);
        json.push(JSON.parse(JSON.stringify(req.body)))
        fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
            if(err) console.log('error', err);
        });
    })
    res.status(200).json(parking)
})

// Update a parking
app.patch('/parking/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const foundIndex = parking.findIndex(parking => parking.id === id)
    fs.readFile(endpoint, function (err, data) {
        var json = JSON.parse(data);
        json[foundIndex] = JSON.parse(JSON.stringify(req.body))
        fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
            if(err) console.log('error', err);
        });
    }) 
    res.status(200).json(parking)
})

// Delete a parking
app.delete('/parking/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const foundIndex = parking.findIndex(parking => parking.id === id)
    fs.readFile(endpoint, function (err, data) {
        var json = JSON.parse(data);
        json.splice(foundIndex, 1);
        fs.writeFile(endpoint, JSON.stringify(json, null, 2), function(err, result) {
            if(err) console.log('error', err);
        });
    }) 
    res.status(200).json(parking)
})

module.exports = app;