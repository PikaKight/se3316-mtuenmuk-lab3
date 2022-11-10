const express = require("express");
const {parse} = require('csv-parse');
const fs = require('fs');
const Joi = require('joi');


const {saveData, findAll, checkExist, findOne, deleteOne} = require('./database.js');
const Genre = require('../../database/schema/genre.js');
const Artist = require("../../database/schema/artist.js");
const Track = require("../../database/schema/track.js");
const Playlist = require("../../database/schema/playlist.js");


require("dotenv").config();

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    console.log('here');
    res.send('Hi');
});


app.get('/genres', (req, res) =>{
    
    const genre = [];

    fs.createReadStream("lab3-data/genres.csv")
            .pipe(
                parse({
                    delimiter: ",",
                    columns: true,
                    group_columns_by_name: true,
                    
                })
            )
            .on('data', (data)=>{
                genre.push(data);
            })
            .on("end", () => {
                console.log("parsed")

                const genres = genre.map(({
                    genre_id: genreID,
                    parent: parentID, 
                    title
                }) => ({
                        genreID,
                        parentID,
                        title
                    }));
                
                 

                genres.forEach((item) => {         
                    saveData(new Genre(item));
                })
                
                console.log("done")
                res.send("done")
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
                artist.push(data);
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
                    }) => ({
                        artistID, 
                        creationDate, 
                        handle, 
                        name, 
                        numComments, 
                        numFav, 
                        tags
                    }));
                                                
                    artists.forEach((item) => {       
                        saveData(new Artist(item));
                    })
                    
                    console.log("done")
                    res.send("done")
            });
});


app.get('/track', (req, res) =>{
    
    const track = [];

    fs.createReadStream("lab3-data/raw_tracks.csv")
            .pipe(
                parse({
                    delimiter: ",",
                    columns: true,
                    group_columns_by_name: true,
                    to: 500
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
                        artist_id: artistID, 
                        artist_name: name,
                        tags,
                        track_date_created: creationDate,
                        track_date_recorded: recordDate,
                        track_duration: duration,
                        track_genres: genres,
                        track_number: trackNum,
                        track_title: title
                    }) => ({
                        trackID,
                        albumID,
                        albumTitle,
                        artistID,
                        name,
                        tags,
                        creationDate,
                        recordDate,
                        duration,
                        genres,
                        trackNum,
                        title
                    }));
                    
                    tracks.forEach((item) => {         
                        saveData(new Track(item));
                    })

                    console.log("done")
                    res.send("done")
            });
});

app.get('/artist/:name', async (req, res) => {
    const data = await findAll(Artist, "name", req.params.name)
    console.log("done")
    res.send(data)
});

app.get('/track/:id', async (req, res) => {
    const data = await findAll(Track, "trackID", req.params.id)
    console.log("done")
    res.send(data)
});

app.post('/playlist', async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().required()
    });

    const validation = schema.validate(req.body);
        
    if (validation.error){
        res.status(400).send(validation.error.details[0].messages)
        return;
    }

    const checker = await checkExist(Playlist, "name", req.body.name);
    if (checker !== null){
        console.log("Playlist already exist")
        res.send("Playlist already exist")
        return;
    };

    
    const playlist = {
        name: req.body.name,
        trackID: []
    };

    const pL = new Playlist(playlist);

    saveData(pL);
    res.send(playlist);
});

app.post('/playlist/tracks', async (req, res) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        trackID: Joi.array().required()
    });

    const validation = schema.validate(req.body);
        
    if (validation.error){
        res.status(400).send(validation.error.details[0].messages)
        return;
    }

    const checker = await checkExist(Playlist, "name", req.body.name);
    if (checker == null){
        console.log("Playlist doesn't exist")
        res.send("Playlist doesn't exist")
        return;
    };

    const data = await findOne(Playlist, "name", req.body.name, "trackID", req.body.tracks)
    res.send(data)
    console.log("done")
})

app.post('/playlist/delete', async (req, res) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
    });

    const validation = schema.validate(req.body);
        
    if (validation.error){
        res.status(400).send(validation.error.details[0].messages)
        return;
    }

    const checker = await checkExist(Playlist, "name", req.body.name);
    if (checker == null){
        console.log("Playlist doesn't exist")
        res.send("Playlist doesn't exist")
        return;
    };

    deleteOne(Playlist, "name", req.body.name)
    console.log("deleted")
})

const port = process.env.PORT || 5501;
app.listen(port, () => console.log(`listing to port ${port}`));