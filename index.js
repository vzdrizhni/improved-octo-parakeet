//core packages
const express = require('express');

//third-party-packages
const dotenv = require('dotenv');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

//routes
const days = require('./routes/days');
const meals = require('./routes/meals');
const food = require('./routes/food');
const auth = require('./routes/auth');

//middlewares
const handleErrors = require('./middleware/handleErrors');

dotenv.config({
    path: './config/config.env'
})

const app = express();

app.use(express.json());

app.use(cookieParser());

const connectDB = require('./config/db')
connectDB();

app.use(mongoSanitize());

app.use('/api/v1/days', days);
app.use('/api/v1/meals', meals);
app.use('/api/v1/food', food);
app.use('/api/v1/auth', auth);

app.use(handleErrors);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running on port '.green + PORT.yellow.bold))