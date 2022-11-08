const express = require("express");
const csv = require("../backend/csvReader.js");
require("dotenv").config();

const app = express();

app.get('/', (req, res) =>{
    console.log('here');
    res.send('hi');
});


app.post('/api/csv', (req, res) =>{
    
    path = req.query.path
    console.log(path);
    res.send(csv.readCSV(path))

});

const port = process.env.PORT || 5501;
app.listen(port, () => console.log(`listing to port ${port}`));