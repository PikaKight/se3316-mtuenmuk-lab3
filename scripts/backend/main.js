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
                    group_columns_by_name: true,
                    to: 500
                })
            )
            .on('data', (data)=>{
                genre.push(data);
            })
            .on("end", () => {
                console.log("parsed")

                const genres = genre.map(({genre_id: genreID, parent: parentID, title}) => ({genreID, parentID, title}));
                                
                res.send(genres)
            });
});


app.get('/artist', (req, res) =>{
    
    const artist = [];

    fs.createReadStream("lab3-data/raw_artists.csv")
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

                const artists = artist.map(({
                        artist_id: artistID, 
                        artist_date_created: creationDate, 
                        artist_handle: handle, 
                        artist_name: name,
                        artist_comments: numComments,
                        artist_favorites: numFav,
                        tags
                    }) => ({artistID, creationDate, handle, name, numComments, numFav, tags}));
                                
                res.send(artists)
            });
});


app.get('/track', (req, res) =>{
    
    const track = [];

    fs.createReadStream("lab3-data/raw_tracks.csv")
            .pipe(
                parse({
                    delimiter: ",",
                    columns: true,
                    group_columns_by_name: true
                })
            )
            .on('data', (data)=>{
                track.push(data);
            })
            .on("end", () => {
                console.log("parsed")

                const tracks = track.map(({
                        track_id: trackID, 
                        album_id: albumID, 
                        album_title: albumTitle,
                        artist_id: artisID, 
                        artist_name: name,
                        tags: numComments,
                        track_date_created: creationDate,
                        track_date_recorded: recordDate,
                        track_duration: duration,
                        track_genres: genres,
                        track_number: trackNum,
                        track_title: title
                    }) => ({
                        trackID,
                        albumID,
                        albumTitle, artisID,
                        name,
                        numComments,
                        creationDate,
                        recordDate,
                        duration,
                        genres,
                        trackNum,
                        title
                    }));
                                
                res.send(tracks)
            });
});

const port = process.env.PORT || 5501;
app.listen(port, () => console.log(`listing to port ${port}`));