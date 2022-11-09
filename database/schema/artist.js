const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    artisID: {
        type: Number,
        required: true
    },
    creationDate: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    numComments: {
        type: Number,
        required: true
    },
    numFav: {
        type: Number,
        required: true
    },
    tags:{
        type: Array,
        required: true
    }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist; 