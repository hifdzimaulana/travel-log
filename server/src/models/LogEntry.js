const mongoose = require('mongoose');

// Schema
const requiredNumber = {
    type : Number,
    required : true
}

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : String,
    comments : String,
    image : String,
    rating : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    lat : { // latitude
        ...requiredNumber,
        min : -90,
        max : 90
    }, 
    long : { // longitude
        ...requiredNumber,
        min : -180,
        max : 180
    }, 
    visitedDate : {
        type : Date,
        required : true
    }
}, {
    timestamps : true
});

// Model
const LogEntry = mongoose.model('LogEntry', schema)

module.exports = LogEntry;