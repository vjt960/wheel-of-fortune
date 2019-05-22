import Data from './Data';
import Turn from './Turn';
import domUpdates from './domUpdates';

class Round {
  constructor(game, puzzle) {
    this.game = game;
    this.puzzle = puzzle;
    this.solution = puzzle.correctAnswer;
  }

  newTurn() {
    const turn = new Turn(this, this.game.players[0]);
    this.currentTurn = turn;
    domUpdates.updateCurrentPlayer(this.game.players[0]);
  }

  endRound() {
    this.game.roundCounter++;
    domUpdates.updateRound(this.game.roundCounter);
    this.game.start();
  }
}

export default Round;