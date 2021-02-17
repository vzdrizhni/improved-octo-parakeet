//core packages
const express = require('express');

//third-party-packages
const dotenv = require('dotenv');
const colors = require('colors');

//routes
const days = require('./routes/days')
const meals = require('./routes/meals')

dotenv.config({
    path: './config/config.env'
})

const app = express();

app.use(express.json());

const connectDB = require('./config/db')
connectDB();

app.use('/api/v1/days', days);
app.use('/api/v1/meals', meals);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res
        .status(status)
        .json({
            message: message,
            data: data
        });
});


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running on port '.green + PORT.yellow.bold))