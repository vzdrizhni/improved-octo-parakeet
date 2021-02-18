const Day = require('../models/Day');
const Meal = require('../models/Meal');

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
        next(err);
    }
}