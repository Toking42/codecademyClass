// Codecademy RockPaperSiccors Projekt

const options = ['rock', 'paper', 'scissors'];


const getUserChoice = userInput => {
  userInput = userInput.toLowerCase();

  if(userInput === 'rock' || userInput ==='paper' || userInput ==='scissors') {
    return userInput;
  } else  {
    console.log('Not a valid Choice. Allowed Options ( Rock, Paper, Scissors)');
  }

}



const getComputerChoice = () => {
  var choice = Math.floor(Math.random() * options.length);
  return options[choice];
}

const determineWinner = (userChoice, computerChoice) => {
  if(userChoice === computerChoice) return 'The game was a tie';
  if(userChoice === 'paper' && computerChoice === 'Rock') return 'Player wins';
  if(userChoice === 'rock' && computerChoice === 'scissors') return 'Player wins';
  if(userChoice === 'scissors' && computerChoice === 'paper') return 'Player wins';
  return 'The Computer wins';
 }


for (i=0; i<10;i++) {
  var userChoice = getComputerChoice();
  console.log('User chose: '+userChoice);

  console.log(determineWinner(userChoice,getComputerChoice()));
};
