/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

// TODO: declare a global variable named 'game` - it will reference the instance of the current game

let game;

class Player
{
    constructor(token)
    {
        this.token = token;
    }
}

// Tic Tac Toe Game Class
class TicTacToe {
  constructor(){
      // You may set the "token" to anything that corresponds to a Icon
      // icon name ('heart', 'star', 'remove-sign', 'unchecked', 'bell',
      // 'certificate', etc.)
      this.player1 = new Player('check');
      this.player2 = new Player('circle');

      this.currentPlayer = null;
      this.gameStatus = null;
      this.winner = null;
      this.moveCount = 0;
      
      // TODO: Set up DOM elements used in game as Class properties
      this.startPrompt = document.querySelector('#start-prompt');
      this.movePrompt = document.querySelector('#move-prompt');
      this.currentPlayerToken = document.querySelector('#player-token');
      this.gameboard = document.querySelector('#gameboard');
      this.winScreen = document.querySelector('#win-screen');
      this.winnerToken = document.querySelector('#winner-token');
      this.drawScreen = document.querySelector('#draw-screen');
      
      
      // Initialize an Array representing the starting state of the game board.
      // This is provided for you. We can access the spaces on the board using
      // (X, Y) coordinates as `this.gameState[x][y]`, which is how the game
      // will check to see if the winner is known.
      this.gameState = [
          [null, null, null],
          [null, null, null],
          [null, null, null]
      ];

      // Array of Win States
      // This is provided for you. Each of these arrays represents the ways
      // a player can win Tic Tac Toe. Each item in the array is another
      // array. Each of those arrays contains a set of (X, Y) coordinates.
      // If a player has claimed the tile at each of the coordinates listed in
      // one of the win states, then they have won the game.
      this.winStates = [
        [[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],
        [[0,2],[1,1],[2,0]]
      ];
  }

  // This `checkForWinner()` method is provided for you, but you must fill in
  // the event dispatch lines that cause the end game screens to show.
  checkForWinner()
  {
    for (let condition of this.winStates){
        let winningCondition = true;
        for (let position of condition)
        {
            if (this.gameState[position[0]][position[1]] != this.currentPlayer.token)
            {
                winningCondition = false;
            }
        }
        if (winningCondition)
        {
            console.log('We have a winner!');
            console.log(`Condition is: ${condition}`);
            this.gameStatus = 'won';
            this.winner = this.currentPlayer;

            let winEvent = new Event("win");
            document.dispatchEvent(winEvent);

            return true; // Return a value to stop processing the additional move count check.
        }
    }
    this.moveCount++;
    console.log(`Reviewed move ${this.moveCount}.`)
    if (this.moveCount >= 9)
    {
        console.log(`This game is a draw at ${this.moveCount} moves.`);
        this.gameStatus = 'draw';
        let drawEvent = new Event("draw");
        document.dispatchEvent(drawEvent);
    }
}

  recordMove(event)
  {
      // This method handles recording a move in the `this.gameState` property.
      // To record a move, we must accmoplish the following:

      // 1. Find the X, Y coordinates of the tile that was just selected
      // 2. Claim that tile in the `this.gameState` array
      // 3. Set the class attribute of the tile to reflect which player has claimed it
    let tile_x = event.target.getAttribute("data-x");
    let tile_y = event.target.getAttribute("data-y");
        
    this.gameState[tile_x][tile_y] = game.currentPlayer.token;

    event.target.setAttribute('class', 'tile played fas fa-'+this.currentPlayer.token);
    // This prevents a player from claiming on an occupied space.
    event.target.removeEventListener("click", handleMove);
  }
  switchPlayer()
  {
    if (this.currentPlayer == this.player1)
    {
        this.currentPlayer = this.player2;
    }
    else
    {
        this.currentPlayer = this.player1;
    }
    this.currentPlayerToken.setAttribute("class", "fas fa-"+this.currentPlayer.token);

  }

  setUpTileListeners()
  {
      // This method sets up event listeners for tiles. It is called when we
      // start a new game. It must find all the tiles and apply event listeners
      // to them.
    let tileElements = document.querySelectorAll(".tile");
    for (let tile of tileElements)
    {
        tile.addEventListener("click", handleMove);
    }
  }

  showWinScreen()
  {
    // This method displays the end game screen for a Win.
    this.winScreen.setAttribute("class", "show");
    this.winnerToken.setAttribute("class", "fas fa-"+this.winner.token);
  }
  showDrawScreen()
  {
    this.drawScreen.setAttribute("class", "show");
  }
  setUpBoard()
  {
    this.gameboard.innerHTML = "";

      // We must draw the game board by using a loop to create rows with
      // tiles in them. We want to create the same structure as we see in the
      // index.html file.

    for (let i = 0; i < 3; i++)
    {
        let newRow = document.createElement("div");
        newRow.setAttribute("class", "row");
        for (let j = 0; j < 3; j++)
        {
            let newCol = document.createElement("div");
            newCol.setAttribute("class", "col-xs-3");
            let newTile = document.createElement("span");
            newTile.setAttribute('class', 'tile fas fa-question');
            newTile.setAttribute("data-x", j);
            newTile.setAttribute("data-y", i);

            newCol.appendChild(newTile);
            newRow.appendChild(newCol);
        }
        this.gameboard.appendChild(newRow);
    }
      
    this.setUpTileListeners();
    
  }
    initializeMovePrompt()
    {
        this.startPrompt.setAttribute("class", "hidden");
        this.movePrompt.removeAttribute("class");
        this.currentPlayer = this.player1;
    }
    start()
    {
        this.setUpBoard();
        this.initializeMovePrompt();
    }
} // End of the Tic Tac Toe Class definition.

// Outside of the Class definitions, we need a few items to control the game
// so our players can successfull play.

document.addEventListener("DOMContentLoaded", function(event)
    {
        let startButton = document.querySelector("#start-button");
        startButton.addEventListener("click", function(event)
        {
            game = new TicTacToe;
            game.start();
        });
    });

document.addEventListener('win', function(event)
    {
        game.showWinScreen();
    });

document.addEventListener('draw', function(event)
    {
        game.showDrawScreen();
    });

// External function for event listeners provided for you.
function handleMove(event)
{
  game.recordMove(event);
  game.checkForWinner();
  game.switchPlayer();
}
