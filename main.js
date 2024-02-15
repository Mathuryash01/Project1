let alarmTime = null;
    let stopwatchInterval = null;
    let stopwatchSeconds = 0;
    let alarmInterval = null;

    function updateTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      document.getElementById('timeText').textContent = formattedTime;
      document.getElementById('timeText').style.setProperty('--remainingPercentage', ((60 - seconds) / 60).toFixed(2));
    }

    function startStopwatch() {
      resetStopwatch(); // Reset the stopwatch before starting
      stopwatchInterval = setInterval(updateStopwatch, 1000);
      document.getElementById('stopwatchText').style.display = 'block';
      document.getElementById('stopwatchText').style.setProperty('--remainingPercentage', '0');
      document.querySelector('.start-stop-button').style.display = 'none';
      document.querySelector('.stop-button').style.display = 'inline-block';
      document.querySelector('.reset-button').style.display = 'inline-block'; // Display the reset button
    }

    function stopStopwatch() {
      clearInterval(stopwatchInterval);
      document.querySelector('.start-stop-button').style.display = 'inline-block';
      document.querySelector('.stop-button').style.display = 'none';
    }

    function resetStopwatch() {
      clearInterval(stopwatchInterval);
      document.getElementById('stopwatchText').textContent = '00:00:00';
      stopwatchSeconds = 0;
      document.querySelector('.start-stop-button').style.display = 'inline-block';
      document.querySelector('.stop-button').style.display = 'none';
      document.querySelector('.reset-button').style.display = 'none';
    }

    function updateStopwatch() {
      stopwatchSeconds++;
      const hours = Math.floor(stopwatchSeconds / 3600);
      const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
      const seconds = stopwatchSeconds % 60;
      const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      document.getElementById('stopwatchText').textContent = formattedTime;
    }

    function setAlarm() {
      const hours = parseInt(prompt('Enter hours (0-23):'));
      const minutes = parseInt(prompt('Enter minutes (0-59):'));

      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        alarmTime = new Date();
        alarmTime.setHours(hours);
        alarmTime.setMinutes(minutes);
        alarmTime.setSeconds(0);
        clearInterval(alarmInterval);
        alarmInterval = setInterval(updateAlarm, 1000);
        document.getElementById('alarmText').style.display = 'block';
        document.getElementById('alarmText').style.setProperty('--remainingPercentage', '0');
        document.querySelector('.alarm-button').style.display = 'none';
        document.getElementById('stopAlarmButton').style.display = 'inline-block';
      } else {
        alert('Invalid input!');
      }
    }

    function stopAlarm() {
      clearInterval(alarmInterval);
      const audio = document.getElementById('alarmSound');
      audio.pause();
      audio.currentTime = 0;
      document.querySelector('.alarm-button').style.display = 'inline-block';
      document.getElementById('stopAlarmButton').style.display = 'none';
    }

    function updateAlarm() {
      if (alarmTime) {
        const now = new Date();
        const remainingTime = Math.max(0, Math.floor((alarmTime - now) / 1000)); // in seconds
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        document.getElementById('alarmText').textContent = formattedTime;
        document.getElementById('alarmText').style.setProperty('--remainingPercentage', (1 - remainingTime / (hours * 3600 + minutes * 60 + seconds)).toFixed(2));
        if (remainingTime <= 0) {
          ringAlarm();
          clearInterval(alarmInterval);
          document.querySelector('.alarm-button').style.display = 'inline-block';
          document.getElementById('stopAlarmButton').style.display = 'none';
        }
      }
    }

    function ringAlarm() {
      const audio = document.getElementById('alarmSound');
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 20000); // Alarm will ring for 20 seconds

      document.getElementById('stopAlarmButton').style.display = 'inline-block';
    }

    setInterval(updateTime, 1000); // Update every second
    updateTime(); // Call initially to prevent delay