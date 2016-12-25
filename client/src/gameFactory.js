angular.module('connectFour')
  .factory('Game', [function(){

    class Game {

      constructor() {
        this.gameboard = this.createNewGameBoard();
        this.initializeGame();
        this.turn = 'red';
        this.winner = 'none';
      }

      createNewGameBoard() {
        let gameboard = new Array(6);
        for(let i = 0; i < gameboard.length; i++) {
          gameboard[i] = new Array(7);
        }

        return gameboard;
      }

      initializeGame() {
        for(let k = 0; k < this.gameboard.length; k++) {
          for(let l = 0; l < this.gameboard[0].length; l++) {
            this.gameboard[k][l] = 'none';
          }
        }

        this.turn = 'red';
        this.winner = 'none';
      }

      turnOver() {
        this.turn = (this.turn === 'red') ? 'black' : 'red';
      }

      checkForWinner(callback) {
        for(let rowOrigin = 0; rowOrigin <= 2; rowOrigin++) {
          for(let columnOrigin = 0; columnOrigin <= 3; columnOrigin++) {
            this.check4x4(rowOrigin, columnOrigin);
          }
        }

        callback(this.winner);
      }

      check4x4(rowOrigin,columnOrigin) {
        let numRed;
        let numBlack;
        let column;
        let row;

        //Check rows
        for (row = rowOrigin; row <= rowOrigin + 3; row++) {
          numRed = 0;
          numBlack = 0;
          for (column = columnOrigin; column <= columnOrigin + 3; column++) {
            if (this.gameboard[row][column] === 'black') {
              numBlack++;
            } else if (this.gameboard[row][column] === 'red') {
              numRed++;
            }
          }
          if (numRed === 4) {
            this.winner = 'red';
          } else if (numBlack === 4) {
            this.winner = 'black';
          }
        }

        //Check columns
        for (column = columnOrigin; column <= columnOrigin + 3; column++) {
          numRed = 0;
          numBlack = 0;
          for (row = rowOrigin; row <= rowOrigin + 3; row++) {
            if (this.gameboard[row][column] === 'black') {
              numBlack++;
            } else if (this.gameboard[row][column] === 'red') {
              numRed++;
            }
          }
          if (numRed === 4) {
            this.winner = 'red';
          } else if (numBlack === 4) {
            this.winner = 'black';
          }
        }

        //Check diagnol
        numRed = 0;
        numBlack = 0;
        column = columnOrigin;
        for (row = rowOrigin; row <= rowOrigin + 3; row++) {
          if (this.gameboard[row][column] === 'black') {
            numBlack++;
          } else if (this.gameboard[row][column] === 'red') {
            numRed++;
          }
          column++;
        }
        if (numRed === 4) {
          this.winner = 'red';
        } else if (numBlack === 4) {
          this.winner = 'black';
        }

        //Check anti-diagnoal
        numRed = 0;
        numBlack = 0;
        column = columnOrigin;
        for (row = rowOrigin + 3; row >= rowOrigin; row--) {
          if (this.gameboard[row][column] === 'black') {
            numBlack++;
          } else if (this.gameboard[row][column] === 'red') {
            numRed++;
          }
          column++;
        }
        if (numRed === 4) {
          this.winner = 'red';
        } else if (numBlack === 4) {
          this.winner = 'black';
        }
      }

      checkForTie(callback) {
        let tie = true;

        for(let m = 0; m < this.gameboard.length; m++) {
          for(let n = 0; n < this.gameboard[0].length; n++) {
            if(this.gameboard[m][n] === 'none') {
              tie = false;
              break;
            }
          }
        }

        callback(tie);
      }
    }

    return Game;
  }]);
