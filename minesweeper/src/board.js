export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = this._numberOfRows*this._numberOfTiles;

    this._playerBoard = this.generatePlayerBoard();
    this._bombBoard = this.generateBombBoard();

    // Define the filds that have Contact to one Field
    //     x | x | x
    //     x | C | x
    //     x | x | x

    this._offsets = [
      [-1,-1],[0,-1],[1,-1],
      [-1,0],[1,0],
      [-1,1],[0,1],[1,1]
    ];
    this.PLAYERCLICK = 1;
    this.REVEAL = 2;

  }


  get playerBoard () {
     return this._playerBoard;
  }

  get bombBoard () {
     return this._bombBoard;
  }

  getvalidOffsets (x,y) {
    let offsets = [];
    this._offsets.forEach(off => {
      if((x+off[0]>=0 && x+off[0]<this._numberOfColumns)
        && (y+off[1]>=0 && x+off[1]<this._numberOfRows)) {
          offsets.push([x+off[0],y+off[1]]);
        }
    })
    return offsets;
  }

  flipTile (x,y,type) {
    let result = '';
    if(this.isBomb(x,y)) {
      console.log(type+"---"+this.PLAYERCLICK);

      if(type = this.PLAYERCLICK) {
        console.log('Boooooom');
        this.setField(x,y,'X')
        return 'B';
      } else if(type = this.REVEAL) {
          this.setField(x,y,'B')
              return 'B';
      }
      return '';
    } else {
      this.setField(x,y,this.getBombsAround(x,y))
      this._numberOfTiles--;
    }
    return result;
  }

  hasSafeTiles () {
    this._numberOfTiles > this._numberOfBombs;
  }

  generatePlayerBoard ()  {
    console.log('cols: '+this._numberOfColumns);
    let board = [];
    for(let i = 0;i<this._numberOfRows;i++) {
      let row = [];
      for(let c = 0;c<this._numberOfColumns;c++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  generateBombBoard () {
    let board = [];
    for(let i = 0;i<this._numberOfRows;i++) {
      let row = [];
      for(let c = 0;c<this._numberOfColumns;c++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfPlacedBombs = 0;
    while(numberOfPlacedBombs<this._numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*this._numberOfRows);
      let randomColIndex = Math.floor(Math.random()*this._numberOfColumns);
      if(board[randomRowIndex][randomColIndex] != 'B') {
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfPlacedBombs++;
      }
    }

    return board;
  }

  printBoard  ()  {
    console.log('=====================');


    let printB =   this._playerBoard.map(row => {
      return row.join(" | ");
    }).join('\n');
    console.log(printB);
    console.log('=====================');

  }

  isBomb  (x,y) {
    if(this._bombBoard[x][y]==undefined) return false;
    if(this._bombBoard[x][y]=='B') return true;
    else return false;
  }

  isRevealed (x,y) {
    return this._playerBoard[x][y]==' ';
  }

  getBombsAround (x,y) {
    let bombs = 0;
    this.getvalidOffsets(x,y).forEach( off => {
      if(this.isBomb(off[0], off[1])) bombs++;
    })
    if(bombs ==0) return '-';
    return bombs;
  }
  setField (x,y,value) {
    this._playerBoard[x][y] = value;
  }

}
