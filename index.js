const express = require('express');
const app = express();

//Import routes
const authRoute = require('./routes/auth');

//Middleware
app.use('/users/', authRoute);

app.listen(3000);