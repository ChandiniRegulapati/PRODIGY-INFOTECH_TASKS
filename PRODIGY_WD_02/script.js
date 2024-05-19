let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = Date.now() - difference;
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    lapCounter = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
}

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    let time = new Date(updatedTime);
    let minutes = time.getUTCMinutes().toString().padStart(2, '0');
    let seconds = time.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    display.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (running) {
        lapCounter++;
        let lapTime = document.createElement('div');
        lapTime.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
        laps.appendChild(lapTime);
    }
}
