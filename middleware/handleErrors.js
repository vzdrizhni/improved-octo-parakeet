const ErrorResponse = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
    let error = {
        ...err
    };
    error.message = err.message;

    if (err.name === 'CastError') {
        console.log('gotit');
        const message = `Item not found with id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => {
            return val.message
        });
        console.log(message);
        error = new ErrorResponse(err.message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Srver Error'
    })
}

module.exports = errorHandler;