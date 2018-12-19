// All code should be written in this file.

let playerOneMoveOneType = undefined;
let playerOneMoveTwoType = undefined;
let playerOneMoveThreeType = undefined;

let playerTwoMoveOneType = undefined;
let playerTwoMoveTwoType = undefined;
let playerTwoMoveThreeType = undefined;

let playerOneMoveOneValue = undefined;
let playerOneMoveTwoValue = undefined;
let playerOneMoveThreeValue = undefined;

let playerTwoMoveOneValue = undefined;
let playerTwoMoveTwoValue = undefined;
let playerTwoMoveThreeValue = undefined;


// Test if all Types are set and part of the definition 'rock' 'paper' 'scissors'
const validMoveTypes = (moveTypeOne, moveTypeTwo, moveTypeThree) => {
  var result = true;
  //if one Type is missing everything has to be false
  result = result && validMoveType(moveTypeOne);
  result = result && validMoveType(moveTypeTwo);
  result = result && validMoveType(moveTypeThree);

  //default
  return result;
}

// Test if a given Type is part of the definition Case insensitve
const validMoveType = (moveType) => {
  if (moveType == undefined) return false;
  if(moveType.toLowerCase() === 'rock') return true;
  if(moveType.toLowerCase() === 'paper') return true;
  if(moveType.toLowerCase() === 'scissors') return true;

  //default
  return false;
}

// Test if Values are set, at least 1 and the sum of them not greater than 99
const validMoveValues = (moveValueOne, moveValueTwo, moveValueThree) => {
  if((moveValueOne+moveValueTwo+moveValueThree) >99) return false;
  if(moveValueOne == undefined || moveValueOne<1) return false;
  if(moveValueTwo == undefined || moveValueTwo<1) return false;
  if(moveValueThree == undefined || moveValueThree<1) return false;

  //default
  return true;
}

// Takes the Moves and sets the variables if every Value is set and valid
const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType,
  moveTwoValue, moveThreeType, moveThreeValue) => {
  // Test input

  if(!validMoveValues(moveOneValue, moveTwoValue, moveThreeValue)
  ||!validMoveTypes(moveOneType, moveTwoType, moveThreeType)
  ||!validMoveTypes(moveOneType, moveTwoType, moveThreeType)
  ||!validMoveValues(moveOneValue, moveTwoValue, moveThreeValue)) {
    return false;
  }

  if(player ==='Player One') {
    if(validMoveTypes(moveOneType, moveTwoType, moveThreeType)) {
      playerOneMoveOneType = moveOneType;
      playerOneMoveTwoType = moveTwoType;
      playerOneMoveThreeType = moveThreeType;
    }
    if(validMoveValues(moveOneValue, moveTwoValue, moveThreeValue)) {
      playerOneMoveOneValue = moveOneValue;
      playerOneMoveTwoValue = moveTwoValue;
      playerOneMoveThreeValue = moveThreeValue;
    }
  } else if(player ==='Player Two') {
    if(validMoveTypes(moveOneType, moveTwoType, moveThreeType)) {
      playerTwoMoveOneType = moveOneType;
      playerTwoMoveTwoType = moveTwoType;
      playerTwoMoveThreeType = moveThreeType;
    }
    if(validMoveValues(moveOneValue, moveTwoValue, moveThreeValue)) {
      playerTwoMoveOneValue = moveOneValue;
      playerTwoMoveTwoValue = moveTwoValue;
      playerTwoMoveThreeValue = moveThreeValue;
    }
  }
  //dumpVars();
}

// A Winner is determined by the following rule:
// Base Rule of RockPaperSiccors evaluate for a winner -> we have a Winner
// Base Rule of RockPaperSiccors evaluates for a tie -> the greater Value is the Winner
const getWinner = (moveOne, valueOne, moveTwo, valueTwo) =>{
  // Test if every needed Value is set
  if(moveOne == undefined || moveTwo == undefined || valueOne == undefined || valueTwo == undefined) {
    return null;
  }

  if(moveOne.toLowerCase() === moveTwo.toLowerCase()) {
    if(valueOne == valueTwo) return 'Tie';
    else if( valueOne > valueTwo) return 'Player One';
    return 'Player Two';
  } else {
    if(moveOne.toLowerCase() === 'rock') {
      if(moveTwo.toLowerCase() === 'paper') return 'Player Two';
      else return 'Player One';
    } else if(moveOne.toLowerCase() === 'paper') {
      if(moveTwo.toLowerCase() === 'scissors') return 'Player Two';
      else return 'Player One';
    } else if(moveOne.toLowerCase() === 'scissors') {
      if(moveTwo.toLowerCase() === 'rock') return 'Player Two';
      else return 'Player One';
    }
  }

}

// Takes the integer of a round and Evaluates the Winner for this round
const getRoundWinner = (round) => {
  switch(round) {
    case 1:
      return getWinner(playerOneMoveOneType, playerOneMoveOneValue,
                playerTwoMoveOneType, playerTwoMoveOneValue);
    break;
    case 2:
      return getWinner(playerOneMoveTwoType, playerOneMoveTwoValue,
                playerTwoMoveTwoType, playerTwoMoveTwoValue);
    break;
    case 3:
      return getWinner(playerOneMoveThreeType, playerOneMoveThreeValue,
                playerTwoMoveThreeType, playerTwoMoveThreeValue);
    break
    default: return null;
  }
}

// Plays three rounds and evaluates which Player has more wins.
// Three ties and the whole Match is a 'Tie'
const getGameWinner = () => {
  let winner = new Array();
  winner['Tie'] = 0;
  winner['Player One'] = 0;
  winner['Player Two'] = 0;

  for (i = 1; i<= 3; i++) {
    // Add 1 to the winner of the Round
    winner[getRoundWinner(i)]++;
  }
  // If any round did not evaluate Proberly we don't have 3 Points
  // In this case we return null
  if((winner['Tie']+winner['Player One']+winner['Player Two']) != 3) return null;

  if(winner['Player One'] > winner['Player Two']) return 'Player One';
  if(winner['Player One'] < winner['Player Two']) return 'Player Two';

  // Neither Player One nor Player Two made it
  return 'Tie';

}

const getRandomMoveType = () => {
  const types = ['rock','paper','scissors'];
  return types[Math.floor(Math.random()*3)];
}

const getRandomMoveValue = (stage,pointsLeft) => {
  if(stage == 3) return pointsLeft;
  else return 1 + Math.floor(Math.random()*pointsLeft-(3-stage));
}

const setComputerMoves = () => {
  playerTwoMoveOneType = getRandomMoveType();
  playerTwoMoveTwoType = getRandomMoveType();
  playerTwoMoveThreeType = getRandomMoveType();
  playerTwoMoveOneValue = getRandomMoveValue(1, 99);
  playerTwoMoveTwoValue = getRandomMoveValue(2, 99-playerTwoMoveOneValue);
  playerTwoMoveThreeValue = getRandomMoveValue(3, 99-playerTwoMoveTwoValue-playerTwoMoveOneValue);
}

// Helper for Debugging
const dumpVars = () => {
  console.log(playerOneMoveOneType);
  console.log( playerOneMoveTwoType);
  console.log( playerOneMoveThreeType);

  console.log( playerTwoMoveOneType);
  console.log( playerTwoMoveTwoType);
  console.log( playerTwoMoveThreeType);

  console.log( playerOneMoveOneValue);
  console.log( playerOneMoveTwoValue);
  console.log( playerOneMoveThreeValue);

  console.log( playerTwoMoveOneValue);
  console.log( playerTwoMoveTwoValue);
  console.log( playerTwoMoveThreeValue);
}
