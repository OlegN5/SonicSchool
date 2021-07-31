window.onload = initialSetup;
var csrftoken;
var recordButton;
var recordMessage;
var isRecording = false;
var recordedAudio;
var audioChunks = [];
var blob;

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
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls=true;
            recordedAudio.hidden = false;
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

function sendRecord() {
    let response=fetch("get_recorded_audio", {
    method: "post",
    body: blob,
    headers: { "X-CSRFToken": csrftoken },
    })
}
