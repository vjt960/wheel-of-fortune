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

  updateCurrentPlayer(playerArray, index) {
    $('.current-player').text(playerArray[index - 1].name);
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
    $('.incorrect-guesses').append(`<div class="letter used">${guess}</div>`);
  }
}
