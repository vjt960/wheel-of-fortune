import chai from 'chai';
const expect = chai.expect;
import Game from '../src/Game';
import Turn from '../src/Turn';
import Wheel from '../src/Wheel.js';
import Round from '../src/Round';
import Puzzle from '../src/Puzzle';

describe('Round', function() {
  let wheel;
  let names;
  let game;
  beforeEach(function() {
    wheel = new Wheel();
    wheel.createWheel();
    names = ['Steve', 'Vinton', 'Jacqueline'];
    game = new Game(wheel);
    game.createPlayers(names);
    game.assignPuzzleBlock();
    game.start();
  });

  it('should be an instance of Round', function() {
    expect(game.currentRound).to.be.an.instanceOf(Round);
  });

  it('should store the current game instance as a property', function() {
    expect(game.currentRound.game).to.equal(game);
  });

  it('should store a puzzle as a property', function() {
    expect(game.currentRound.puzzle).to.be.an.instanceOf(Puzzle);
  });

  it('should be able to start a new turn', function() {
    game.currentRound.newTurn();
    expect(game.currentRound.currentTurn).to.be.an.instanceOf(Turn);
    expect(game.currentRound.currentTurn.player.name).to.equal('Steve');
    expect(game.currentRound.currentTurn.currentScore).to.equal(0);
  });

  it('should be able to end the round at play', function() {
    expect(game.roundCounter).to.equal(0);
    game.currentRound.endRound();
    expect(game.roundCounter).to.equal(1);
    game.currentRound.endRound();
    game.currentRound.endRound();
    game.currentRound.endRound();
    expect(game.roundCounter).to.equal(4);
  });
});