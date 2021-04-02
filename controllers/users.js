const UserDetails = require('../models/UserDetails');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');

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

    await details.save();

    if (!details) {
        return next(new ErrorResponse('User details were not created', 401));
    }

    res.status(200).json({
        success: true,
        data: details
    });
});

exports.editUserDetails = asyncHandler(async (req, res, next) => {
    const detailsId = req.params.detailsId;

    const updatedDetails = await UserDetails.findByIdAndUpdate(detailsId, req.body, {new: true});

    if (!updatedDetails) {
        return next(new ErrorResponse('User details were not created', 401));
    }

    if (updatedDetails.user._id.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse('You are not allowed to work with this document', 401));
    }

    await updatedDetails.save();

    res.status(200).json({success: true, data: updatedDetails});
});

exports.getUserDetails = asyncHandler(async (req, res, next) => {
    const details = await UserDetails.findById(req.params.detailsId);

    if (!details) {
        return next(new ErrorResponse('User details were not found', 401));
    }

    res.status(200).json({success: true, data: details});
})