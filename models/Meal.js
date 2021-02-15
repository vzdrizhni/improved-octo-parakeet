const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Meal' + Date.now.toISOString
    },
    food: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model(MealSchema, 'Meal');