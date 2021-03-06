// Created By Eduardo Escoto. This software is open source and useable by anybody wanting to make a bot.
// Please Credit me when used.
// Ask me any questions about this code at @e_esc_ on twitter or at @eduardoescoto on github =)

let twit = require('twit');

//=========heroku launch
//let apiData = require('./apiKeys.js');
//let Twitter = new twit(apiData);
//=========local launch
let apiData = require('./config.js');
let Twitter = new twit(apiData);

const tweetIntervalInMilliseconds = 1000 * 60 * 60 * 6; //setinterval uses milliseconds, this for examples is 6 hours
var kirbyMemes = [
    "./images/kirby_love.png",
    "./images/kirby_bb.png",
    "./images/kirby_bb2.png",
    "./images/kirby_boss.png",
    "./images/kirby_buff.png",
    "./images/kirby_call.png",
    "./images/kirby_care.png",
    "./images/kirby_cloud.png",
    "./images/kirby_computer.png",
    "./images/kirby_cool.png",
    "./images/kirby_cry.png",
    "./images/kirby_deedee.png",
    "./images/kirby_evil.png",
    "./images/kirby_facts.png",
    "./images/kirby_facts2.png",
    "./images/kirby_gun.png",
    "./images/kirby_gun2.png",
    "./images/kirby_love.png",
    "./images/kirby_love2.png",
    "./images/kirby_love3.png",
    "./images/kirby_love4.png",
    "./images/kirby_mad.png",
    "./images/kirby_mad2.png",
    "./images/kirby_nut.png",
    "./images/kirby_peter.png",
    "./images/kirby_sing.png",
    "./images/kirby_sing2.png",
    "./images/kirby_sleep.png",
    "./images/kirby_small_face.png",
    "./images/kirby_snake.png",
    "./images/kirby_soda.png",
    "./images/kirby_spicy.png",
    "./images/kirby_sword.png",
    "./images/kirby_threat.png",
    "./images/kirby_tiddy.png",
    "./images/kirby_watch.png"
];

function postTweet(tweet) {
    let path = 'statuses/update';
    Twitter.post(path, tweet, (err, data, response) => console.log("Tweet Posted Successfuly"));
}

function tweetImage(status, path) {
    let fs = require('fs');
    let image_path = path;//local path to image to tweet
    let b64content = fs.readFileSync(image_path, {
        encoding: 'base64'
    });
    Twitter.post('media/upload', {
        media_data: b64content
    }, (err, data, response) => {
        media_ids = new Array(data.media_id_string);
        const tweetData = generateImageTweetData(status, media_ids);
        console.log("Tweeting the image: " + image_path);
        postTweet(tweetData);
    });
}

function generateImageTweetData(status, media_ids) {
    return {
        media_ids,
        status
    }
}

function exampleImageTweetCreator() {
    console.log("Posting Meme!");
    const tweetText = "it me";
    const imgPath = kirbyMemes[Math.round(Math.random() * (kirbyMemes.length -1))];
    tweetImage(tweetText, imgPath);
}


function startTweetCycles() {
    console.log(`Starting the cycle.`);
    exampleImageTweetCreator(); //runs them once before starting the cycle
   setInterval(() => {
        console.log("Running next cycle...");
        exampleImageTweetCreator();
    }, tweetIntervalInMilliseconds);
}


startTweetCycles();