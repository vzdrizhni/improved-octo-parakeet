const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const User = require('../models/User');

exports.register = (req, res) => {
    res.status(200).json({success: true});
}
