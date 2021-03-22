const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const {
    sendConfirmationEmail,
    sendForgotPasswordEmail
} = require('../config/mailer.config');

exports.register = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        role
    } = req.body;

    const confirmationToken = getConfirmationToken(email);

    const user = await User.create({
        name,
        email,
        password,
        role,
        confirmationCode: confirmationToken
    });

    const token = user.getSignedJwtToken();
    sendConfirmationEmail(process.env.MAIL_USER, name, email, confirmationToken)

    sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;


    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

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

    if (user.status != "Active") {
        return next(new ErrorResponse("Pending Account. Please Verify Your Email!", 400));
    }

    sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {

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
    });
};

exports.verifyUser = (req, res, next) => {
    User.findOne({
            confirmationCode: req.params.confirmationCode,
        })
        .select('+password')
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not found."
                });
            }
            user.status = "Active";
            user.save((err) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }
                res.status(200).json({
                    success: true
                })
            });
        })
        .catch((e) => console.log("error", e));
};

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({
        validateBeforeSave: false
    });

    const resetUrl = `${req.protocol}://${req.get(
        'host',
      )}/api/v1/auth/resetpassword/${resetToken}`;

    try {
        await sendForgotPasswordEmail(process.env.MAIL_USER, req.body.email, resetUrl);

        res.status(200).json({
            success: true,
            data: 'Email sent'
        });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({
            validateBeforeSave: false
        });

        return next(new ErrorResponse('Email could not be sent', 500));
    }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        },
    });

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        data: {},
    });
});

exports.updateDetails = asyncHandler(async (req, res, next) => {

    const userData = await User.findById(req.user._id.toString());

    const fieldsToUpdate = {
        name: req.body.name ? req.body.name : userData.name,
        email: req.body.email ? req.body.email : userData.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: user,
    });
});


const getConfirmationToken = (email) => {
    return jwt.sign({
        email: email
    }, process.env.MAIL_SECRET)
};