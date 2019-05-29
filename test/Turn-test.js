import chai from 'chai'
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Game from '../src/Game.js';
import Round from '../src/Round.js';
import Player from '../src/Player.js';
import Wheel from '../src/Wheel.js';
import Data from '../src/Data.js'

describe('Turn', function () {
  let names;
  let wheel = new Wheel(Data);
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
    turn.spinWheel();
    expect(result).to.include(turn.spinValue);
  });

  it('should be able to buy a vowel', function() {
    turn.player.roundScore = 500;
    turn.buyVowel();
    expect(turn.player.roundScore).to.equal(400);
  });

  it('should be able to hold a value on good spins', function() {
    expect(turn.currentScore).to.equal(0);
    while (turn.currentScore < 1) {
      turn.spinWheel();
    }
    expect(turn.currentScore).to.be.gt(0);
  });

  it('should be able to default a player\'s round score', function() {
    turn.player.roundScore = 2000;
    turn.goBankrupt();
    expect(turn.player.roundScore).to.equal(0);
  });

  it('should be able to evaluate a player\'s guess', function() {
    turn.currentScore = 1000;
    turn.player.roundScore = 500;
    expect(turn.player.name).to.equal('Steve');
    turn.letterGuessCheck('0');
    expect(turn.player.roundScore).to.equal(500);
    expect(turn.round.currentTurn.player.name).to.equal('Vinton');
  });
});