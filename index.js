//core packages
const express = require('express');

//third-party-packages
const dotenv = require('dotenv');
const colors = require('colors');

//routes
const days = require('./routes/days')
const meals = require('./routes/meals')

dotenv.config({path: './config/config.env'})

const app = express();

const connectDB = require('./config/db')
connectDB();

app.use('/api/v1/days', days);
app.use('/api/v1/meals', meals);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running on port '.green + PORT.yellow.bold))