const pg = require('./knex')




function addAudio(data, audio){
  //specific filler words
  var hesitation = 0
  var so = 0
  var like = 0
  var youKnow = 0
  var well = 0
  var actually = 0
  var basically = 0
  var iMean = 0

  var fillers = Object.keys(audio.keywords_result)
  for (var j=0; j<fillers.length; j++){
    if (fillers[j] === '%HESITATION'){
      hesitation += audio.keywords_result[fillers[j]].length
    }
    if (fillers[j] === 'so'){
      so += audio.keywords_result[fillers[j]].length
    }
    if (fillers[j] === 'like'){
      like += audio.keywords_result[fillers[j]].length
    }
    if (fillers[j] === 'you know'){
      youKnow += audio.keywords_result[fillers[j]].length
    }
    if (fillers[j] === 'well'){
      well += audio.keywords_result[fillers[j]].length
    }
    if (fillers[j] === 'actually'){
      actually += audio.keywords_result[fillers[j]].length
    }
    if (fillers[j] === 'basically'){
      basically += audio.keywords_result[fillers[j]].length
    }
    if (fillers[j] === 'i mean'){
      iMean += audio.keywords_result[fillers[j]].length
    }
  }

//number of fillers total
  var num = 0

  for (var k=0; k<fillers.length; k++){
    word = audio.keywords_result[fillers[k]]
    num += word.length
  }

  // avg length of pauses
  function pausing(){
    var pause_times = 0
         for (var l=0; l<(audio.alternatives[0].timestamps).length -1; l++){
           pause_times += ((audio.alternatives[0].timestamps[l+1][1] - audio.alternatives[0].timestamps[l][2]))/(audio.alternatives[0].timestamps).length
         }
         return pause_times
  }
  var pauses = pausing()

//length of audio
  var alternatives = audio.alternatives[0]
  var length = (alternatives.timestamps[alternatives.timestamps.length-1][2])


  return pg('presentation').insert({
    title:data.title,
    user_id: 1,
    confidence: alternatives.confidence,
    transcript: alternatives.transcript,
    number_of_fillers: num,
    hesitation: hesitation,
    so: so,
    like: like,
    you_know: youKnow,
    well: well,
    actually: actually,
    basically: basically,
    i_mean: iMean,
    pauses: pauses,
    length_of_audio: length
  })
}

module.exports={
  addAudio
}
