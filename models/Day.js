const mongo = require('mongoose');

const DaySchema = new mongo.Schema({
    name: {
        type: Date,
        required: true
    }
})

module.exports = mongo.model('Day', DaySchema);