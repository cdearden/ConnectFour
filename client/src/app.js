
const app = angular.module('connectFour',[]);

// app.service('gameService', [function(){
//
// }]);

app.controller('connectFourController', ['$scope', function($scope) {
  var winner;
  var turn;
  $scope.connectfour = new Game();

  function Game() {
    this.gameboard = new Array(6);
    for(var i = 0; i < this.gameboard.length; i++) {
      this.gameboard[i] = new Array(7);
    }

    $scope.gameboard = this.gameboard;


    this.initialize = function() {
      var images = $('.gameboard img');

      $.each(images, function(index, image) {
        $(image).attr('src','../client/images/transparent.png');
      });

      // Initialize the background array
      for(var k = 0; k < this.gameboard.length; k++) {
        for(var l = 0; l < this.gameboard[0].length; l++) {
          this.gameboard[k][l] = 'none';
        }
      }

      turn = 'red';
      winner = 'none';
    };
    this.initialize();
  }

  $scope.turnOver = function() {
    turn = (turn === 'red') ? 'black' : 'red';
  };

  $scope.checkForWinner = function() {
    for(var rowOrigin = 0; rowOrigin <= 2; rowOrigin++) {
      for(var columnOrigin = 0; columnOrigin <= 3; columnOrigin++) {
        this.check4x4(rowOrigin, columnOrigin);
      }
    }

    if(winner !== 'none') {
      var message = (winner === 'red') ? 'Red Wins!' : 'Black Wins!';
      showBanner(message);
    }
  };

  $scope.check4x4 = function(rowOrigin,columnOrigin) {
    var numRed;
    var numBlack;
    var column;
    var row;

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
        winner = 'red';
      } else if (numBlack === 4) {
        winner = 'black';
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
        winner = 'red';
      } else if (numBlack === 4) {
        winner = 'black';
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
      winner = 'red';
    } else if (numBlack === 4) {
      winner = 'black';
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
      winner = 'red';
    } else if (numBlack === 4) {
      winner = 'black';
    }
  };


  $scope.checkForTie = function() {
    var tie = true;

    for(var m = 0; m < this.gameboard.length; m++) {
      for(var n = 0; n < this.gameboard[0].length; n++) {
        if(this.gameboard[m][n] === 'none') {
          tie = false;
          break;
        }
      }
    }

    if(tie) {
      showBanner('Tie!');
    }
  };

  $scope.image_onClick = function (game, e) {
    if(winner !== 'none') {
      return;
    }
    let origin = e.currentTarget;

    var image = document.getElementById(origin.id);
    var colNum = getColumnNum(image);

    // for each row element within the column that was clicked,
    // starting from the bottom, find the first image that is transparent
    // and assign the appropriate player piece to that element
    for(var o = $scope.gameboard.length - 1; o >= 0; o--) {
      if($scope.gameboard[o][colNum] === 'none') {
        $scope.gameboard[o][colNum] = (turn === 'red') ? 'red' : 'black';
        setImage($('#' + origin.id.replace(origin.id[1],o)));
        $scope.checkForWinner();
        $scope.checkForTie();
        $scope.turnOver();
        break;
      }
    }
  }

  function getColumnNum(element) {
    var lastIndex = element.id.length - 1;
    return Number(element.id.split('')[lastIndex]);
  }

  function setImage(image) {
    var file = (turn === 'red') ? '../client/images/red.png' : '../client/images/black.gif';
    image.attr('src',file);
  }

  $scope.hideBanner = function() {
    $('.banner').hide();
  }

  function showBanner(message) {
    var banner = $('.banner p');

    banner.text(message);

    if(message.match(/red*/i)) {
      banner.css('color', 'red');
    } else if(message.match(/black*/i)) {
      banner.css('color', 'black');
    } else if(message.match(/tie*/i)) {
      banner.css('color','white');
    }

    $('.banner').show();
  }

}]);