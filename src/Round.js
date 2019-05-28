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
    if (this.currentTurn === undefined || player.name !== this.currentTurn.player.name) {
      domUpdates.turnMessage();
    }
    const turn = new Turn(this, player);
    this.currentTurn = turn;
    domUpdates.updateCurrentPlayer(this.currentTurn.player);
    domUpdates.showHelp('Click "Spin" for a chance to guess a consonant and score points, potentially lose your turn, or go bankrupt. Click "Solve" if you think you know what the answer is. Click "Buy Vowel" if you have more than 100 points and want to guess a vowel.');
  }

  endRound(roundWinner) {
    this.game.roundCounter++;
    domUpdates.updateRound(this.game.roundCounter + 1);
    domUpdates.clearCorrectLetters();
    domUpdates.clearIncorrectLetters();
    domUpdates.reanimateUsedLetters();
    if (this.game.roundCounter > 2) {
      this.game.startBonusRound();
    } else {
      this.game.start(roundWinner);
    }
  }
}

export default Round; 