//core packages
const express = require('express');

//third-party-packages
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({path: './config/config.env'})

const app = express();

app.use('/', (req, res) => {
    console.log('Works'.brightYellow.bgBrightMagenta);
})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running on port '.green + PORT.yellow.bold))