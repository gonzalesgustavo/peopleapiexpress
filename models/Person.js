const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        default: 'other'
    },
    occupation: {
        type: String,
        default: 'unknown'
    }
});

module.exports = mongoose.model('Person', personSchema);