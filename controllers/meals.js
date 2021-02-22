const Day = require('../models/Day');
const Meal = require('../models/Meal');
const Food = require('../models/Food');

const asyncHandler = require('../middleware/async');

exports.createMeal = async (req, res, next) => {
    req.body.day = req.params.dayId;
    
    try {
        const meal = await Meal.create(req.body);
        res.json({
            data: meal
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 404;
        }
        err.message = 'A day was not found'
        next(err);
    }
}

exports.addFoodToTheMeal = asyncHandler(async (req, res, next) => {
    const mealId = req.params.mealId;
    let food;

    if (req.body._id) {
        food = await Food.findById(req.body._id);
    } else {
        const isUniqueFood = await Food.find({
            name: req.body.name,
            calories: req.body.calories
        }).countDocuments();

        if (isUniqueFood === 0) {
            food = await Food.create(req.body);
        } else {
            console.log(req.body);
            food = await Food.findOne(req.body);
        }
    }

    if (!food) {
        return next(new ErrorResponse(`Food was not found`, 404));
    }

    let meal = await Meal.findByIdAndUpdate(mealId, {
        $push: {
            food: food
        }
    }).populate('food');

    if (!meal) {
        return next(new ErrorResponse(`Meal was not found`, 404));
    }

    res.json({
        success: true,
        data: meal
    })
})