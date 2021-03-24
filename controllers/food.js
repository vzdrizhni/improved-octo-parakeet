const Food = require('../models/Food');
const Meal = require('../models/Meal');

const asyncHandler = require('../middleware/async');

const ErrorResponse = require('../utils/errors');

exports.getSingleFood = asyncHandler(async (req, res, next) => {
    const foodId = req.params.foodId;
    console.log(foodId);

    const food = await Food.findById(foodId);
    if (!food) {
        return next(new ErrorResponse(`Food with id ${foodId} was not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: food
    });
});

exports.createFood = asyncHandler(async (req, res, next) => {
    const foodBody = req.body;

    const food = await Food.create(foodBody);

    if (!food) {
        return next(new ErrorResponse(`Food was not craeted`, 404));
    }

    res.status(201).json({
        success: true
    })

})
