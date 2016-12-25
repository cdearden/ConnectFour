#ConnectFour
![Image unavailable](./Screen Shot.png?raw=true)

##Basic Overview
This is the classic Connect Four game.

Deployed example: [Connect Four on Heroku](https://connect--four.herokuapp.com)

##Installation
```
$ git clone https://github.com/cdearden/ConnectFour.git
$ npm start
```

##Usage
The rules are as follows:

1. Choose who plays first.
2. Each player in his turn drops one of his checkers down any of the slots in the top of the grid.
3. The play alternates until one of the players gets four checkers of his colour in a row. The four in a row can be horizontal, vertical, or diagonal.(See examples).
4. The first player to get four in a row wins.
5. If the board is filled with pieces and neither player has 4 in a row, then the game is a draw.

(Rules taken from http://www.andersbaumann.dk/connectfour/rulesConnectFour.html)

##Documentation
###Tech Stack
Angular, Express, Node, MySQL

###Code Base
/client/index.html is the main page.
/client/src/ConnectFour.js contains all of the logic.
/server/server.js serves the client files.

##Challenges
Formatting the squares to show up in the right position as the window is resized.
