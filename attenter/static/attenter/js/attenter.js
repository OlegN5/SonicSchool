var bassGuitar;
var sineWave;
var x;
var pomehi = [];
var isPomeha = -1;
var keyDown = false;
var timeoutsPomehi = [];
var checkForRestart;

startMusic = document.querySelector("#start");
restartMusic = document.querySelector("#restart");
stopMusic = document.querySelector("#stop");
check = document.querySelector("#check_");

// const theOneFunc = delay => {
//     console.log('Hello after ' + delay + ' seconds');
//     sineWave.stop()
//   };

restartMusic.disabled = true;
startMusic.disabled = true;
stopMusic.disabled = true;
startMusic.textContent = "LOADING";



bassGuitar = new Pizzicato.Sound(
  {
    source: "file",
    options: {
      path: [static_url + "attenter/sounds/04_Bass.mp3"],
    },
  },
  () => {
    // Sound loaded!
    startMusic.disabled = false;
    startMusic.textContent = "СТАРТ";
    console.log("sound file loaded!");

    bassGuitar.on("stop", () => {
      restartMusic.disabled = false;
      startMusic.disabled = false;
      stopMusic.disabled = true;
    });

    bassGuitar.on("play", () => {
      stopMusic.disabled = false;
      restartMusic.disabled = true;
      startMusic.disabled = true;
      bassTimer = setTimeout(() => {
        bassGuitar.stop();
        checkForRestart = check.innerHTML;
      }, 61 * 1000);
    });
  }
);

sineWave = new Pizzicato.Sound({
  source: "wave",
  options: {
    frequency: 440,
    volume: 0.03,
  },
});

sineWave.on("play", function () {
  //...
  // addSin()
  setTimeout(() => {
    sineWave.stop();
  }, 50);
});





startMusic.addEventListener("click", function () {
  if (Pizzicato.context.state !== "running") {
    Pizzicato.context.resume();
  }
  check.innerHTML = "";
  createPomehi()
  readAndPlayPomehi()
  bassGuitar.play();
  document.querySelector("#mis").textContent = 0;
  console.log("sound fileing!");
});

restartMusic.addEventListener("click", function () {
  if (Pizzicato.context.state !== "running") {
    Pizzicato.context.resume();
  }
  check.innerHTML = checkForRestart;
  readAndPlayPomehi()
  bassGuitar.play();
});

stopMusic.addEventListener("click", function () {
  for (var i = 0; i < timeoutsPomehi.length; i++) {
    clearTimeout(timeoutsPomehi[i]);
  }
  clearTimeout(bassTimer);
  bassGuitar.stop();
  // fillCheck () // find not BAD or GOOD and ADD 'NOT' !!!!!!!!!!!!!!!!!!!!!!!
  checkForRestart = check.innerHTML;
  check.innerHTML = "";


});
//quick reset of the timer array you just cleared





function delaySin(delay, att, rel, fr, vol, n) {
  timeoutsPomehi.push(
    setTimeout(() => {
      sineWave.attack = att;
      sineWave.release = rel;
      sineWave.frequency = fr;
      sineWave.volume = vol;

      sineWave.play();
      checkPomeha(n);
      console.log("sinStart");
      console.log(
        "на ",
        delay,
        ", громкость: ",
        vol,
        ", атака: ",
        att,
        ", релиз: ",
        rel,
        ", частота: ",
        fr
      );
    }, delay * 1000)
  );
}

function checkPomeha(n) {
  isPomeha = n;
  setTimeout(() => {
    if (!keyDown) {
      document.querySelector("#check" + String(isPomeha)).textContent +=
        "BAD__";
    }
    keyDown = false;

    isPomeha = -1;
  }, 980);
}

const isKey = () => {
  document.querySelector("#check" + String(isPomeha)).textContent += "GOOD_";
  keyDown = true;
}

const isNotKey = () => {
  document.querySelector("#mis").textContent =
      parseInt(document.querySelector("#mis").textContent) + 1;

}




document.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && isPomeha > -1) {
    isKey()
  }
  if (e.keyCode == 32 && isPomeha == -1) {
    isNotKey()
  }
});

document.addEventListener("dblclick", function (e) {
    console.log('dc')

    if (isPomeha > -1) {
      isKey()
    }
    if (isPomeha == -1) {
      isNotKey()
    }
    
});




function createPomehi() {
  x = getRandomIntInclusive(3, 10);
  createCheck(x);
  console.log("всего помех", x);
  let n = 0;
  let arr = [];
  while (n < x) {
    // выводит 0, затем 1, затем 2
    delay = getRandomIntInclusive(3, 60);
    for (let b = 0; b < arr.length; b++) {
      if (arr[b] === delay) {
        console.log("b", b, delay);
        delay = getRandomIntInclusive(1, 60);
        b = -1;
      }
    }
    arr.push(delay);
    att = getRandomIntInclusive(3, 100) / 100;
    rel = getRandomIntInclusive(1, 100) / 100;
    fr = getRandomIntInclusive(200, 600);
    vol = getRandomIntInclusive(200, 250) / 1000;
    pomehi.push([delay, vol, att, rel, fr]);
    console.log(
      "на ",
      delay,
      ", громкость: ",
      vol,
      ", атака: ",
      att,
      ", релиз: ",
      rel,
      ", частота: ",
      fr
    );
    // delaySin(delay, att, rel, fr, vol, n);
    n++;
  }
  console.log(arr);
  savePomehi();
  pomehi = [];
}


function readAndPlayPomehi(){
  pomehi = JSON.parse(localStorage.getItem("pomehi"));
  x = pomehi.length;

        console.log("всего помех", x);
        let n = 0;

        while (n < pomehi.length) {
          // выводит 0, затем 1, затем 2
          delay = pomehi[n][0];
          console.log("!!!", delay);
          att = pomehi[n][2];
          rel = pomehi[n][3];
          fr = pomehi[n][4];
          vol = pomehi[n][1];
          console.log(
            "на ",
            delay,
            ", громкость: ",
            vol,
            ", атака: ",
            att,
            ", релиз: ",
            rel,
            ", частота: ",
            fr
          );
          delaySin(delay, att, rel, fr, vol, n);
          n++;
        }
        pomehi = [];
}




// stopMusic.addEventListener("click", function () {
//     bassGuitar.stop();
//     sineWave.stop();

// })

function createCheck(x) {
  for (let g = 0; g < x; g++) {
    check.insertAdjacentHTML(
      "beforeend",
      "<p id = check" +
        String(g) +
        "><strong>" +
        String(g + 1) +
        "</strong> ---  </p>"
    );
  }
}

function savePomehi() {
  localStorage.setItem("pomehi", JSON.stringify(pomehi));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// function addSin(){
//    setTimeout(() => {
//        setTimeout(theOneFunc, 100, 1)
//    } , 5000)
//     // setTimeout(theOneFunc, 8 * 1000, 2);

// }
