const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const User = require('../models/User');

exports.register = asyncHandler(async(req, res) => {
    const {name, email, password, role} = req.body;

    const user = await User.create({name, email, password, role});

    const token = user.getSignedJwtToken();
    res.status(200).json({success: true, token});
});
