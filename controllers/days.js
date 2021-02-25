const Day = require('../models/Day');

const asynchandler = require('../middleware/async');

const ErrorResponse = require('../utils/errors');

exports.createDay = asynchandler(async (req, res) => {
    let savedDay;

    savedDay = await Day.create({
        name: Date.now()
    });

    if (!saveDay) {
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
    const days = await Day.find().sort({createdAt: -1});

    if (!days) {
        return next(new ErrorResponse(`Days were not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: days
    })
})