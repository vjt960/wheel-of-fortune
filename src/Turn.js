import domUpdates from './domUpdates';

class Turn {
  constructor(round, player) {
    this.round = round;
    this.player = player;
    this.spinValue;
    this.currentScore = 0;
    this.spinResult;
  }

  spinWheel() {
    const result = this.round.game.wheel.returnResult();
    this.spinValue = result;
    if (typeof result === 'number') {
      this.updateMoney(result);
    } else if (result === 'BANKRUPT') {
      this.goBankrupt();
    } else {
      this.endTurn(this.returnNextPlayer());
    }

  }

  buyVowel() {
    if (this.player.roundScore > 100) {
      this.player.roundScore -= 100;
      return true;
    } else {
      domUpdates.showError('You cannot afford this.')
      return false;
    }
  }

  solvePuzzle(guess) {
    if (this.round.puzzle.evaluateSolve(guess) === true) {
      this.player.totalScore += this.player.roundScore;
      this.player.roundScore = 0;
      domUpdates.updateTotalScore(this.round.game, this.player.id);
      this.round.endRound();
    } else {
      this.endTurn(this.returnNextPlayer())
    }
  }
  
  updateMoney(value) {
    this.currentScore += value;
  }

  goBankrupt() {
    this.player.roundScore = 0;
    this.endTurn();
  }

  endTurn(player = this.player) {
    // this.round.game.changePlayer();
    this.round.newTurn(player);
    // const newTurn = new Turn(this.round, player);
    // this.round.currentTurn = newTurn;
    domUpdates.updateCurrentPlayer(player);
  }

  letterGuessCheck(guess) {
    if (this.round.puzzle.evaluateLetter(guess) === true) {
      this.player.roundScore += this.currentScore;
      this.endTurn();
    } else {
      this.endTurn(this.returnNextPlayer());
    }
  }

  returnNextPlayer() {
    if (!this.round.game.players[this.player.id + 1]) {
      return this.round.game.players[0];
    } else {
      return this.round.game.players[this.player.id + 1];
    }
  }

}

export default Turn;