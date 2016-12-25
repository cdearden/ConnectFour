angular.module('connectFour')
  .controller('connectFourController', ['$scope', 'Game', function($scope, Game) {

    let connectfour = new Game();
    $scope.gameboard = connectfour.gameboard;

    $scope.initializeView = function() {
      let images = $('.gameboard img');

      $.each(images, function(index, image) {
        $(image).attr('src','images/transparent.png');
      });

      connectfour.initializeGame();
    };
    $scope.initializeView();

    function showBanner(message) {
      let banner = $('.banner p');

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

    $scope.image_onClick = function (event) {
      if (connectfour.winner !== 'none') {
        return;
      }

      let image = document.getElementById(event.target.id);
      let colNum = getColumnNum(image);

      // for each row element within the column that was clicked,
      // starting from the bottom, find the first image that is transparent
      // and assign the appropriate player piece to that element
      for (let o = $scope.gameboard.length - 1; o >= 0; o--) {
        if ($scope.gameboard[o][colNum] === 'none') {
          $scope.gameboard[o][colNum] = (connectfour.turn === 'red') ? 'red' : 'black';
          setImage($('#' + event.target.id.replace(event.target.id[1],o)));
          connectfour.checkForWinner(() => {
            if (connectfour.winner !== 'none') {
              let message = (connectfour.winner === 'red') ? 'Red Wins!' : 'Black Wins!';
              showBanner(message);
            }
          });

          connectfour.checkForTie(isTie => {
            if (isTie) {
              showBanner('Tie!');
            }
          });
          connectfour.turnOver();
          break;
        }
      }
    }

    $scope.hideBanner = function() {
      $('.banner').hide();
    }

    function setImage(image) {
      let file = (connectfour.turn === 'red') ? 'images/red.png' : 'images/black.gif';
      image.attr('src', file);
    }

    function getColumnNum(element) {
      let lastIndex = element.id.length - 1;
      return Number(element.id.split('')[lastIndex]);
    }

  }]);
