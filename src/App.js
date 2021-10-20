import React, { Component } from 'react';

class App extends Component {
  state = { //state variables
    turn: 'red',  //player turn
    taken: [], //array of boxes taken 
    gameOver: false, //boolean true is game is over
    winner: '', //winner variable
    board: new Array(6).fill(new Array(7).fill(null)) //map of all places on board
  }

  checkWin(row, column, color) { 
    let rowCount = 1; //row count is 1 because only checking spots with a piece already in it
    for (let i = column + 1; i < column + 4; i++) { //check next 3 spaces over
      const spot = this.checkSpot(row, i) //check if the spot is taken
      if (spot && spot.color === color) { //if the spot is taken and its the same color increase row count
        rowCount++;
      } else { //break from for loop
        break;
      }
    }
    for (let i = column - 1; i < column - 4; i--) { //check back 3 spaces over
      const spot = this.checkSpot(row, i) //if the spot is taken and its the same color increase row count
      if (spot && spot.color === color) {
        rowCount++;
      } else {//break from for loop
        break;
      }
    }
    if (rowCount > 3) { //if row count is greater than 3
      this.setState({ winner: color, gameOver: true }); //then the player wins and the game is over
      return;
    }
    let colCount = 1; //col count is 1 because only checking spots with a piece already in it
    for (let i = row + 1; i < row + 4; i++) { //check next 3 spaces down
      const spot = this.checkSpot(i, column) //check if the spot is taken
      if (spot && spot.color === color) { //if the spot is taken and its the same color increase col count
        colCount++;
      } else { //break from for loop
        break;
      }
    }
    for (let i = row - 1; i < row - 4; i--) { //check next 3 spaces up
      const spot = this.checkSpot(i, column) //check if the spot is taken
      if (spot && spot.color === color) { //if the spot is taken and its the same color increase col count
        colCount++;
      } else { //break from for loop
        break;
      }
    }
    if (colCount > 3) { //if row count is greater than 3
      this.setState({ winner: color, gameOver: true }); //then the player wins and the game is over
      return;
    }
    return 0;
  }

  playerMove(column, row) { //called when player clicks
    if (this.state.gameOver) { //check if game is over
      return;
    }
    const { turn } = this.state; //current turn
    let spaceFound = false; //boolean to see if a column has an available space
    const nextTurn = turn === 'red' ? 'yellow' : 'red'; //calculate next player turn. If current turn is red it will be yellow next, if its not red currently it will be red next
    for (let i = 5; i >= 0; i--) { //loop through column bottom up

      const spots = this.state.taken.filter((item) => { // check if each spot has a value.
        return (item.row === i && item.column === column);
      });

      if (spots.length === 0) { //if the filter returned no values then the spot is free in that row
        spaceFound = true; //a space is found
        row = i; //the row to be take is set
        break; //stop checking above chosen stop
      }
    }

    if (!spaceFound) { //if no space is found in the column break
      return; 
    }

    let board = [...this.state.board]; //create variable of current board
    let spot = {...board[row]}; //copy of board row which we are updating
    spot[column] = this.state.turn; // copy of row and column being set to player color
    board[row] = spot; //placing updating value into the copied current board

    this.setState({
      taken: this.state.taken.concat({ column, row, color: this.state.turn }), //add spot to taken state with co-ordinates and color
      turn: nextTurn, //set next players turn
      board: board //update the board
    }, () => {
      for (let i = 0; i < 6; i++) { //loop through entire gameboard
        for (let j = 0; j < 7; j++) {
          if (this.state.board[i][j] != null) { //if there is a taken spot
            this.checkWin(i, j, board[i][j]); //call checkwin function
          }
        }
      }
    });

    if (this.state.taken.length === 41) {
      this.setState({ winner: 'Tie!', gameOver: true });
    }
  }

  checkSpot = (row, column) => { //recieve row and column of piece you want to check
    const spots = this.state.taken.filter((item) => { //returns spots where row and column are found in the checked state. (should return 1 if the box is checked and 0 if its free)
      return (item.row === row && item.column === column);
    });

    return spots[0];
  }

  createBoard() { //create board function 
    const board = []; //empty board array (stores rows)

    for (let i = 0; i < 6; i++) { //loop through 6 times (for each row)
      const column = []; //create array of columns
      for (let j = 0; j < 7; j++) { //loop through 7 times (for each column)
        const spot = this.checkSpot(i, j); //call checkSpot function to see if spot at (i,j) has been taken
        column.push(<div onClick={() => { this.playerMove(j, i) }} style={{ width: 100, height: 100, border: '1px solid #000' }}>({i},{j})
          {spot ? <div style={{ backgroundColor: spot.color, height: '100%', width: '100%', marginTop: "-18%" }} /> : undefined}
        </div>
        ); //push each box into column array. If box has been taken then 
      }
      board.push(<div style={{ display: 'flex', flexDirection: 'row' }}>{column}</div>);//add row to board array
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>{board}</div> //return board to DOM
    );
  }

  resetGame() { //called from reset button
    this.setState({ turn: 'red', taken: [], gameOver: false, winner: '', board: new Array(6).fill(new Array(7).fill(null)) }) //set the states to original states
    this.createBoard(); //re-create the board
  }

  render() {
    return ( //render board, player turn, winner, and reset button
      <div style={{ width: 700, height: 600 }}>{this.createBoard()}
        <h1>{this.state.turn}'s turn</h1>
        <h1> WINNER: {this.state.winner} </h1>
        <button onClick={() => { this.resetGame() }}>Reset</button>
      </div>

    );
  }
}

export default App;