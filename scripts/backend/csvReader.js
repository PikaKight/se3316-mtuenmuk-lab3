const {parse} = require('csv-parse');
const fs = require('fs');

const info = [];

function readCSV(path){
    fs.createReadStream(path)
    .pipe(
        parse({
            delimiter: ",",
            colums: true,
        })
    )
    .on('data', (data)=>{
        info.push(data);
    })
    .on("end", () => {
        console.log("parsed")
        
    });
    return info;
}

module.exports = {readCSV}
    