const UserDetails = require('../models/UserDetails');

const asyncHandler = require('../middleware/async');

exports.createUserDetails = asyncHandler(async (req, res, next) => {
    const {
        height,
        weight,
        gender,
        age
    } = req.body;

    const details = new UserDetails({
        height,
        weight,
        gender,
        age,
        user: req.user._id
    });

    console.log(details);

    await details.save();

    if (!details) {
        return next(new ErrorResponse('User details were not created', 401));
    }

    res.status(200).json({
        success: true,
        data: details
    });
})