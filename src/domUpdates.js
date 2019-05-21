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

  updatePlayer(player) {
    $('.current-player').text(player.name);
  },

  displayPuzzleDescription(description) {
    $('.puzzle-description').text(description);

  },

  displayPuzzleBlanks(puzzle) {
    console.log(puzzle)
    puzzle.map(character => {
      if (/^[A-Za-z]+$/.test(character)) {
        $('.puzzle-container').append(`<div class="puzzle-char"></div>`)
      } else {
        $('.puzzle-container').append('<div class="space"></div>')
      }
    })
  }
}
