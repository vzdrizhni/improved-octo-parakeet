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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Food'
    }]
}, {
    timestamps: true
});

MealSchema.statics.getAllCallories = async function() {
    console.log(this);

    const obj = await this.aggregate([
        {
            $group: {
                _id: '$food',
                averageCost: {
                    $sum: '$food.calories'
                }
            }
        }
    ]);

    console.log(obj);
};

MealSchema.post('findOneAndUpdate', async function () {
    await this.model.getAllCallories();
});

module.exports = mongoose.model('Meal', MealSchema);