var bassGuitar;
var sineWave;
var x;
var pomehi = [];
var isPomeha = -1
var keyDown = false

startMusic = document.querySelector("#start");
restartMusic = document.querySelector("#restart");
stopMusic = document.querySelector("#stop");
check = document.querySelector("#check_");

restartMusic.disabled = true

buttons = document.querySelector("#inputN");
button1 = document.querySelector("#n1");
button2 = document.querySelector("#n2");
button3 = document.querySelector("#n3");
button4 = document.querySelector("#n4");
button5 = document.querySelector("#n5");
button6 = document.querySelector("#n6");
button7 = document.querySelector("#n7");
button8 = document.querySelector("#n8");
button9 = document.querySelector("#n9");
button10 = document.querySelector("#n10");
button11 = document.querySelector("#n11");
// const theOneFunc = delay => {
//     console.log('Hello after ' + delay + ' seconds');
//     sineWave.stop()
//   };
function createCheck(x){
  for (let g = 0; g < x; g++){
    check.insertAdjacentHTML('beforeend', "<p id = check"+String(g)+"><strong>" + String(g+1) + "</strong> ---  </p>");
  
  }  
  


}

startMusic.addEventListener("click", function () {
    document.querySelector("#mis").textContent = 0

    
    disableButtons()
    restartMusic.disabled = true
    startMusic.disabled = true

  bassGuitar = new Pizzicato.Sound({ 
    source: 'file',
    options: { path: [static_url + 'attenter/sounds/04_Bass.mp3', static_url + 'attenter/sounds/04_Bass.wav' , static_url + 'attenter/sounds/04_Bass.opus' ]}
}, function () {
   

    // Sound loaded!
    bassGuitar.on("stop", () => {
        enableButtons()
        restartMusic.disabled = false
        startMusic.disabled = false
    })

    bassGuitar.on("play", () => {
      setTimeout(() => {
        bassGuitar.stop();
        inputN();
      }, 61 * 1000);
      x = getRandomIntInclusive(3, 10);
      createCheck(x)

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
        att = getRandomIntInclusive(1, 100) / 100;
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
        delaySin(delay, att, rel, fr, vol, n);
        n++;
      }
      console.log(arr);
      savePomehi();
      pomehi = [];
    });

    bassGuitar.play();
  });

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
});

function delaySin(delay, att, rel, fr, vol, n) {
  setTimeout(() => {
    sineWave.attack = att;
    sineWave.release = rel;
    sineWave.frequency = fr;
    sineWave.volume = vol;

    sineWave.play();
        checkPomeha(n)
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
  }, delay * 1000);
}

function checkPomeha(n) {
    isPomeha = n
    setTimeout(() => {
        if (!keyDown) {
            document.querySelector("#check"+String(isPomeha)).textContent += 'BAD__'
        } 
        keyDown = false 

        isPomeha = -1 
    }, 980)
    
}

document.addEventListener('keydown', function(e) {
     if (e.keyCode == 32 && isPomeha > -1) {
        document.querySelector("#check"+String(isPomeha)).textContent += 'GOOD_'
        keyDown = true
     } if (e.keyCode == 32 && isPomeha == -1) {
         document.querySelector("#mis").textContent = parseInt(document.querySelector("#mis").textContent)+1
     }
        

})

restartMusic.addEventListener("click", function () {
    disableButtons()
    restartMusic.disabled = true
    startMusic.disabled = true
  pomehi = JSON.parse(localStorage.getItem("pomehi"));

  bassGuitar = new Pizzicato.Sound(static_url + 'attenter/sounds/04_Bass.mp3', function () {
    // Sound loaded!

    bassGuitar.on("stop", () => {
        enableButtons()
        restartMusic.disabled = false
        startMusic.disabled = false

    })


    bassGuitar.on("play", () => {
      setTimeout(() => {
        bassGuitar.stop();
        inputN();
      }, 61 * 1000);
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
    });

    bassGuitar.play();
  });

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
});
// stopMusic.addEventListener("click", function () {
//     bassGuitar.stop();
//     sineWave.stop();

// })
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

function inputN() {}

button1.addEventListener("click", function () {
  if (x === 1) {
    button1.style.background= 'green';
  } else {
    button1.style.background= 'red';
  }
});
button2.addEventListener("click", function () {
  if (x === 2) {
    button2.style.background= 'green';
  } else {
    button2.style.background= 'red';
  }
});
button3.addEventListener("click", function () {
  if (x === 3) {
    button3.style.background= 'green';
  } else {
    button3.style.background= 'red';
  }
});
button4.addEventListener("click", function () {
  if (x === 4) {
    button4.style.background= 'green';
  } else {
    button4.style.background= 'red';
  }
});
button5.addEventListener("click", function () {
  if (x === 5) {
    button5.style.background= 'green';
  } else {
    button5.style.background= 'red';
  }
});
button6.addEventListener("click", function () {
  if (x === 6) {
    button6.style.background= 'green';
  } else {
    button6.style.background= 'red';
  }
});
button7.addEventListener("click", function () {
  if (x === 7) {
    button7.style.background= 'green';
  } else {
    button7.style.background= 'red';
  }
});
button8.addEventListener("click", function () {
  if (x === 8) {
    button8.style.background= 'green';
  } else {
    button8.style.background= 'red';
  }
});
button9.addEventListener("click", function () {
  if (x === 9) {
    button9.style.background= 'green';
  } else {
    button9.style.background= 'red';
  }
});
button10.addEventListener("click", function () {
  if (x === 10) {
    button10.style.background= 'green';
  } else {
    button10.style.background= 'red';
  }
});
button11.addEventListener("click", function () {
  if (x === 11) {
    button11.style.background= 'green';
  } else {
    button11.style.background= 'red';
  }
});
function disableButtons() {
    for (let h = 1; h < 12; h++) {
        document.getElementById("n" + String(h)).disabled = true;
      }
}
function enableButtons() {
    for (let h = 1; h < 12; h++) {
        document.getElementById("n" + String(h)).disabled = false;
      }
}