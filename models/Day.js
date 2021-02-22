const mongo = require('mongoose');

const Schema = mongo.Schema;

const DaySchema = new mongo.Schema({
    name: {
        type: Date,
        required: true
    },
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }],
}, {
    timestamps: true
})

module.exports = mongo.model('Day', DaySchema);