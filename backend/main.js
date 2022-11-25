const express = require("express");
const {parse} = require('csv-parse');
const fs = require('fs');
const Joi = require('joi');
const path = require('path');


const {saveData, findAll, checkExist, findOne, deleteOne, findOneStr} = require('./database.js');
const Genre = require('../database/schema/genre.js');
const Artist = require("../database/schema/artist.js");
const Track = require("../database/schema/track.js");
const Playlist = require("../database/schema/playlist.js");
const { type } = require("os");


require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.static('public'))
app.use('/', express.static('public/pages'))

app.get('/getGenres', (req, res) =>{
    
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


app.get('/getArtist', (req, res) =>{
    
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


app.get('/getTrack', (req, res) =>{
    
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

                duration = data.track_duration.split(':');

                minute = parseFloat(duration[0]) + (parseFloat(duration[1]) / 60);

                data.track_duration = minute.toString();

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

app.get('/track/:title', async (req, res) => {
    const data = await findOneStr(Track, "title", req.params.title)
    
    let newDuration = data.duration.split('.');

    let minute = newDuration[0];

    let sec = Math.floor((parseFloat('0.' + newDuration[1])*60)).toString();

    data['duration'] = `${minute}:${sec}`;

    res.send(data)
});

app.get('/track-album/:album', async (req, res) => {
    const data = await findOneStr(Track, "albumTitle", req.params.album)

    let newDuration = data.duration.split('.');

    let minute = newDuration[0];

    let sec = Math.floor((parseFloat('0.' + newDuration[1])*60)).toString();

    data['duration'] = `${minute}:${sec}`;

    res.send(data)
});

app.get('/track-artist/:name', async (req, res) => {
    const data = await findOneStr(Track, "name", req.params.name)

    let newDuration = data.duration.split('.');

    let minute = newDuration[0];

    let sec = Math.floor((parseFloat('0.' + newDuration[1])*60)).toString();

    data['duration'] = `${minute}:${sec}`;

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
        tracks: []
    };

    const pL = new Playlist(playlist);

    saveData(pL);
    res.send(playlist);
});

app.post('/playlist/tracks', async (req, res) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        tracks: Joi.array().required()
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

    const data = await findOne(Playlist, "name", req.body.name, "tracks", req.body.tracks)
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

app.get('/playlist/count', async (req, res) => {
    const count = [];
    
    const durationList = [];
    
    const data = await findAll(Playlist)

    for (item of data) {

        let trackNum = item.tracks.length;
        
        let nameList = {
            'name': item.name,
            'trackNum': trackNum,
            'totalDuration': await calcTotalDuration(item.tracks)
        };
        
        count.push(nameList)
    }
    res.send(count)
});

async function calcTotalDuration(tracks){
    
    let totalDuration = 0;

    for (track of tracks){
        let data = await findOne(Track, 'trackID', track)

        let minute = parseFloat(data.duration);
        
        totalDuration += minute;
        
    }
    
    let newDuration = totalDuration.toString().split('.');

    let minute = newDuration[0];

    let sec = Math.floor((parseFloat('0.' + newDuration[1])*60)).toString();
    
    return `${minute}:${sec}`;
}

const port = process.env.PORT || 5501;
app.listen(port, () => console.log(`listing to port ${port}`));