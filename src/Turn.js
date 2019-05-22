import domUpdates from './domUpdates';

class Turn {
  constructor(round, player) {
    this.round = round;
    this.player = player;
    this.currentScore = 0;
  }

  spinWheel() {
    const result = this.round.game.wheel.returnResult();
    // const thisGame = this.round.game;
    // const index = thisGame.players.indexOf(this.player);
    // const nextPlayer = thisGame.players[index + 1] || thisGame.players[0];
    // this.round.game.changePlayer();
    // this.player = this.round.game.players[this.round.game.currentPlayer];
    // console.log(this.player)
    if (typeof result === 'number') {
      this.updateMoney(result);
    } else if (result === 'BANKRUPT') {
      this.goBankrupt();
    } else {
      this.endTurn(nextPlayer);
    }
    return result;
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
      this.round.endRound()
    } else {
      this.endTurn(nextPlayer)
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
    const newTurn = new Turn(this.round, player);
    this.round.currentTurn = newTurn;
    domUpdates.updateCurrentPlayer(this.thisGame, this.player)
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