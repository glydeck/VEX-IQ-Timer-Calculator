// VEX IQ Timer and Calculator Javascript
      let secRem = 4;
      let interval;
      let readyToStart = true;
      let inCountDown = true;
      let startSound = new Audio("./audio/Match-start-sound.mp3")
      let endSound = new Audio("./audio/Match-end-sound.mp3")
      let switchSound = new Audio("./audio/SwitchDrivers.mp3")
      let shortBeep = new Audio("./audio/Short-beep.mp3")
      let nearEnd = new Audio("./audio/tenSeconds.mp3")
	  let rapidLoad = new Audio("./audio/rapidLoad.mp3")
      let enableCountdown = true;

function calculateScores() {
	let score = 0;
	let scoreInvalid = false;
	let balls = document.getElementById("ballsScored").value;
	let switches = document.getElementById("switchesCleared").value;
	let passes = document.getElementById("passes").value;
	let matchType = document.getElementById("matchType").value;
  	balls = (balls=="") ? 0 : parseInt(balls);
  	switches = (switches=="") ? 0 : parseInt(switches);
  	passes = (passes=="") ? 0 : parseInt(passes);
	//switches = (switches=="") ? 0 : switches;
	if(switches == 0 && passes > 4 && matchType == 0)
	{
		passes = 4;
	}
	else if(passes > balls && matchType == 0 && switches != 0)
	{
		passes = balls;
		console.log(passes);
	}
	const switchKey = [1,4,8,10,12,12,12,12,12];
	let scoreKey = (matchType==0) ? [1,1,switchKey[switches]] : [switchKey[switches],1,0];
	let matchData = [balls,switches,passes];
	matchData = matchData.map(function (currentElement) {
		return currentElement == "" ? 0 : parseInt(currentElement);
	});
	for(let i=0;i<3;i++)
	{
		score += matchData[i] * scoreKey[i];
	}
	
	if(matchType == 0)
	{
		document.getElementById("passesLabel").style.display = "inline";
		document.getElementById("passes").style.display = "inline";
	} else {
		document.getElementById("passes").style.display = "none";
		document.getElementById("passesLabel").style.display = "none";
	}
	scoreInvalid = (Math.min.apply(Math, matchData) < 0 || matchData[1] > 4);
	if(scoreInvalid) {
		document.getElementById("finalScore").style.color = "red";
		document.getElementById("finalScore").innerHTML = "Illegal Score: "+score.toString();
	} else {
		document.getElementById("finalScore").style.color = "white";
		document.getElementById("finalScore").innerHTML = "Score: "+score.toString();
	}
}

function clearFields() {
	document.getElementById("ballsScored").value = "";
	document.getElementById("switchesCleared").value = "";
	document.getElementById("passes").value = "";
	document.getElementById("matchType").value = 0;
	calculateScores();
}

      function resetTimer() {
        clearInterval(interval);
        //secRem = 4;
        readyToStart = true;
        //inCountDown = true;
        document.getElementById("timerDisp").innerHTML = "60";
      }

      function stopTimer() {
        clearInterval(interval);
        endSound.play();
        if (secRem >= 0) {
          readyToStart = true;
        }
      }

      function startTimer() {
        if (readyToStart) {
          if (enableCountdown) {
            secRem = 4;
            inCountDown = true;
          } else {
            secRem = 1;
            inCountDown = true;
          }
          timerCount();
          interval = setInterval(timerCount, 1000);
          readyToStart = false;
        }
      }

      function timerCount() {
        secRem -= 1;
        if (secRem == 31) {
          switchSound.play();
        }
                if (secRem == 16) {
          rapidLoad.play();
        }
		if (secRem == 11) {
          nearEnd.play();
        }
        if (secRem <= 0) {
          if (inCountDown) {
            secRem = 60;
            inCountDown = false;
            startSound.play();
          } else {
            stopTimer();
          }
        }
        if (inCountDown) {
          shortBeep.play();
        }
        document.getElementById("timerDisp").innerHTML = secRem.toString();
      }

      function switchToTimer() {
        document.getElementById("scoreCalculator").style.display = "none";
        document.getElementById("vexiqTimer").style.display = "block";
      }

      function switchToCalc() {
        document.getElementById("scoreCalculator").style.display = "block";
        document.getElementById("vexiqTimer").style.display = "none";
      }

      function switchCountdown() {
        if (enableCountdown) {
          document.getElementById("countdownSwitch").innerHTML = "Enable Countdown";
        } else {
          document.getElementById("countdownSwitch").innerHTML = "Disable Countdown";
        }
        enableCountdown = !enableCountdown;
      }