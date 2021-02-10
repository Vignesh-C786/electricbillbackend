const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let billSchema = new Schema({

    meterno: {
        type: String,
        required: true
    },
    currentreading: {
        type: String,
        required: true
    },
    previousreading: {
        type: String,
        required: true
    },
    duedate: {
        type: String
    },
    date: {
        type: String
    },
    units: {
        type: Number
    },
    amount: {
        type: Number
    }
}, {
    collection: 'bills'
})

module.exports = mongoose.model('Bill', billSchema)