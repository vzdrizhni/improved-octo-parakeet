//core packages
const express = require('express');
const path = require('path');

//third-party-packages
const dotenv = require('dotenv');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

//routes
const days = require('./routes/days');
const meals = require('./routes/meals');
const food = require('./routes/food');
const auth = require('./routes/auth');
const users = require('./routes/users');

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
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});
app.use(limiter);
app.use(hpp());

app.use('/api/v1/days', days);
app.use('/api/v1/meals', meals);
app.use('/api/v1/food', food);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(handleErrors);

// app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running on port '.green + PORT.yellow.bold))