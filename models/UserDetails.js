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
        required: true
    },
    normOfDailyCalories: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    age: {
        type: Number,
        required: true
    }
});

UserDetailsSchema.pre('save', async function () {
    if (gender === 'male') {
        this.normalWeight = (height - 100)*1.15
    } else {
        this.normalWeight = (height - 110)*1.15
    }  
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema);