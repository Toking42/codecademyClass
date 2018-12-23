// game
export class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._board = new Board(this._numberOfRows,
      this._numberOfColumns,
      this._numberOfBombs);
  }
  playerClick (x,y)  {
    // Test if already clicked the same location
    if(this._board.isRevealed(x,y)) {
      if(this._board.flipTile(x,y,this._board.PLAYERCLICK)!='B') {
      // Umgebung absuchen
        this._board.getvalidOffsets(x,y).forEach( off => {
        //  console.log("untersuche"+off[0]+","+off[1])
          this._board.flipTile(off[0],off[1],0);
        })
      } else {
        for (let i = 0; i< this._numberOfColumns;i++) {
          for (let j = 0; j< this._numberOfRows;j++) {
            console.log("untersuche"+i+","+j)

            this._board.flipTile(i,j,this._board.REVEAL);
          }
        }

      }
    }
    else console.log('Auf dieses Feld wurde schon mal geklickt');


    this._board.printBoard();
  }
  printBoard() {
    this._board.printBoard();
  }

}
