const UserDetails = require('../models/UserDetails');

const asyncHandler = require('../middleware/async');

exports.createUserDetails = asyncHandler(async (req, res, next) => {
    res.status(200).json({success: true});
})