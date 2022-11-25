const mongoose = require('mongoose');
require("dotenv").config();

const uri = `mongodb+srv://mtuenmuk:${process.env.mongodbPsw}@se3316.cfpaiqb.mongodb.net/se3316?retryWrites=true&w=majority`;
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
    
    if ((typeof value) == String){
        return collection.find({
            [param]: { $regex: new RegExp(value, 'i')}
        })
    }

    return collection.find({
        [param]: value
    })

    
}

async function findOneStr(collection, param, value, updateKey, updateValue){
        
    return await collection.findOne({
        [param]: { $regex: new RegExp(value, 'i')}
    })
}

async function findOne(collection, param, value, updateKey, updateValue){
    return await collection.findOne({
        [param]: value
    })
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

module.exports = {saveData, delData, findAll, deleteAll, checkExist, findOne, deleteOne, findOneStr};