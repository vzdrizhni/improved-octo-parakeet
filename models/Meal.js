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
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
        },
        weight: {
            type: Number,
            required: true,
            default: 0
        },
    }],
    totalCalories: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

MealSchema.statics.getAllCallories = async function () {
    console.log(this);

    const obj = await this.aggregate([{
            $unwind: "$food"
        },
        {
            $lookup: {
                from: 'meals',
                localField: 'food',
                foreignField: '_id',
                as: 'food'
            }
        }
    ]);

    console.log(obj);

    // obj.map(item => {
    //     console.log(item.food);
    // })
};

MealSchema.pre('save', async function () {
    const allCallories = this.food.reduce((a, b) => {
        return a + b.calories
    }, 0);
    this.totalCalories = allCallories

});

module.exports = mongoose.model('Meal', MealSchema);