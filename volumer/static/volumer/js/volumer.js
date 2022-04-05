const result = document.querySelector('.result');
const volume1 = document.querySelector('.volume1');
const volume2 = document.querySelector('.volume2');
const play1 = document.querySelector('#play1');
const play2 = document.querySelector('#play2');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const src1 = document.querySelector('.src1');
const src2 = document.querySelector('.src2');


var play1BtnClick = 0
var play2BtnClick = 0
var sound01
var sound02
var x
var y
var sound1src
var sound2src

soundRnd()

function soundRnd(){

    sound1src = static_url + 'volumer/sounds/' + Math.round(Math.random()*11)*2 + ".wav"
    sound2src = static_url + 'volumer/sounds/' + Math.round(Math.random()*11)*2 + ".wav"
    
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
   
    console.log(x, y)
    
    sound01 = new Howl({
        src: [sound1src],
        volume: x
    })

    sound02 = new Howl({
        src: [sound2src], 
        volume: y
    })   
}

play1.onclick = function() {
    result.textContent = ''
    volume1.textContent = ''
    volume2.textContent = ''

    sound01.play()
    play1BtnClick +=1
}

play2.onclick = function() {
    result.textContent = ''
    volume1.textContent = ''
    volume2.textContent = ''

    sound02.play()
    play2BtnClick +=1
}


button1.onclick = function() {
    if (x > y) {
        result.textContent = 'OK!'
    } else {
        result.textContent = 'NO...'
    } 
    sendResault()
     
}

button2.onclick = function() {
    if (x < y) {
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
            'volume1': x,
            'volume2': y,
            'result': result.textContent,
            'sound1': extractFileName (sound1src),
            'sound2': extractFileName (sound2src),
            'play1BtnClick': play1BtnClick,
            'play2BtnClick': play2BtnClick
        },
        type: 'post',
        dataType: 'json',
        success: function(response) {
            volume1.textContent = response.volume1
            volume2.textContent = response.volume2
            result.textContent = response.result
            soundRnd()
            play1BtnClick = 0
            play2BtnClick = 0
        }
    })
}