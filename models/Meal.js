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
        { $lookup: {from: 'meals', localField: 'food', foreignField: '_id', as: 'food'} } 
    ]);

    console.log(obj);

    // obj.map(item => {
    //     console.log(item.food);
    // })
};

MealSchema.pre('findOneAndUpdate', async function () {
    // await this.model.getAllCallories();
    const meal = await this.findOne(this);
    const allCallories = meal.food.reduce((a, b) => {
        return a.calories + b.calories
    }, 0);
    await this.updateOne({_id: meal._id}, {$set: {totalCalories: allCallories}});
});

module.exports = mongoose.model('Meal', MealSchema);