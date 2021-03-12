const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    carbohydrate: {
        type: Number
    },
    protein: {
        type: Number
    },
    fat: {
        type: Number
    },
    fibre: {
        type: Number
    }
})

module.exports = mongoose.model('Food', FoodSchema);