const Day = require('../models/Day');
const Meal = require('../models/Meal');
const Food = require('../models/Food');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');

exports.createMeal = async (req, res, next) => {
    req.body.day = req.params.dayId;

    try {
        const meal = await Meal.create(req.body);
        let day = await Day.findById(req.body.day);
        day.meals.push(meal);
        await day.save();
        res.json({
            data: day
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
        food = await Food.findById(req.body.food._id);
    } else {
        const isUniqueFood = await Food.find({
            name: req.body.food.name,
            calories: req.body.food.calories
        }).countDocuments();

        if (isUniqueFood === 0) {
            food = await Food.create({
                name: req.body.food.name,
                calories: req.body.food.calories
            });
        } else {
            food = await Food.findOne({
                name: req.body.food.name,
                calories: req.body.food.calories
            });
        }
    }

    if (!food) {
        return next(new ErrorResponse(`Food was not found`, 404));
    }

    const checkMeal = await Meal.findByIdAndUpdate(mealId);

    if (!checkMeal) {
        return next(new ErrorResponse(`No meal found`, 404));
    }

    let meal = await Meal.findOneAndUpdate({
        _id: mealId
    }, {
        $push: {
            food: {
                food: food,
                weight: req.body.weight
            }
        }
    }, {
        new: true
    }).populate('food.food');

    if (!meal) {
        return next(new ErrorResponse(`Meal was not found`, 404));
    }

    await meal.save();

    res.json({
        success: true,
        data: meal
    })
});

exports.editMeal = asyncHandler(async (req, res, next) => {
    
    let editedMeal = await Meal.findByIdAndUpdate(req.params.mealId, req.body, {
        new: true
    }).populate('food.food');

    if (!editedMeal) {
        return next(new ErrorResponse(`Meal was not found`, 404));
    }

    const day = await Day.findById(editedMeal.day);

    if (!day) {
        return next(new ErrorResponse(`Day was not found`, 404));
    }
    
    if (day.user._id !== req.user._id) {
        return next(new ErrorResponse(`You are not allowed to do that`, 401));
    }

    await editedMeal.save();
    res.status(200).json({
        success: true,
        data: editedMeal
    })
});

exports.deleteMeal = asyncHandler(async(req, res, next) => {
    const mealId = req.params.mealId;

    const meal = await Meal.findById(mealId);
    if (!meal) {
        return next(new ErrorResponse(`Meal was not found`, 404));
    }
    
    const day = await Day.findById(meal.day);

    if (!day) {
        return next(new ErrorResponse(`Day was not found`, 404));
    }
    
    if (day.user._id !== req.user._id) {
        return next(new ErrorResponse(`You are not allowed to do that`, 401));
    }
    
    await meal.remove();
    await day.updateOne({$pull: {meals: meal._id}});
    await day.save();

    res.status(200).json({success: true, message: `A ${meal.name} was removed`})
}) 

exports.getMeal = asyncHandler(async(req, res, next) => {
    const meal = await Meal.findById(req.params.mealId).populate('food');
    
    if (!meal) {
        return next(new ErrorResponse(`Meal was not found`, 404));
    }

    res.status(200).json({success: true, data: meal});
})