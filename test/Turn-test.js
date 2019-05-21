import chai from 'chai'
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import domUpdates from '../src/domUpdates.js';
import Game from '../src/Game.js';
import Turn from '../src/Turn.js';
import Player from '../src/Player.js';
import Wheel from '../src/Wheel.js';
import Data from '../src/Data.js'
// chai.spy.on(domUpdates, 'createPlayers', () => true);

describe.skip('Turn', function () {
  let names;
  let wheel = new Wheel();
  let game;
  beforeEach(function () {
    names = ['Steve', 'Vinton', 'Jacqueline'];
    wheel.createWheel();
    game = new Game();
    game.createPlayers(names);
    game.assignPuzzleBlock();
    game.start();
    game.currentRound.newTurn();
  });

  it('should have default properties', function () {
    expect(game.currentRound.currentTurn.currentScore).to.equal(0);
  });

  it('Should be able to spin the wheel', function() {
    expect(game.currentRound.currentTurn.spinWheel()).to.eql();
  });
});