const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//importamos las routes
const usersRoutes = require('./routes/users.routes');
const repairsRaoutes = require('./routes/repairs.routes');

const app = express();

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairsRaoutes);

app.use(globalErrorHandler);

//EXPORT  APP
module.exports = app;
