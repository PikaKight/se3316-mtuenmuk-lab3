const mongoose = require('mongoose');
const { collection } = require('../../database/schema/genre');
require("dotenv").config();

const uri = `mongodb+srv://mtuenmuk:${process.env.password}@se3316.cfpaiqb.mongodb.net/se3316?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))

function saveData(document){
    document.save()
};

function delData(collection){
    collection.remove()
    console.log("removed")
};

module.exports = saveData;