window.onload = initialSetup;
var csrftoken;
var recordButton;
var recordMessage;
var isRecording = false;
var recordedAudio;
var audioChunks = [];
var blob;
const soundClips = document.querySelector('.sound-clips');
const canvas = document.querySelector('.grafik');
const player = document.querySelector('#player');


player.addEventListener("pause", function() {
    player.currentTime = 0;
});

let audioCtx;
const canvasCtx = canvas.getContext("2d");

navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {
          handlerFunction(stream)})


function initialSetup() {
    console.log('Initial!')
    csrftoken = getCookie('csrftoken');
    recordButton = document.getElementById("recordButton");
    recordMessage = document.getElementById("recordMessage");
    recordedAudio = document.getElementById("recordedAudio");

    
}

function startRecord() {
    if (isRecording) {
        console.log('Запись остановлена')
        isRecording = false;
        recordButton.style.borderRadius = "50%";
        recordMessage.hidden = true;
        rec.stop()
    } else {
        console.log('Идёт запись')
        isRecording = true;
        recordButton.style.borderRadius = "0%"
        recordMessage.hidden = false;
        rec.start()
    }
}

function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
        audioChunks.push(e.data);
        //console.log(audioChunks);
        if (rec.state == "inactive"){
            blob = new Blob(audioChunks,{type:'audio/wav'});
            audioChunks = [];
            // recordedAudio.src = URL.createObjectURL(blob);
            // recordedAudio.controls=true;
            // recordedAudio.hidden = false;
            sendRecord()
    //sendData(blob)
  }
}
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// function sendRecord() {
//     let response=fetch("get_recorded_audio/", {
//     method: "post",
//     body: blob,
//     headers: { "X-CSRFToken": csrftoken },
    
//     success: function(response) {
//         alert(response.fileName);}
//     })
// }

function sendRecord() {
    const clipContainer = document.createElement('article');
    const clipLabel = document.createElement('p');
    const audio = document.createElement('audio');
    const analisButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    

    clipContainer.classList.add('clip')
    audio.setAttribute('controls', '')
    
    analisButton.textContent = 'Анализ'
    analisButton.className = 'analis'
    analisButton.id = 'analis'
    deleteButton.textContent = 'Удалить'
    deleteButton.className = 'delete'

    clipLabel.className = 'nameClip'
    // clipLabel.hidden
    

   


    audio.addEventListener("pause", function() {
        audio.currentTime = 0;
    });
    

    clipContainer.appendChild(audio);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(deleteButton);
    clipContainer.appendChild(analisButton);
    soundClips.appendChild(clipContainer);


    audio.controls = true;
    const audioURL = window.URL.createObjectURL(blob);
    audio.src = audioURL;

    deleteButton.onclick = function(e) {
      let evtTgt = e.target;
      evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    }

    analisButton.onclick = function(e) {
        let evtTgt = e.target;
        console.log('evtTgt', evtTgt.parentNode)
        console.log('evtTgt', evtTgt.parentNode.querySelector('.nameClip').textContent)
        nameOfClip = evtTgt.parentNode.querySelector('.nameClip').textContent
        analis(nameOfClip)
    }
    $(".nameClip").hide();

    fetch("get_recorded_audio/", {
    method: "post",
    body: blob,
    headers: { "X-CSRFToken": csrftoken },
    })
        .then(response => response.json()) // converts the response to JSON
        .then(data => {console.log(data)
            // sessionStorage.setItem('fileName', data['fileName'])
            clipLabel.textContent = data['fileName']
            
        }
        )
        // do something (like update the DOM with the data)
}


function analis(nameOfClip) {


    var csrfToken = $("input[name=csrfmiddlewaretoken]").val()
    path = $("#player").children().attr('src')
    wav1 = path.split('/')
    wav1 = wav1[wav1.length - 1]
    wav1 = wav1.split('.')
    wav1 = wav1[0]
    console.log('wav1', wav1, path)


    // if (sessionStorage.getItem('fileName')) {
    //     fileName = sessionStorage.getItem('fileName')
    // }else {
    //     fileName = 'test'
    // }

    fileName = nameOfClip

    

    $.ajax({
        url: '/repeater/message2u/',
        data: {csrfmiddlewaretoken: csrfToken, 
            'wav': wav1,
            'fileName': fileName
        },
        type: 'post',
        dataType: 'json',
        success: function(response) {
            alert(response.message_2u);
            // draw(response.message_2u)
            // $("#mess").append('<div>' + response.message_2u + '</div>')
        }
    })
}


draw ()
  
    function draw() {
      const WIDTH = canvas.width
      const HEIGHT = canvas.height;
  
      requestAnimationFrame(draw);
  
    //   analyser.getByteTimeDomainData(dataArray);
  
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  
      canvasCtx.beginPath();
      bufferLength = 5
      let sliceWidth = WIDTH * 1.0 / 24;
      let x = 0;
    
      dataArray = [.5,.6,.4,.1,.9]
  
      for(let i = 0; i < bufferLength; i++) {
  
        let v = dataArray[i] ;
        let y = v * HEIGHT;
  
        x=sliceWidth*i
        canvasCtx.moveTo(x, 0 + HEIGHT);
        canvasCtx.lineTo(x, HEIGHT - y);
      }
  
     canvasCtx.stroke();
  
    }
  