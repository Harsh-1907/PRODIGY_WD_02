let timer; 
let isRunning = false;
let time = 0;

function updateTime() {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('time').textContent = formattedTime;
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    updateTime();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  time = 0;
  updateTime();
  document.getElementById('laps').innerHTML = '';
}

function lapTimer() {
  const lapTime = time;
  const lap = document.createElement('li');
  lap.textContent = `Lap ${document.getElementById('laps').childElementCount + 1}: ${formatLapTime(lapTime)}`;
  document.getElementById('laps').appendChild(lap);
}

function formatLapTime(lapTime) {
  const hours = Math.floor(lapTime / 3600);
  const minutes = Math.floor((lapTime % 3600) / 60);
  const seconds = lapTime % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('startBtn').addEventListener('click', function() {
  if (!isRunning) {
    isRunning = true;
    startTimer();
    this.disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resetBtn').disabled = false;
    document.getElementById('lapBtn').disabled = false;
  }
});

document.getElementById('pauseBtn').addEventListener('click', function() {
  if (isRunning) {
    isRunning = false;
    pauseTimer();
    this.disabled = true;
    document.getElementById('startBtn').disabled = false;
  }
});

document.getElementById('resetBtn').addEventListener('click', function() {
  isRunning = false;
  resetTimer();
  this.disabled = true;
  document.getElementById('startBtn').disabled = false;
  document.getElementById('pauseBtn').disabled = true;
  document.getElementById('lapBtn').disabled = true;
});

document.getElementById('lapBtn').addEventListener('click', function() {
  if (isRunning) {
    lapTimer();
  }
});
