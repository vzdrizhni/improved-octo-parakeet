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
    }
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema);