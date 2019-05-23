import $ from 'jquery';
import Data from './Data';
import Game from './Game';
import Turn from './Turn';
import Player from './Player';

export default {
  displayNames(players) {
    players.forEach((player, index) => {
      $(`.player-${index + 1}`).text(player.name);
    });
  },

  updateCurrentPlayer(player) {
    $('.current-player').text(player.name);
  },

  displayPuzzleInformation(puzzle) {
    $('.puzzle-description').text(puzzle.description);
    $('.puzzle-category').text(puzzle.category)
  },

  displayPuzzleBlanks(puzzle, guess) {
    console.log(puzzle)
    puzzle.map((character, index) => {
      if (/^[A-Za-z]+$/.test(character)) {
        $('.puzzle-container').append(`<div class="puzzle-char char-${index}"></div>`)
      } else {
        $('.puzzle-container').append(`<div class="space char-${index}"></div>`)
      }
    })
  },

  updateRound(round) {
    $('.round').text(round);
  },

  revealCorrectGuess(guess, answer) {
    answer.forEach((letter, index) => {
      if (letter === guess) {
        $(`.char-${index}`).text(`${guess}`);
      }
    })
  },

  addIncorrectGuess(guess) {
    $('.incorrect-guesses').append(`<div class="letter">${guess}</div>`);
  },

  displaySpinVal(game) {
    $('#spin-val').text(game.currentRound.currentTurn.spinValue);
  },

  clearSpinVal() {
    $('#spin-val').text('Spin that wheel!');
  },

  displayPlayerScores(game, playerId) {
    $(`#player${playerId}-round-score-num`).text(game.currentRound.currentTurn.player.roundScore);
  },

  toggleSolveForm() {
    $('#solve-form').toggle();
  },

  clearForm(form) {
    $(form).val('');
  },

  clearCorrectLetters() {
    const letters = $.makeArray($('.puzzle-char'));
    letters.forEach(letter => letter.innerText = '');
  },

  updateTotalScore(game, playerId) {
    $('.round-score-num').text('0');
    $(`#player${playerId}-total-score-num`).text(game.currentRound.currentTurn.player.totalScore)
  }
}
