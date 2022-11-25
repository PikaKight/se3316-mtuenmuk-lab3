const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    trackID: {
        type: Number,
        required: false
    },
    albumID: {
        type: Number,
        requried: false
    },
    albumTitle: {
        type: String,
        required: false
    },
    artistID: {
        type: Number,
        required: false
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
        required: false
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
        required: false
    },
    title: {
        type: String,
        required: false
    }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track; 