const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const User = require('../models/User');

const sendConfirmationEmail = require('../config/mailer.config');

exports.register = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        role
    } = req.body;

    const confirmationToken = sendConfirmationEmail(name, email, getConfirmationToken(email));

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    const token = user.getSignedJwtToken();

    sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    if (user.status != "Active") {
        return next(new ErrorResponse("Pending Account. Please Verify Your Email!", 400));
    }

    // Validate emil & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({
        email
    }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        confirmationToken
    });
};

const getConfirmationToken = (email) => {
    return jwt.sign({
        email: email
    }, process.env.MAIL_SECRET)
};