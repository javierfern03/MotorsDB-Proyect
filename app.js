const express = require('express');
const morgan = require('morgan');

//importamos las routes
const usersRoutes = require('./routes/users.routes')
const repairsRaoutes = require('./routes/repairs.routes')

const app = express();

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairsRaoutes)

//EXPORT  APP
module.exports = app;
