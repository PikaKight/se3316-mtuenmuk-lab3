const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genre = new Schema({
    genreID: {
        type: Number,
        required: true
    },
    genreName: {
        type: String,
        required: true
    },
    parentID: {
        type: Number,
        required: true
    }
});