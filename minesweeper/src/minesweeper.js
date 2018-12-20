/* Codecademy Project Minesweeper
* author: Thomas Mack
* verison: 0.1
*/

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for(let i = 0;i<numberOfRows;i++) {
    let row = [];
    for(let c = 0;c<numberOfColumns;c++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for(let i = 0;i<numberOfRows;i++) {
    let row = [];
    for(let c = 0;c<numberOfColumns;c++) {
      row.push(null);
    }
    board.push(row);
  }
  let numberOfPlacedBombs = 0;
  while(numberOfPlacedBombs<numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random()*numberOfRows);
    let randomColIndex = Math.floor(Math.random()*numberOfColumns);
    if(board[randomRowIndex][randomColIndex] != 'B') {
      board[randomRowIndex][randomColIndex] = 'B';
      numberOfPlacedBombs++;
    }
  }

  return board;
}

const blankLine = ' | | ';

//console.log('This is what an empty board looks like.');
//console.log(blankLine);
//console.log(blankLine);
//console.log(blankLine);


const guessLine = '1| | ';
const bombLine = ' |B| ';

//console.log('This is what a board with a guess and a bomb on it would look like.');
//console.log(guessLine);
//console.log(bombLine);
//console.log(blankLine);


let board = generatePlayerBoard(7,7);
let bombBoard = generateBombBoard(7,7,15);
const printBoard = (board, boardName) => {
console.log(boardName+' Board:');
let printB =   board.map(row => {
    return row.join(" | ");
  }).join('\n');
console.log(printB);
}

const printBoardv1 = (board) => {
console.log('Current Board:');

  for (i = 0;i<board.length;i++) {
    var row = board[i].join(' | ');
    //for (j=0;j<board[i].length; j++) {

      //row = row +board[i][j];
      //if(j<board[i].length -1) row = row+'|';
    //}
    console.log(row);
  }
}
const isBomb = (x,y) => {
  if(bombBoard[x][y]==undefined) return false;
  if(bombBoard[x][y]=='B') return true;
  else return false;
}

const getBombsAround = (x,y) => {
  let bombs = 0;
  if(isBomb(x-1,y)) bombs++;
  if(isBomb(x+1,y)) bombs++;
  if(isBomb(x-1,y-1)) bombs++;
  if(isBomb(x,y-1)) bombs++;
  if(isBomb(x+1,y-1)) bombs++;
  if(isBomb(x-1,y+1)) bombs++;
  if(isBomb(x,y+1)) bombs++;
  if(isBomb(x+1,y+1)) bombs++;
  if(bombs ==0) return '-';
  return bombs;
}
const setField = (x,y,value) => {
  board[x][y] = value;
}

const playerClick = (x,y) => {
  if(isBomb(x,y)) {
    console.log('Boooooom');
//    revealBoard();
    setField(x,y,'X')

  } else {
    setField(x,y,getBombsAround(x,y))
  }
  printBoard(board, 'Player');
}

const revealBoard = () => {
  for (i = 0;i<board.length;i++) {
    for (j = 0;j<board[i].length;j++) {
      playerClick(i,j);
    }
  }
}

printBoard(board, 'Player');
printBoard(bombBoard, 'Bomb');

playerClick(1,1);
playerClick(1,2);
playerClick(1,3);
playerClick(1,4);
playerClick(1,5);
playerClick(1,6);
playerClick(2,1);
playerClick(2,2);
playerClick(1,3);
