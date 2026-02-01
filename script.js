let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

// Select DOM elements
const display = document.querySelector('.timer-display');
const lapsList = document.getElementById('lapsList');

// Button Event Listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Update every 10ms
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    running = false;
    display.textContent = "00 : 00 : 000";
    lapsList.innerHTML = ""; // Clear laps
}

function recordLap() {
    if (running) {
        const li = document.createElement('li');
        li.textContent = `Lap: ${display.textContent}`;
        lapsList.appendChild(li);
        
        // Auto-scroll to the newest lap
        lapsList.scrollTop = lapsList.scrollHeight;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    // Calculate time units
    let milliseconds = Math.floor((elapsedTime % 1000));
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    // Format strings to add leading zeros (e.g., "05" instead of "5")
    milliseconds = milliseconds.toString().padStart(3, "0");
    seconds = seconds.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");

    display.textContent = `${minutes} : ${seconds} : ${milliseconds}`;
}