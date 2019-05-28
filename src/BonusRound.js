import Turn from './Turn';
import domUpdates from './domUpdates';
import Round from './Round';

class BonusRound extends Round {
  constructor(game, puzzle, winner) {
    super(game, puzzle);
    this.gameWinner = winner;
    this.turnCounter = 0;
  }

  newBonusTurn() {
    const turn = new Turn(this, this.gameWinner);
    this.currentTurn = turn;
    domUpdates.updateCurrentPlayer(this.currentTurn.player);
    domUpdates.showHelp('Click "Spin" for a chance to guess a consonant and score points, potentially lose your turn, or go bankrupt. Click "Solve" if you think you know what the answer is. Click "Buy Vowel" if you have more than 100 points and want to guess a vowel.');
    this.turnCounter++;
    if (this.turnCounter > 4) {
      this.endBonusRound();
    }
  }

  endBonusRound() {
    domUpdates.clearCorrectLetters();
    domUpdates.clearIncorrectLetters();
    this.game.winnerDeclaration(this.gameWinner);
  }
}


export default BonusRound;