const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genreID: {
        type: Number,
        required: true
    },
    parentID: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
    
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre; 