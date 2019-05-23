import Turn from './Turn';
import domUpdates from './domUpdates';

class Round {
  constructor(game, puzzle) {
    this.game = game;
    this.puzzle = puzzle;
    this.solution = puzzle.correctAnswer;
    this.currentTurn;
  }

  newTurn(player = this.game.players[Math.floor((Math.random() * 3))]) {
    const turn = new Turn(this, player);
    this.currentTurn = turn;
    domUpdates.updateCurrentPlayer(this.currentTurn.player);
  }

  endRound() {
    this.game.roundCounter++;
    domUpdates.updateRound(this.game.roundCounter + 1);
    domUpdates.clearCorrectLetters();
    this.game.start();
  }
}

export default Round;