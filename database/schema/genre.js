const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
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

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre; 