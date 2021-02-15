const Day = require('../models/Day')

exports.createMeal = async (req, res) => {
    console.log(req.params.dayId);
    const day = await Day.findById(req.params.dayId);
    console.log(day);
    res.json({data: day})
}