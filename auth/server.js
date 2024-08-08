require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
const connectDB = require('./db/db')



const port = process.env.PORT || 8081;
connectDB();

app.use( require('./routes/auth'));


app.listen(
    port,
    () => console.log(`Server running on : http://localhost:${port}`)
)
