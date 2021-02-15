const Day = require('../models/Day');
const Meal = require('../models/Meal');

exports.createMeal = async (req, res) => {
    req.body.day = req.params.dayId;

    const day = await Day.findById(req.params.dayId);

    if (!day) {
        return
    }
    let meal = await Meal.create(req.body);
    res.json({data: meal});
}