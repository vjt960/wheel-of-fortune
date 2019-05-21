import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import domUpdates from '../src/domUpdates.js';
import Data from '../src/Data.js'
import Player from '../src/Player.js';
import Game from '../src/Game.js';
import Wheel from '../src/Wheel.js';
chai.spy.on(domUpdates, 'createPlayers', () => true);


describe('Game', function() {
  let names;
  let wheel;
  let game;

  beforeEach(function() {
    wheel = new Wheel();
    wheel.createWheel();
    names = ['Steve', 'Vinton', 'Jacqueline'];
    game = new Game(wheel);
    game.createPlayers(names);
    game.assignPuzzleBlock();
  });

  it('should have default properties', function() {
    expect(game.wheel).to.deep.equal(wheel);
    expect(game.roundCounter).to.equal(0);
    expect(game.players.length).to.eql(3);
    expect(game.wheel.values.length).to.equal(22);
  });

  it('Should be able to create a puzzle block', function() {
    expect(game.puzzleBlock.length).to.equal(4);
  });

  it('Should be able to start a game', function () {
    game.start();
    game.currentRound.newTurn();
    expect(game.currentRound.currentTurn.player.name).to.equal('Steve');
  });

  it('Should be able to create players', function () {
    expect(game.players[0].name).to.equal('Steve');
  });
});
