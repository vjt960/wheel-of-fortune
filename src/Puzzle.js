import domUpdates from './domUpdates';

class Puzzle {
  constructor(puzzleData) {
    this.category = puzzleData.category;
    this.numberOfWords = puzzleData.number_of_words;
    this.totalNumberofLetters = puzzleData.total_number_of_letters;
    this.firstWordLength = puzzleData.first_word;
    this.description = puzzleData.description;
    this.correctAnswer = [...puzzleData.correct_answer.toUpperCase()];
    this.correctGuesses = [];
    this.incorrectGuesses = [];
  }

  evaluateLetter(guess) {
    if (this.correctAnswer.includes(guess)) {
      this.correctGuesses.push(guess);
      domUpdates.revealCorrectGuess(guess, this.correctAnswer);
      return true;
    } else {
      this.incorrectGuesses.push(guess);
      domUpdates.addIncorrectGuess(guess);
      return false;
    }
  }

  evaluateSolve(guess) {
    return this.correctAnswer.join('').toLowerCase() == guess;
  }
}

export default Puzzle;