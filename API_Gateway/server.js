const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3001

const proxy = require('express-http-proxy');
const adminMiddleware = require('./middlewares/adminMiddleware');

app.use("/api/auth",proxy("http://micro_auth:8080"));
 app.use("/api/produit",adminMiddleware, proxy("http://micro_produit:8082"));

app.listen(port, () => {
  console.log(`API Gateway en cours d\'exécution sur le port ${port}`);
});