import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Data from '../src/Data.js'
import Player from '../src/Player.js';
import Game from '../src/Game.js';
import Wheel from '../src/Wheel.js';

describe('Game', function() {
  let wheel;
  let game;
  let player1;
  let player2;
  let player3;
  let players;
  beforeEach(function() {
    wheel = new Wheel();
    wheel = wheel.createWheel();
    players = ['Steve', 'Vinton', 'Jacqueline'];
    game = new Game(wheel);
  });

  it('should have default properties', function() {
    expect(game.wheel).to.deep.equal(wheel);
    expect(game.roundCounter).to.equal(0);
  });

  it('Should be able to create a puzzle block', function() {
    game.assignPuzzleBlock();
    expect(game.puzzleBlock.length).to.equal(4);
  });

  it('Should be able to start a game', function () {
    game.assignPuzzleBlock();
    game.start();
    game.currentRound.newTurn();
    expect(game.currentRound.currentTurn.player.name).to.equal('Steve');
  });
});
