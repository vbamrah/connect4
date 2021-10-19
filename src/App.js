import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

class App extends Component {
  state = {
    turn: 'red',
    checked: []
  }

  playerMove (column, row) {
    const {turn} = this.state;
    const nextTurn = turn === 'red' ? 'yellow' : 'red';
    for (let i =0; i >= 0; i--) {
      
    }
    this.setState({
      checked: this.state.checked.concat({ column, row, color: this.state.turn }),
      turn: nextTurn
    });
    console.log(this.state.checked);
    console.log("(",{row},",",{column},") clicked");
  }

  checkSpot = (row, column) => {
    const spots = this.state.checked.filter((item) => {
      return(item.row === row && item.column === column);
    });

    return spots[0];
  }

  createBoard() {
    const board = [];

    for (let i = 0; i < 6; i++) {
      const column = [];
      for (let j = 0; j < 7; j++) {
        const spot = this.checkSpot(i,j);
        column.push(<div onClick={ () => {this.playerMove(j, i)}} style={{ width: 100, height: 100, border: '1px solid #000'}}>({i},{j})
          {spot ? <div style={{backgroundColor: spot.color, height: '100%', width: '100%', marginTop: "-18%"}}/> : undefined}
        </div>
        );
      }
      board.push(<div style={{ display: 'flex', flexDirection: 'row' }}>{column}</div>);
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>{board}</div>
    );
  }

  render() {
    return (
      <div style={{ width: 700, height: 600 }}>{this.createBoard()}</div>

    );
  }
}

export default App;
