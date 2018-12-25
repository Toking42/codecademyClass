let raceNumber = Math.floor(Math.random() * 1000);
let earlyRegister = false;
let runnerAge = 19;
let startTime = ['9:30','11:00','12:30'];

if(runnerAge >18 && earlyRegister) raceNumber += 1000;

if(runnerAge >18 && earlyRegister) console.log('Race will start at:'+startTime[0]+' Start-Nr: '+raceNumber);
else if(runnerAge >18) console.log('Race will start at:'+startTime[1]+' Start-Nr: '+raceNumber);
else if(runnerAge <=18) console.log('Race will start at:'+startTime[2]+' Start-Nr: '+raceNumber);
