function getEl(cn) {
  return document.querySelector(cn)
}

function hide(cn) {
  let el = getEl(cn)
  el.hidden = true
}

function fullVid(cn) {
  let vid = getEl(cn)
  vid.style.maxWidth = "6000px";
  return vid
}

let toHide = [
  ".list-container",
  ".header",
  ".extra-space-div",
  ".info",
  ".footer"
]

function fullVid(cn) {
  let vidWrapper = getEl(cn)
  vidWrapper.style.maxWidth = "6000px";
}

function seek(seconds) {
  video.currentTime = video.currentTime + seconds
  return video.currentTime
}


function handleSpeed(key) {
  console.log(key);
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
  }
  if (delta) {
    let rate = Math.round((video.playbackRate + delta) * 10) / 10
    rate = Math.max(rate, 0.1)
    video.playbackRate = rate
  }
  if (speed || delta) {
    let r = video.playbackRate
    console.log(r);
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
    console.log(res)
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

let video = getEl('video')
window.addEventListener('keydown', onKeyDown)

const VID_WRAPPER = ".player-wrapper-outer"
toHide.forEach(hide)
fullVid(VID_WRAPPER)
