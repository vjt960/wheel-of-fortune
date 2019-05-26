import Turn from './Turn';
import domUpdates from './domUpdates';

class Round {
  constructor(game, puzzle) {
    this.game = game;
    this.puzzle = puzzle;
    this.solution = puzzle.correctAnswer;
    this.currentTurn;
  }

  newTurn(player = this.game.players[0]) {
    const turn = new Turn(this, player);
    this.currentTurn = turn;
    domUpdates.updateCurrentPlayer(this.currentTurn.player);
    domUpdates.turnMessage();
  }

  endRound() {
    this.game.roundCounter++;
    domUpdates.updateRound(this.game.roundCounter + 1);
    domUpdates.clearCorrectLetters();
    this.game.start();
  }
}

export default Round; 