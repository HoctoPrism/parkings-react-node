const express = require('express')
const jwt = require("jsonwebtoken");
const app = express()

app.post('/', async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Un token est nécessaire pour l'authentification");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Token invalide");
  }
  return next();
});

module.exports = app;