var express = require('express');
var router = express.Router();
var queries = require('../db/queries')
var watson = require('watson-developer-cloud')
require('dotenv').config()

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD
});

var params = {
  // From file
  audio: fs.createReadStream('./resources/likeso.wav'),
  content_type: 'audio/wav; rate=44100',
  timestamps: true,
  keywords: '%HESITATION,so,like,you know,well,actually,basically,I mean',
  keywords_threshold: 0.5
};

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
  router.post('/addAudio', (req, response) => {
    queries.addAudio(req.body, res.results[0])
      .then(() => {
        response.redirect('/')
      })
  });
});

// or streaming
fs.createReadStream('./resources/practice1.wav')
  .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/l16; rate=44100', timestamps: true, keywords: ['%HESITATION,so,like,you know,well,actually,basically,I mean'],
  keywords_threshold: 0.5}))
  .pipe(fs.createWriteStream('./transcription.txt'));







module.exports = router;
