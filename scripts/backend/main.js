const express = require("express");

require("dotenv").config();

const app = express();

app.get('/', (req, res) =>{
    console.log('here');
    res.send('hi');
})


const port = process.env.PORT || 5501;
app.listen(port, () => console.log(`listing to port ${port}`));