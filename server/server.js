// Importing required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const serveStatic = require('serve-static');

/* Defining port */
const port = process.env.PORT || 9000;

/* Mongo DB */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_VETINVENTORY, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

var brandRouter = require('./routes/brand');
var foodRouter = require('./routes/food');
var leashRouter = require('./routes/leash');
var foodinstanceRouter = require('./routes/foodinstance');

// Defining app
const app = express();

// Defining middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Static folder
app.use(serveStatic(__dirname + '/client/dist'));

/* Defining the Routes */
app.use(process.env.VETINVENTORY_ROUTE_BRAND, brandRouter);
app.use(process.env.VETINVENTORY_ROUTE_FOOD, foodRouter);
app.use(process.env.VETINVENTORY_ROUTE_LEASH, leashRouter);
app.use(process.env.VETINVENTORY_ROUTE_FOODINSTANCE, foodinstanceRouter);

/* Listening to port */
app.listen(port);

module.exports = app;
