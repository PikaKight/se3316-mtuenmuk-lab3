const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    trackID: {
        type: Number,
        required: true
    }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track; 