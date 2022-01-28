
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

const pannerOptions = { pan: 0 };
const panner1 = new StereoPannerNode(audioCtx, pannerOptions);
const panner2 = new StereoPannerNode(audioCtx, pannerOptions);



// let AudioContext = window.AudioContext || window.webkitAudioContext
// var audioCtx
// if(!audioCtx) {
//   audioCtx = new window.AudioContext();
// }


const sound1 = document.querySelector('.sound1');
const sound2 = document.querySelector('.sound2');
const result = document.querySelector('.result');
const pan1 = document.querySelector('.pan1');
const pan2 = document.querySelector('.pan2');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const src1 = document.querySelector('.src1');
const src2 = document.querySelector('.src2');

source1 = audioCtx.createMediaElementSource(sound1)
source2 = audioCtx.createMediaElementSource(sound2)

let gainNode1 = audioCtx.createGain()
source1.connect(gainNode1)
gainNode1.connect(panner1)
panner1.connect(audioCtx.destination)


let gainNode2 = audioCtx.createGain()
source2.connect(gainNode2)
gainNode2.connect(panner2)
panner2.connect(audioCtx.destination)







soundRnd()

function soundRnd(){
    
    sound1.src = static_url + 'wider/sounds/' + Math.round(Math.random()*11)*2 + ".wav"
    sound2.src = static_url + 'wider/sounds/' + Math.round(Math.random()*11)*2 + ".wav"
    
    levelMax = 8 //set up rande 
    levelMin = 5 //set down rande 

    


    poljarnostV = randomInteger (0, 1)
    if (poljarnostV == 1) {
        poljarnostV = 1
    }else {
        poljarnostV = -1
    }
    
    
    y1 = (randomInteger(levelMax, 100 - levelMax))/100
    y1 = y1.toFixed(3)
    y2 = (y1*100 + randomInteger(levelMin, levelMax)*poljarnostV)/100
    y2 = y2.toFixed(3)

    panMax = 9
    panMin = 7


    poljarnostP1 = randomInteger (0, 1)
    if (poljarnostP1 == 1) {
        poljarnostP1 = 1
    }else {
        poljarnostP1 = -1
    }
    poljarnostP2 = randomInteger (0, 1)
    if (poljarnostP2 == 1) {
        poljarnostP2 = 1
    }else {
        poljarnostP2 = -1
    }

    
    
    x1 = (randomInteger(-100 + panMax, 100 - panMax))/100
    x1 = x1.toFixed(3)
    x2 = (x1*100 + randomInteger(panMin, panMax)*poljarnostP2)/100
    x2 = x2.toFixed(3)

 




    
    // sound1.volume = x
    // sound2.volume = y
    gainNode1.gain.value = y1 
    gainNode2.gain.value = y2

    panner1.pan.value = x1
    panner2.pan.value = x2

    console.log(y1, y2)
    console.log(gainNode1.gain.value, gainNode2.gain.value)
    console.log('____')
    console.log(x1, x2)
    console.log(panner1.pan.value, panner2.pan.value)
    console.log('****')

     
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
    pan1.textContent = ''
    pan2.textContent = ''
    audioCtx.resume().then(() => {
        console.log('Playback resumed successfully');
      });
}

sound2.onplay = function() {
    result.textContent = ''
    pan1.textContent = ''
    pan2.textContent = ''
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
    if (panner1.pan.value < panner2.pan.value) {
        result.textContent = 'OK!'
    } else {
        result.textContent = 'NO...'
    } 
    sendResault()
}

button2.onclick = function() {
    if (panner1.pan.value > panner2.pan.value) {
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
        url: '/wider/result/',
        data: {csrfmiddlewaretoken: csrfToken, 
            'pan1': panner1.pan.value.toFixed(3),
            'pan2': panner2.pan.value.toFixed(3),
            'result': result.textContent,
            'sound1': extractFileName (sound1.src),
            'sound2': extractFileName (sound2.src)
        },
        type: 'post',
        dataType: 'json',
        success: function(response) {
            pan1.textContent = response.pan1
            pan2.textContent = response.pan2
            result.textContent = response.result
            soundRnd()
        }
    })
}