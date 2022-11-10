const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    trackID: {
        type: Number,
        required: true
    },
    albumID: {
        type: Number,
        requried: true
    },
    albumTitle: {
        type: String,
        required: false
    },
    artistID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        requried: true
    },
    tags: {
        type: Array,
        requried: true
    },
    creationDate: {
        type: String,
        required: true
    },
    recordDate: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        require: true
    },
    genres: {
        type: Array,
        required: true
    },
    trackNum: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track; 