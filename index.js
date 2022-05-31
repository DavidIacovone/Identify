const express = require('express');
const mongo = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

//db connection
mongo.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, ()=>{console.log("connected to db")})

//Import routes
const authRoute = require('./routes/auth');

//Middleware
app.use('/users/', authRoute);

app.listen(3000);