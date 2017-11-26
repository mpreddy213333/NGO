const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://localhost/testdb";
mongoose.promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error("Error : "+ err);
    }
});

router.get('/', function(req,res){
    res.send('router working now');
});

router.get('/videos', function(req,res){
    console.log("get request for all videos");
    Video.find({})
    .exec(function(err, videos){
        if(err){
            console.log("error retriving videos");
        }else{
            res.json(videos);
        }
    });
});

router.post('/video', function(req,res){
    console.log("post a video");
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err,insertedVideo){
        if(err){
            console.log("error inserting video");
        }else{
            res.json(insertedVideo);
        }
    });
});

module.exports = router;