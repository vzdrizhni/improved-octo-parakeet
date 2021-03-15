const Day = require('../models/Day');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const asynchandler = require('../middleware/async');

const ErrorResponse = require('../utils/errors');

exports.createDay = asynchandler(async (req, res) => {

    const savedDay = await Day.create({
        user: req.user._id
    });

    if (!savedDay) {
        return next(new ErrorResponse(`A day was not craeted`, 404));
    }

    res.status(200).json({
        data: savedDay
    })
})

exports.getDay = asynchandler(async (req, res) => {
    const day = await Day.findById(req.params.dayId);

    if (!day) {
        return next(new ErrorResponse(`A day was not found`, 404));
    }

    res.status(200).json({
        data: day
    })
})

exports.getDays = asynchandler(async (req, res) => {

    const days = await Day.find({
        user: req.user._id
    }).sort({
        createdAt: -1
    });

    if (!days) {
        return next(new ErrorResponse(`Days were not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: days
    })
})

exports.deleteDay = asynchandler(async (req, res) => {
    const day = await Day.findById(req.params.dayId);

    if (!day) {
        return next(new ErrorResponse(`A day was not found`, 404));
    }

    if (day.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update review`, 401));
    }

    await day.remove();

    res.status(200).json({
        success: true,
        data: {},
        message: `Day with id ${day._id} was removed`
    });
})