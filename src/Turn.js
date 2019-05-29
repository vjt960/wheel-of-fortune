import domUpdates from './domUpdates';

class Turn {
  constructor(round, player) {
    this.round = round;
    this.player = player;
    this.spinValue;
    this.hasSpun = false;
    this.currentScore = 0;
  }

  spinWheel() {
    const result = this.round.game.wheel.returnResult();
    this.spinValue = result;
    domUpdates.displaySpinVal(this.round.game);
    if (typeof result === 'number') {
      this.updateMoney(result);
    } else if (result === 'BANKRUPT') {
      this.goBankrupt();
    } else {
      this.endTurn(this.returnNextPlayer());
    }
    this.hasSpun = true;
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
      this.round.gameWinner ? this.round.endBonusRound() : this.round.endRound(this.player);
    } else {
      this.endTurn(this.returnNextPlayer())

    }
  }
  
  updateMoney(value) {
    this.currentScore += value;
  }

  goBankrupt() {
    this.player.roundScore = 0;
    this.endTurn(this.returnNextPlayer());
  }

  endTurn(player = this.player) {
    domUpdates.displayPlayerScores(this.round.game, this.player.id);
    this.round.gameWinner ? this.round.newBonusTurn() : this.round.newTurn(player);
    domUpdates.updateCurrentPlayer(player);
  }

  letterGuessCheck(guess) {
    if (this.round.puzzle.evaluateLetter(guess) === true) {
      this.player.roundScore += (this.currentScore || 250);
      if (domUpdates.evaluateLetterValues()) {
        this.player.totalScore += this.player.roundScore;
        this.player.roundScore = 0;
        domUpdates.updateTotalScore(this.round.game, this.player.id);
        this.round.endRound(this.player)
      } else {
        this.endTurn();
      }
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