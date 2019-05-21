import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import domUpdates from '../src/domUpdates.js';
import Game from '../src/Game.js';
import Wheel from '../src/Wheel.js';
import Round from '../src/Round.js';
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

  it('should return a puzzle based on the round being played', function() {
    game.start();
    expect(game.roundCounter).to.equal(0);
    expect(game.returnPuzzle()).to.equal(game.puzzleBlock[0]);
    game.currentRound.endRound();
    game.currentRound.endRound();
    expect(game.returnPuzzle()).to.equal(game.puzzleBlock[2]);
  });

  it('should store each new Round as a property', function() {
    game.start();
    expect(game.currentRound).to.be.an.instanceOf(Round);
  });

  it.skip('should return the winner with the highest total score', function() {
    game.start();
    expect(game.roundCounter).to.equal(0);
    game.currentRound.endRound();
    game.currentRound.endRound();
    game.currentRound.endRound();
    expect(game.roundCounter).to.equal(3);
    game.players[0].totalScore = 4000;
    game.currentRound.endRound();
    expect(game.roundCounter).to.equal(4);
    expect(game.findWinner()).to.equal(game.players[0]);
  })
});