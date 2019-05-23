import chai from 'chai'
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Puzzle from '../src/Puzzle.js';
import Data from '../src/Data';

describe('Puzzle', function() {
  let puzzle;
  beforeEach(function() {
    puzzle = new Puzzle(Data.puzzles.one_word_answers.puzzle_bank[0]);
  });

  it('should have default properties', function() {
    expect(puzzle.category).to.eql('Around The House');
    expect(puzzle.correctAnswer).to.eql(['A', 'R', 'M', 'C', 'H', 'A', 'I', 'R']);
  });

  it('Should be able to evaluate a letter guess', function() {
    expect(puzzle.evaluateLetter('H')).to.equal(true);
    puzzle.evaluateLetter('A');
    puzzle.evaluateLetter('R');
    expect(puzzle.correctGuesses.length).to.equal(3);
    puzzle.evaluateLetter('F');
    expect(puzzle.incorrectGuesses.length).to.equal(1);
  });

  it('Should be able to evaluate a solve guess', function() {
    expect(puzzle.evaluateSolve('ARMCHAIR')).to.equal(true);
    expect(puzzle.evaluateSolve('Armchairs')).to.equal(false);
  });
});