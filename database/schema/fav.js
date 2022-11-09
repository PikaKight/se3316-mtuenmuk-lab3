const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fav = new Schema({
    ranking: {
        type: Number,
        required: true
    }
});