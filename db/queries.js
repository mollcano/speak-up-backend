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

//pace

var parts = (length/10)
var parts1 = parts
var parts2 = parts*2
var parts3 = parts * 3
var parts4 = parts * 4
var parts5 = parts * 5
var parts6 = parts * 6
var parts7 = parts * 7
var parts8 = parts * 8
var parts9 = parts * 9
var parts10 = parts * 10
var myParts = ([parts1, parts2, parts3, parts4, parts5, parts6, parts7, parts8, parts9, parts10])
var count = [0,0,0,0,0,0,0,0,0,0]
var myWords = audio.alternatives[0].timestamps

for (var i=0; i<myParts.length; i++){
  for (var j=0; j<myWords.length; j++){
    if (myWords[j][1]<myParts[0]){
      count[0]++
    }
    else if(myWords[j][1]>myParts[i] && myWords[j][1] <=myParts[i+1]){
      count[i+1]++
    }
  }
}
var part1=count[0]
var part2=count[1]
var part3=count[2]
var part4=count[3]
var part5=count[4]
var part6=count[5]
var part7=count[6]
var part8=count[7]
var part9=count[8]
var part10=count[9]

//wpm
var wordsPerSecond = (myWords).length/(myWords[(myWords).length-1][2])
var wordsPerMinute = (wordsPerSecond*60)

  return pg('presentation').insert({
    title:data.title,
    user_id: data.user_id,
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
    wpm: wordsPerMinute,
    part1: part1,
    part2: part2,
    part3: part3,
    part4: part4,
    part5: part5,
    part6: part6,
    part7: part7,
    part8: part8,
    part9: part9,
    part10: part10,
    length_of_audio: length
  },"*").then((results)=>{
    return results[0]
  })
}

function getAudio(id){
  return pg('presentation').select().where("user_id", "=", id);
};

function addUser(data) {
  return pg('myuser').insert(data);
};

function findUserIfExists() {
  return pg('myuser').select();
};

module.exports={
  addAudio,
  getAudio,
  addUser,
  findUserIfExists
}
