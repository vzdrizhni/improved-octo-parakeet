const Food = require('../models/Food');
const Meal = require('../models/Meal')

const asyncHandler = require('../middleware/async')

const ErrorResponse = require('../utils/errors');

exports.getSingleFood = asyncHandler(async (req, res, next) => {
    const foodId = req.params.foodId;
    console.log(foodId);

    const food = await Food.findById(foodId);
    if (!food) {
        return next(new ErrorResponse(`Food with id ${foodId} was not found`, 404));
    }

    res.status(200).json({success: true, data: food});
})

exports.createFood = asyncHandler(async (req, res, next) => {
    const foodBody = req.body;

    const food = await Food.create(foodBody);

    if (!food) {
        return next(new ErrorResponse(`Food was not craeted`, 404));
    }

    res.status(201).json({success: true})

})

exports.addFoodToTheMeal = async (req, res, next) => {
    const mealId = req.params.mealId;
    let food;
    if (req.body._id) {
        food = await Food.findById(req.body._id);
    }
    
    const isUniqueFood = await Food.find({name: req.body.name, calories: req.body.calories});

    if (isUniqueFood.length === 0) {
        food = await Food.create(req.body);
    }

    let meal = await Meal.findByIdAndUpdate(mealId, {$push: {food: food}}).populate('food');
    
    res.json({success: true, meal})
}