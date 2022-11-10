const mongoose = require('mongoose');
const { collection, find } = require('../../database/schema/genre');
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

function getAll(collection){
    return collection.find({})
}

function findAll(collection, param, value){
    return collection.find({
        [param]: value
    })
}

function findOne(collection, param, value, updateKey, updateValue){
    let item = collection.findOne({
        [param]: value
    })
    
    item.updateKey = updateValue;

    const doc = new collection(item)

    doc.save();

    return item
}

function deleteAll(collection){
    collection.deleteMany({})
}

function deleteOne(collection, param, value){
    collection.deleteOne({[param]: value});
}

function checkExist(collection, param, check){
    return collection.exists({
        [param]: check
    })
}

module.exports = {saveData, delData, findAll, deleteAll, checkExist, findOne, deleteOne};