// import Data from './Data';

class Turn {
  constructor(round, player) {
    this.round = round;
    this.player = player;
    this.currentScore = 0;
  }

  spinWheel() {
    const result = this.round.game.wheel.returnResult();
    const thisGame = this.round.game;
    const index = thisGame.players.indexOf(this.player);
    const nextPlayer = thisGame.players[index + 1] || thisGame.players[0];
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
  }

  letterGuessCheck(guess) {
    const thisGame = this.round.game;
    const index = thisGame.players.indexOf(this.player);
    const nextPlayer = thisGame.players[index + 1] || thisGame.players[0];
    if (this.round.puzzle.evaluateLetter(guess) === true) {
      this.player.roundScore += this.currentScore;
      guess = guess.toUpperCase();
      this.round.solution = this.round.solution.filter(letter => letter !== '');
      this.round.solution = this.round.solution.filter(letter => letter !== guess);
      this.round.solution.length < 1 ? this.round.endRound : this.endTurn();
    } else {
      this.endTurn(nextPlayer);
    }
  }

}

export default Turn;