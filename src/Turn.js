import domUpdates from "./domUpdates";

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
    const thisGame = this.round.game;
    const index = thisGame.players.indexOf(this.player);
    const nextPlayer = thisGame.players[index + 1] || thisGame.players[0];
    this.spinValue = result;
    if (typeof result === 'number') {
      this.spinResult = result;
    } else if (result === 'BANKRUPT') {
      this.spinResult = 'BANKRUPT';
      this.goBankrupt();
    } else {
      this.spinResult = 'other';
    }
  }

  buyVowel(vowel, cost) {
    this.currentScore -= cost;
    this.letterGuessCheck(vowel);
  }

  solvePuzzle(guess) {
    const thisGame = this.round.game;
    const index = thisGame.players.indexOf(this.player);
    const nextPlayer = thisGame.players[index + 1] || thisGame.players[0];
    if (this.round.puzzle.evaluateSolve(guess) === true) {
      this.player.totalScore += this.player.roundScore;
      this.player.roundScore = 0;
      domUpdates.updateTotalScore(this.round.game, this.player);
      this.round.endRound();
    } else {
      this.endTurn(nextPlayer)
    }
  }
  
  updateMoney(value) {
    this.currentScore += value;
    console.log(this.currentScore)
  }

  goBankrupt() {
    this.player.roundScore = 0;
    this.endTurn();
  }

  endTurn(player = this.player) {
    this.round.game.changePlayer();
    const newTurn = new Turn(this.round, player);
    this.round.currentTurn = newTurn;
    domUpdates.updateCurrentPlayer(this.round.game.players, this.round.game.currentPlayer)
  }

  letterGuessCheck(guess) {
    const thisGame = this.round.game;
    const index = thisGame.players.indexOf(this.player);
    const nextPlayer = thisGame.players[index + 1] || thisGame.players[0];
    if (this.round.puzzle.evaluateLetter(guess) === true) {
      this.player.roundScore += this.currentScore;
      this.endTurn();
    } else {
      this.endTurn(nextPlayer);
    }
  }
}

export default Turn;