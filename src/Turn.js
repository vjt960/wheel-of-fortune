<<<<<<< HEAD
import domUpdates from "./domUpdates";
=======

import domUpdates from './domUpdates';
>>>>>>> 6ef8145b90dd2bc9cca6cda157b784c58d307cac

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
<<<<<<< HEAD
    const thisGame = this.round.game;
    const index = thisGame.players.indexOf(this.player);
    const nextPlayer = thisGame.players[index + 1] || thisGame.players[0];
=======
    const nextPlayer = this.round.game.players[this.player.id + 1] || this.round.game.players[0];
>>>>>>> 6ef8145b90dd2bc9cca6cda157b784c58d307cac
    this.spinValue = result;
    if (typeof result === 'number') {
      this.updateMoney(result);
    } else if (result === 'BANKRUPT') {
      this.goBankrupt();
    } else {
<<<<<<< HEAD
      this.spinResult = 'other';
=======
      this.endTurn(nextPlayer);
>>>>>>> 6ef8145b90dd2bc9cca6cda157b784c58d307cac
    }
  }

  buyVowel(vowel, cost) {
    this.currentScore -= cost;
    this.letterGuessCheck(vowel);
  }

  solvePuzzle(guess) {
    if (this.round.puzzle.evaluateSolve(guess) === true) {
      this.player.totalScore += this.player.roundScore;
      this.player.roundScore = 0;
<<<<<<< HEAD
      domUpdates.updateTotalScore(this.round.game, this.player);
=======
      domUpdates.updateTotalScore(this.round.game, this.player.id);
>>>>>>> 6ef8145b90dd2bc9cca6cda157b784c58d307cac
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
    const newTurn = new Turn(this.round, player);
    this.round.currentTurn = newTurn;
    domUpdates.updateCurrentPlayer(this.round.game.currentPlayer);
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
    if (this.round.game.players[this.player.id + 1]) {
      return this.round.game.players[this.player.id + 1];
    } else {
      return this.round.game.players[0];
    }
  }
}

export default Turn;