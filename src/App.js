import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

class App extends Component {
  state = {
    turn: 'red',
    checked: [],
    gameOver: false,
    winner: '',
    board: new Array(6).fill(new Array(7).fill(null))
  }

  checkWin(row, column, color) {
    console.log(row, ",", column, ",", color);
    let rowCount = 1;
    for (let i = column + 1; i < column + 4; i++) {
      const spot = this.checkSpot(row, i)
      if (spot && spot.color === color) {
        rowCount++;
      } else {
        break;
      }
    }
    for (let i = column - 1; i < column - 4; i--) {
      const spot = this.checkSpot(row, i)
      if (spot && spot.color === color) {
        rowCount++;
      } else {
        break;
      }
    }
    if (rowCount > 3) {
      this.setState({ winner: color, gameOver: true });
      return;
    }
    let colCount = 1;
    for (let i = row + 1; i < row + 4; i++) {
      const spot = this.checkSpot(i, column)
      if (spot && spot.color === color) {
        colCount++;
      } else {
        break;
      }
    }
    for (let i = row - 1; i < row - 4; i--) {
      const spot = this.checkSpot(i, column)
      if (spot && spot.color === color) {
        colCount++;
      } else {
        break;
      }
    }
    if (colCount > 3) {
      this.setState({ winner: color, gameOver: true });
      return;
    }
    return 0;
  }

  playerMove(column, row) {
    if (this.state.gameOver) {
      return;
    }
    const { turn } = this.state;
    let spaceFound = false;
    const nextTurn = turn === 'red' ? 'yellow' : 'red';
    for (let i = 5; i >= 0; i--) {

      const spots = this.state.checked.filter((item) => {
        return (item.row === i && item.column === column);
      });

      if (spots.length === 0) {
        spaceFound = true;
        row = i;
        break;
      }
    }

    if (!spaceFound) {
      return;
    }

    let board = [...this.state.board];
    let spot = { ...board[row] };
    spot[column] = this.state.turn;
    board[row] = spot;

    this.setState({
      checked: this.state.checked.concat({ column, row, color: this.state.turn }),
      turn: nextTurn,
      board: board
    }, () => {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          if (this.state.board[i][j] != null) {
            this.checkWin(i, j, board[i][j]);
          }
        }
      }
    });

    if (this.state.checked.length === 41) {
      this.setState({ winner: 'Tie!', gameOver: true });
    }
  }

  checkSpot = (row, column) => {
    const spots = this.state.checked.filter((item) => {
      return (item.row === row && item.column === column);
    });

    return spots[0];
  }

  createBoard() {
    const board = [];

    for (let i = 0; i < 6; i++) {
      const column = [];
      for (let j = 0; j < 7; j++) {
        const spot = this.checkSpot(i, j);
        column.push(<div onClick={() => { this.playerMove(j, i) }} style={{ width: 100, height: 100, border: '1px solid #000' }}>({i},{j})
          {spot ? <div style={{ backgroundColor: spot.color, height: '100%', width: '100%', marginTop: "-18%" }} /> : undefined}
        </div>
        );
      }
      board.push(<div style={{ display: 'flex', flexDirection: 'row' }}>{column}</div>);
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>{board}</div>
    );
  }

  resetGame() {
    this.setState({ turn: 'red', checked: [], gameOver: false, winner: '', board: new Array(6).fill(new Array(7).fill(null)) })
    this.createBoard();
  }
  render() {
    return (
      <div style={{ width: 700, height: 600 }}>{this.createBoard()}
        <h1> WINNER: {this.state.winner} </h1>
        <button onClick={() => { this.resetGame() }}>Reset</button>
      </div>

    );
  }
}

export default App;