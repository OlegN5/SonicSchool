


// var id1 = sound01.play()
// var id2 = sound02.play()


// sound01.fade(1, 0, 1000, id1);
// sound02.rate(1.5, id2);



// let audioCtx = new (window.AudioContext || window.webkitAudioContext)()


var AudioContext = window.AudioContext // Default
|| window.webkitAudioContext // Safari and old versions of Chrome
|| false; 

if (AudioContext) {
// Do whatever you want using the Web Audio API
var audioCtx = new AudioContext();
// ...ы
} else {
// Web Audio API is not supported
// Alert the user
alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
}





// let AudioContext = window.AudioContext || window.webkitAudioContext
// var audioCtx
// if(!audioCtx) {
//   audioCtx = new window.AudioContext();
// }


const sound1 = document.querySelector('.sound1');
const sound2 = document.querySelector('.sound2');
const result = document.querySelector('.result');
const volume1 = document.querySelector('.volume1');
const volume2 = document.querySelector('.volume2');
const play1 = document.querySelector('#play1');
const play2 = document.querySelector('#play2');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const src1 = document.querySelector('.src1');
const src2 = document.querySelector('.src2');

source1 = audioCtx.createMediaElementSource(sound1)
source2 = audioCtx.createMediaElementSource(sound2)

let gainNode1 = audioCtx.createGain()
source1.connect(gainNode1)
gainNode1.connect(audioCtx.destination) 


let gainNode2 = audioCtx.createGain()
source2.connect(gainNode2)
gainNode2.connect(audioCtx.destination)
var sound01
var sound02



soundRnd()

function soundRnd(){


    sound1.src = static_url + 'volumer/sounds/' + Math.round(Math.random()*11)*2 + ".wav"
    sound2.src = static_url + 'volumer/sounds/' + Math.round(Math.random()*11)*2 + ".wav"
    
    levelMax = 8 //set up rande 
    levelMin = 5 //set down rande 

    poljarnost = randomInteger (0, 1)
    if (poljarnost == 1) {
        poljarnost = 1
    }else {
        poljarnost = -1
    }

    
    x = (randomInteger(levelMax, 100 - levelMax))/100
    x = x.toFixed(3)
    y = (x*100 + randomInteger(levelMin, levelMax)*poljarnost)/100
    y = y.toFixed(3)
    
    // sound1.volume = x
    // sound2.volume = y
    gainNode1.gain.value = x 
    gainNode2.gain.value = y 
    console.log(x, y)
    console.log(gainNode1.gain.value, gainNode2.gain.value)


    sound01 = new Howl({
        src: [sound1.src],
        volume: x
    })
    sound02 = new Howl({
        src: [sound2.src], 
        volume: y
    })

     
}

play1.onclick = function() {
    sound01.play()
}

play2.onclick = function() {
    sound02.play()
}




sound1.addEventListener('play', function() {
    audioCtx.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });
sound2.addEventListener('play', function() {
    audioCtx.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });




sound1.onplay = function() {
    result.textContent = ''
    volume1.textContent = ''
    volume2.textContent = ''
    audioCtx.resume().then(() => {
        console.log('Playback resumed successfully');
      });
}

sound2.onplay = function() {
    result.textContent = ''
    volume1.textContent = ''
    volume2.textContent = ''
    audioCtx.resume().then(() => {
        console.log('Playback resumed successfully');
      });
}

sound1.addEventListener("pause", function() {
    sound1.currentTime = 0;
});

sound2.addEventListener("pause", function() {
    sound2.currentTime = 0;
});


button1.onclick = function() {
    if (gainNode1.gain.value >  gainNode2.gain.value) {
        result.textContent = 'OK!'
    } else {
        result.textContent = 'NO...'
    } 
    sendResault()
}

button2.onclick = function() {
    if (gainNode1.gain.value < gainNode2.gain.value) {
        result.textContent = 'OK!'
    } else {
        result.textContent = 'NO...'
    }

    sendResault()
}



function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


function extractFileName (path) {
    wav1 = path.split('/')
    wav1 = wav1[wav1.length - 1]
    wav1 = wav1.split('.')
    wav1 = wav1[0]
    return wav1
}


function sendResault() {

    var csrfToken = $("input[name=csrfmiddlewaretoken]").val()
   

    $.ajax({
        url: '/volumer/result/',
        data: {csrfmiddlewaretoken: csrfToken, 
            'volume1': gainNode1.gain.value.toFixed(3),
            'volume2': gainNode2.gain.value.toFixed(3),
            'result': result.textContent,
            'sound1': extractFileName (sound1.src),
            'sound2': extractFileName (sound2.src)
        },
        type: 'post',
        dataType: 'json',
        success: function(response) {
            volume1.textContent = response.volume1
            volume2.textContent = response.volume2
            result.textContent = response.result
            soundRnd()
        }
    })
}