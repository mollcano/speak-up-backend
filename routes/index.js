var express = require('express');
var router = express.Router();
var queries = require('../db/queries')
var watson = require('watson-developer-cloud')
require('dotenv').config()

router.get('/audio/:id', (req, res) =>{
  console.log("my id", req.params.id)
  queries.getAudio(req.params.id)
  .then(data => {
    return res.json(data)
  })
})

router.post('/signin', function (req, res, next) {
    queries.findUserIfExists().where({
            email: req.body.username
        }).first()
        .then(function (myuser) {
            if (myuser) {
              if (req.body.password === myuser.password) {
                console.log(res.json(myuser))
                // console.log(myuser.id)
                // return (myuser.id)
              } else {
                  console.log('incorrect password')
              }
            } else {
                console.log('invalid login')
            }
        })
})

router.post('/signup', function (req, res, next) {
    console.log(req.body)
    queries.findUserIfExists().where({
            email: req.body.username
        }).first()
        .then(function (myuser) {
            if (myuser) {
                res.redirect('/');
            } else {
                console.log('I do not exist')
                  queries.userTable(req.body)
                    .then(function (data) {
                      console.log(data)
                    })
            }
        })
})

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD
});


// speech_to_text.recognize(params, function(err, res) {
//   if (err)
//     console.log(err);
//   else
//   router.post('/addAudio/:id', (req, response) => {
//     queries.addAudio(req.body, res.results[0])
//       .then((data) => {
//         return res.json(data)
//       })
//   });
// });




router.post('/addAudio/:id', (req, response) => {
  // console.log(req.body, req.files)
  // console.log(req.files.file.file, "my file")
  // queries.addAudio(req.body)
  //   .then((data) => {
  //     return res.json(data)
  //   })

  var params = {
    // From file
    audio: fs.createReadStream(req.files.file.file),
    content_type: 'audio/wav',
    inactivity_timeout: -1,
    timestamps: true,
    keywords: '%HESITATION,so,like,you know,well,actually,basically,I mean',
    keywords_threshold: 0.5
  };

  speech_to_text.recognize(params, function(err, results) {
    if (err)
      console.log(err);
    else
    queries.addAudio(req.body, results.results[0])
      .then((data) => {
        return response.json(data)
      })
  });
});


// or streaming
// fs.createReadStream('./resources/likeso.wav')
//   .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/l16; rate=44100', timestamps: true, keywords: ['%HESITATION,so,like,you know,well,actually,basically,I mean'],
//   keywords_threshold: 0.5}))
//   .pipe(fs.createWriteStream('./transcription.txt'));



module.exports = router;
