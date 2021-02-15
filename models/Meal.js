const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Meal-' + Date.now().toString()
    },
    day: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Day',
        required: true
    },
    food: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Meal', MealSchema);