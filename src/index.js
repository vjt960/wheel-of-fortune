import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import Game from './Game'
import Wheel from './Wheel';
import domUpdates from './domUpdates';

let game;

$('.start-button').click(function() {
  $('.player-start-page').addClass('hidden');
  $('.dim').addClass('hidden');
  $('main, header').removeClass('hidden')
  const names = [$('#input-1').val(), $('#input-2').val(), $('#input-3').val()]
  const wheel = new Wheel();
  wheel.createWheel();
  game = new Game(wheel);
  game.createPlayers(names);
  game.start();
});

$('#quit-btn').click(function() {
  location.reload();
});

$('.letter').click(function(e) {
  game.currentRound.currentTurn.letterGuessCheck($(e.currentTarget).text());
  domUpdates.displayPlayerScores(game, game.currentRound.currentTurn.player.id);
  domUpdates.updateCurrentPlayer(game.currentRound.currentTurn.player);
  domUpdates.clearSpinVal();
//   $(e.target).addClass('used');
//   if ($(e.target).hasClass('letter')) {
//     $('.letter-guess').text($(e.target).text());
//     game.currentRound.puzzle.evaluateLetter($(e.target).text());
//     $(e.target).removeClass('letter');
});

$('.sad-btn').click(function() {
  game.currentRound.currentTurn.endTurn(game.players[game.currentPlayer]);
  $('.error').text('');
  $('.spin-btn, .solve-btn, .guess-btn, .buy-btn').removeClass('hidden');
  $('.sad-btn').addClass('hidden');
});

$('.spin-btn').click(function() {
  game.currentRound.currentTurn.spinWheel();
  domUpdates.displaySpinVal(game);
});

$('.solve-btn').click(function(e) {
  e.preventDefault();
  domUpdates.toggleSolveForm();
});

$('.actions-container').click(function(e) {
  e.preventDefault();
  if (e.target.id === 'solve-button') {
    game.currentRound.currentTurn.solvePuzzle($('#solve-input').val().toUpperCase());
    domUpdates.clearForm('#solve-input');
    domUpdates.toggleSolveForm();
  };
});