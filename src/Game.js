import Player from './Player';
import domUpdates from './domUpdates';
import Round from './Round'
import Puzzle from './Puzzle'
 
class Game {
  constructor(wheel) {
    this.wheel = wheel;
    this.data = this.wheel.data;
    this.roundCounter = 0;
    this.puzzleBlock;
    this.players;
    this.currentRound;
    this.winner;
  }

  assignPlayerIndeces() {
    this.players.forEach((player, index) => player.id = index);
  }

  assignPuzzleBlock() {
    const newPuzzleBlock = Object.keys(this.data.puzzles)
      .reduce((puzzBlock, puzzType) => {
        const randomIndex = Math.floor(Math.random() * 24);
        const newPuzzle = new Puzzle(this.data.puzzles[puzzType].puzzle_bank
          .find(puzz => this.data.puzzles[puzzType].puzzle_bank
            .indexOf(puzz) === randomIndex));
        puzzBlock.push(newPuzzle);
        return puzzBlock;
      }, [])
    this.puzzleBlock = newPuzzleBlock;
  }

  returnPuzzle() {
    this.assignPuzzleBlock();
    return this.puzzleBlock
      .find((puzz, index, array) => array
        .indexOf(puzz) === this.roundCounter);
  }

  start() {
    this.assignPlayerIndeces();
    const round = new Round(this, this.returnPuzzle());
    round.newTurn();
    this.assignCurrentRound(round);
    domUpdates.displayPuzzleInformation(this.currentRound.puzzle);
    domUpdates.displayPuzzleBlanks(round.puzzle.correctAnswer);
  }

  startBonusRound() {
    this.findWinner();
    console.log(`initiating bonus round with: `, this.winner);
    this.reset();
    //let winner start bonus round;
  }

  reset() {
    //keep players;
    // new round;
    // round.turn;
    //domUpdates disp puzzle info;
    //domUpdates disp puzzle blanks;
  }

  createPlayers(names) {
    const players = names.map(name => {
      let player = new Player(name);
      return player;
    });
    this.players = players;
    domUpdates.displayNames(this.players);
  }

  assignCurrentRound(round) {
    this.currentRound = round;
  }
  
  findWinner() {
    let placement = this.players.slice()
      .sort((a, b) => b.totalScore - a.totalScore);
    this.winner = placement.shift();
  }

  endGame() {
    // find winner
    // start a bonus round with hardest puzzle and winner
  }

}

export default Game;