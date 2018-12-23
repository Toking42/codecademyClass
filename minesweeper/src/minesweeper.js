/* Codecademy Project Minesweeper
* author: Thomas Mack
* verison: 0.3
*/
import {Board} from './board';
import {Game} from './game';

const game = new Game(7,7,15);

//game.printBoard();
game.playerClick(1,1);
//game.playerClick(1,1);

game.printBoard();

const b = new Board(7,7,15);
console.log(b.getvalidOffsets(1,1));
console.log(b.getvalidOffsets(0,0));


/*
const b = new Board(7,7,15);

console.log(b.playerBoard);
console.log(b.bombBoard);
b.printBoard();
b.playerClick(1,1);
b.printBoard();




b.playerClick(1,2);
b.playerClick(1,3);
b.playerClick(1,4);
b.playerClick(1,5);
b.playerClick(1,6);
b.playerClick(2,1);
b.playerClick(2,2);
b.playerClick(1,3);
b.printBoard();
*/
