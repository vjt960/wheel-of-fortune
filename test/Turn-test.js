import chai from 'chai'
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import domUpdates from '../src/domUpdates.js';
import Game from '../src/Game.js';
import Round from '../src/Round.js';
import Turn from '../src/Turn.js';
import Player from '../src/Player.js';
import Wheel from '../src/Wheel.js';
import Data from '../src/Data.js'
// chai.spy.on(domUpdates, 'createPlayers', () => true);

describe('Turn', function () {
  let names;
  let wheel = new Wheel();
  let game;
  let turn;

  beforeEach(function () {
    names = ['Steve', 'Vinton', 'Jacqueline'];
    wheel.createWheel();
    game = new Game(wheel);
    game.createPlayers(names);
    game.assignPuzzleBlock();
    game.start();
    game.currentRound.newTurn();
    turn = game.currentRound.currentTurn;
  });

  it('should have default properties', function () {
    expect(turn.currentScore).to.equal(0);
    expect(turn.round).to.be.an.instanceOf(Round);
    expect(turn.player).to.be.an.instanceOf(Player);
  });

  it('Should be able to spin the wheel', function() {
    let result = turn.round.game.wheel.values;
    expect(result).to.include(turn.spinWheel());
  });

  it('should be able to buy a vowel', function() {
    turn.currentScore = 500;
    turn.buyVowel('A', 100);
    expect(turn.currentScore).to.equal(400);
  });
})