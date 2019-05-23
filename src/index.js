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

$(document).on('click', ".usable", function(e) {
  game.currentRound.currentTurn.letterGuessCheck($(e.currentTarget).text());
  domUpdates.displayPlayerScores(game, game.currentRound.currentTurn.player.id);
  domUpdates.updateCurrentPlayer(game.currentRound.currentTurn.player);
  domUpdates.clearSpinVal();
  $(e.target).addClass('used');
  $('.letter').removeClass('usable');
  $('.letter').removeClass('hidden');
});

$('.letter').click(function(e) {
  if (!$(e.target).hasClass('usable')) {
    domUpdates.showError('Spin the wheel or buy a vowel to make a guess.');
  }
})

$('.sad-btn').click(function() {
  game.currentRound.currentTurn.endTurn(game.currentRound.currentTurn.player);
  $('.error').text('');
  $('.sad-btn').addClass('hidden');
  $('.spin-btn, .solve-btn, .buy-btn').removeClass('hidden');
});

$('.spin-btn').click(function() {
  game.currentRound.currentTurn.spinWheel();
  domUpdates.displaySpinVal(game);
  $('.vowel').addClass('hidden');
  $('.consonant').addClass('usable')
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

  $('.buy-btn').click(function() {
    if (game.currentRound.currentTurn.buyVowel()) {
      $('.consonant').addClass('hidden');
      $('.vowel').addClass('usable');
    }
  })
});