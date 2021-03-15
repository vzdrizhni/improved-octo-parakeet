const mongo = require('mongoose');
var dateFormat = require("dateformat");

const Schema = mongo.Schema;

const DaySchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
        default: dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
    },    
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongo.model('Day', DaySchema);