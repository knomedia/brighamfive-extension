const CN = "BrighamFive"
const SPEED = CN + '__speed';
const TIME = CN + '__time';

let intervalId;

// *****************
// Utils
function getEl(cn) {
  return document.querySelector(cn)
}

function hide(cn) {
  let el = getEl(cn)
  el.hidden = true
}


// *****************
// UI
function createUIEl() {
  var el = document.createElement('div');
  var domString = `<div class="${CN}">
    <div class="${TIME}__Outer">
      Time
      <div class="${TIME}"></div>
    </div>
    <div class="${TIME}__Outer">
      Speed
      <div class="${SPEED}"></div>
    </div>
    </div>`
  el.innerHTML =  domString;
  document.body.appendChild(el.firstChild);
  return getUI()
}

function getUI() {
  return document.querySelector('.' + CN)
}

function fmtMSS(s){
  return(s-(s%=60))/60+(9<s?':':':0')+s
}

function showTime() {
  let time = fmtMSS(Math.floor(video.currentTime))
  let el = document.querySelector('.' + TIME)
  el.innerHTML = time
}

function showSpeed(speed) {
  let el = document.querySelector('.' + SPEED)
  el.innerHTML = speed
}

function updateUI() {
  window.setTimeout(function() {
    showTime()
    updateUI()
  }, 1000)
}

function showUI() {
  let el = getUI()
  el.classList.add(CN + "__show")
  if (intervalId) {
    window.clearInterval(intervalId)
  }
  intervalId = window.setTimeout(function() {
    hideUI()
  }, 2000)
}

function hideUI() {
  let el = getUI()
  el.classList.remove(CN + "__show")
}


// *****************
// VID CONTROL
function fullVid(cn) {
  let vid = getEl(cn)
  vid.style.maxWidth = "6000px";
  return vid
}

function fullVid(cn) {
  let vidWrapper = getEl(cn)
  vidWrapper.style.maxWidth = "6000px";
}

function seek(seconds) {
  video.currentTime = video.currentTime + seconds
  return video.currentTime
}

function handleSpeed(key) {
  const MAP = {
    "ArrowUp": 0.1,
    "ArrowDown": -0.1
  }
  const SPEEDS = {
    "0": 1,
    "Backspace": 1,
    "-": 0.1,
    "=": 2,
  }
  let delta = MAP[key]
  let speed = SPEEDS[key]
  if (speed) {
    video.playbackRate = speed
    showSpeed(video.playbackRate)
  }
  if (delta) {
    let rate = Math.round((video.playbackRate + delta) * 10) / 10
    rate = Math.max(rate, 0.1)
    video.playbackRate = rate
    showSpeed(video.playbackRate)
  }
  if (speed || delta) {
    let r = video.playbackRate
    showSpeed(r)
    showUI()
    const MAX = 2.3;
    const MIN = 0.4
    const LIMITED_VOLUME = 0.05
    const FULL_VOLUME = 1
    if (r > MAX || r < MIN) {
      video.volume = LIMITED_VOLUME
    } else {
      video.volume = FULL_VOLUME
    }
  }
}
function handleSeek(key) {
  const MAP = {
    'f': 5,
    'F': 30,
    'ArrowRight': 0.5,
    'b': -5,
    'B': -30,
    'ArrowLeft': -0.5,
  }
  let seconds = MAP[key]
  if (seconds) {
    let res = seek(seconds)
    showUI()
  }
}

function handlePlayBack(key) {
  if (key === ' ') {
    let func = video.paused ? 'play' : 'pause'
    video[func]()
  }
}
function onKeyDown(event) {
  handleSeek(event.key)
  handleSpeed(event.key)
  handlePlayBack(event.key)
}

// RUN IT

let toHide = [
  ".list-container",
  ".header",
  ".extra-space-div",
  ".info",
  ".footer"
]

let video = getEl('video')
window.addEventListener('keydown', onKeyDown)

const VID_WRAPPER = ".player-wrapper-outer"
toHide.forEach(hide)
fullVid(VID_WRAPPER)

let el = createUIEl()
updateUI()
showSpeed(video.playbackRate)
