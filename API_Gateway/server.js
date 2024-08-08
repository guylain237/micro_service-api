const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3001

const proxy = require('express-http-proxy');

app.use("/api/auth",proxy("http://localhost:8080"));
 app.use("/api/auth",proxy("http://lacalhost:8082"));

app.listen(port, () => {
  console.log(`API Gateway en cours d\'exécution sur le port ${port}`);
});