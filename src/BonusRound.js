// import Turn from './Turn';
import domUpdates from './domUpdates';
import Round from './Round';

class BonusRound extends Round {
  constructor(game, puzzle, winner) {
    super(game, puzzle);
    this.winner = winner;
  }

  endBonusRound() {
    domUpdates.clearCorrectLetters();
    domUpdates.clearIncorrectLetters();
    //WinnerDeclaration();
  }
}


export default BonusRound;