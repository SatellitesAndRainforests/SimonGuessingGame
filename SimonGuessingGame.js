//variables...
var start = document.getElementById("start");
var screen = document.getElementById("screen");
var count = 0;
var memory = [];
var player = [];
var redsound = document.getElementById("redsound");
var bluesound = document.getElementById("bluesound");
var yellowsound = document.getElementById("yellowsound");
var greensound = document.getElementById("greensound");
var wrongesound = document.getElementById("wrongesound");
var allbuttons = [].slice.call(document.getElementsByClassName("button"));

//set volume
redsound.volume = 0.05;
bluesound.volume = 0.11;
greensound.volume = 0.05;
yellowsound.volume = 0.09;
wrongesound.volume = 0.002;

var onoff = "off";
//start button push...
start.addEventListener("click", function() {
  if (onoff == "off") {
    updatescreen();
    memoryadd();
    blink();
  }
  onoff = "on";
});

// button blink and sound for memory sequance...
function blink() {
  var target;
  var saved;
  var count = 0;
  var limit = memory.length;
  var sound;

  var inter = setInterval(function() {
    target = document.getElementById(memory[count]);
    sound = document.getElementById(memory[count] + "sound");
    saved = target.style["box-shadow"];
    target.style["box-shadow"] = "inset 0px 0px 100px white";
    sound.play();
    setTimeout(function() {
      target.style["box-shadow"] = saved;
    }, 500);
    count++;
    if (count == limit) {
      clearInterval(inter);
    }
  }, 1000);
}

//adding to  color to memory...
function memoryadd() {
  var random = Math.round(Math.random() * 100);
  var newadd = "";
  if (random <= 25) {
    newadd = "red";
  } else if (random <= 50) {
    newadd = "blue";
  } else if (random <= 75) {
    newadd = "yellow";
  } else if (random <= 100) {
    newadd = "green";
  }
  memory.push(newadd);
}

//screen counter...
function updatescreen() {
  count++;
  if (count < 10) {
    screen.innerText = "0" + count;
  } else {
    screen.innerText = count;
  }
}

//wronge sound for mistakes and reset evernything strick mode and not;
function wronge() {
  if (strictmode == "no") {
    wrongesound.play();
    num = 0;
    player = [];
    blink();
  } else {
    wrongesound.play();
    num = 0;
    screen.innerText = "--";
    count = 0;
    memory = [];
    player = [];
    onoff = "off";
    start.click();
  }
}

//player reapeating sequence...
var num = 0;
allbuttons.forEach(function(elem) {
  elem.addEventListener("click", function() {
    var btnnoise = document.getElementById(elem.id + "sound");
    player.push(elem.id);

    if (memory[num] == player[num]) {
      btnnoise.play();
      num++;
      if (num == memory.length) {
        console.log("level complete");

        if (num == 19) {
          return gamewon();
        }

        updatescreen();
        memoryadd();
        blink();
        num = 0;
        player = [];
      }
    } else {
      wronge();
    }
  });
});

//game won at 20 and restart;
function gamewon() {
  alert("gamewon ! 20 in a row ! start over ?");

  num = 0;
  player = [];
  screen.innerText = "00";
  count = 0;
  memory = [];
  player = [];
  onoff = "off";
  start.click();
}

// ugly strict mode button addedd for compliance i think it is better without it.
var light = document.getElementById("light");
var strictmode = "no";

document.getElementById("strictmode").addEventListener("click", function() {
  if (strictmode == "no") {
    light.style.visibility = "visible";
    strictmode = "yes";
  } else {
    light.style.visibility = "hidden";
    strictmode = "no";
  }
});

