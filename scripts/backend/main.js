const express = require("express");
const {parse} = require('csv-parse');
const fs = require('fs');


require("dotenv").config();

const app = express();

app.get('/', (req, res) =>{
    console.log('here');
    res.send('hi');
});


app.get('/genres', (req, res) =>{
    
    const genre = [];

    fs.createReadStream("lab3-data/genres.csv")
            .pipe(
                parse({
                    delimiter: ",",
                    columns: true,
                    group_columns_by_name: true
                })
            )
            .on('data', (data)=>{
                genre.push(data);
            })
            .on("end", () => {
                console.log("parsed")

                const genres = genre.map(({top_level, ...rest}) => rest);
                genres.forEach(
                    (x) => {
                        delete x['#tracks'];
                    });

                res.send(genres)
            });
});

const port = process.env.PORT || 5501;
app.listen(port, () => console.log(`listing to port ${port}`));