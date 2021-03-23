const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    normalWeight: {
        type: Number,
    },
    normOfDailyCalories: {
        type: Number,
    },
    reducedNormOfCalories: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: [
            true, 'Please add a gender'
        ],
        enum: ['male', 'female']
    },
    age: {
        type: Number,
        required: true
    }
});

UserDetailsSchema.pre('save', async function () {
    if (this.gender === 'male') {
        this.normalWeight = (this.height - 100) * 1.15;
        this.normOfDailyCalories = (10 * this.weight) + (6.25 * this.height) - (5 * this.age) + 5;
    } else {
        this.normalWeight = (this.height - 110) * 1.15;
        this.normOfDailyCalories = (10 * this.weight) + (6.25 * this.height) - (5 * this.age) - 161;
    }
    this.reducedNormOfCalories = this.normOfDailyCalories * 0.8;
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema);