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

  displayPuzzleDescription(description) {
    $('.puzzle-description').text(description);

  },

  displayPuzzleBlanks(puzzle, guess) {
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
    $(`.char-${answer.indexOf(guess)}`).text(guess);
  },

  addIncorrectGuess(guess) {
    $('.incorrect-guesses').append(`<div>${guess}</div>`);
  }
}
