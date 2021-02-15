const Day = require('../models/Day');

exports.createDay = async (req, res) => {
    let savedDay;

    if (req) {
        savedDay = await Day.create({name: Date.now()})
    }

    console.log(savedDay);
    res.status(200).json({data: savedDay})
}

exports.getDay = async (req, res) => {
    const day = await Day.findById(req.params.dayId);
    res.status(200).json({data: day})
}