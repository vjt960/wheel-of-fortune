import chai from 'chai'
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Puzzle from '../src/Puzzle.js';
import Data from '../src/Data';


// {
//   category: 'Around The House',
//   number_of_words: 1,
//   total_number_of_letters: 8,
//   first_word: 8,
//   description: 'Location or object(s) found within a typical house.',
//   correct_answer: 'Armchair',
// }

describe('Puzzle', function() {
  let puzzle;
  beforeEach(function() {
    puzzle = new Puzzle(Data.puzzles.one_word_answers.puzzle_bank[0]);
  });

  it('should have default properties', function() {
    expect(puzzle.category).to.eql('Around The House');
    expect(puzzle.correctAnswer).to.eql(['A', 'r', 'm', 'c', 'h', 'a', 'i', 'r']);
  });

  it('Should be able to evaluate a letter guess', function() {
    expect(puzzle.evaluateLetter('h')).to.equal(true);
    puzzle.evaluateLetter('a');
    puzzle.evaluateLetter('r');
    expect(puzzle.correctGuesses.length).to.equal(3);
    puzzle.evaluateLetter('f');
    expect(puzzle.incorrectGuesses.length).to.equal(1);
  });

  it('Should be able to evaluate a solve guess', function() {
    expect(puzzle.evaluateSolve('armchair')).to.equal(true);
    expect(puzzle.evaluateSolve('Armchairs')).to.equal(false);
  });
})