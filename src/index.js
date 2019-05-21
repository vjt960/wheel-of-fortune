import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import Game from './Game'
import Wheel from './Wheel';

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