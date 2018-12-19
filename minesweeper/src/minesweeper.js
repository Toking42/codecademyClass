/* Codecademy Project Minesweeper
* author: Thomas Mack
* verison: 0.1
*/

const blankLine = ' | | ';

console.log('This is what an empty board looks like.');
console.log(blankLine);
console.log(blankLine);
console.log(blankLine);


const guessLine = '1| | ';
const bombLine = ' |B| ';

console.log('This is what a board with a guess and a bomb on it would look like.');
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);


let board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
console.log(board);

const printBoard = (board) => {
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
printBoard(board);

board[0][1] = 1;
board[2][2] = 'B';

printBoard(board);
