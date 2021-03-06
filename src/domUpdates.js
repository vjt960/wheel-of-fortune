import $ from 'jquery';

export default {
  displayNames(players) {
    players.forEach((player, index) => {
      $(`.player-${index + 1}`).text(player.name);
    });
  },

  updateCurrentPlayer(player) {
    $('.current-player').text(player.name);
    $('.letters-1').text(player.name);
  },

  displayPuzzleInformation(puzzle) {
    $('.puzzle-description').text(puzzle.description);
    $('.puzzle-category').text(puzzle.category)
  },

  displayPuzzleBlanks(puzzle) {
    puzzle.map((character, index) => {
      if (/^[A-Z]+$/.test(character)) {
        $('.puzzle-container').append(`<div class="puzzle-char char-${index}"></div>`)
      } else if (/^[&-]$/) {
        $('.puzzle-container').append(`<div class="space char-${index}">${character}</div>`)
      } else {
        $('.puzzle-container').append(`<div class="space char-${index}"></div>`);
      }
    });
  },

  useLetter(letter) {
    $(letter).addClass('used');
    $('.letter').removeClass('usable');
    $('.letter').removeClass('hidden');
  },

  reanimateUsedLetters() {
    $('.used').removeClass('used');
  },

  updateRound(round) {
    $('.round').text(round);
  },

  revealCorrectGuess(guess, answer) {
    answer.forEach((letter, index) => {
      if (letter === guess) {
        $(`.char-${index}`).text(`${guess}`);
      }
    })
  },

  evaluateLetterValues() {
    const letterBoxes = $.makeArray($('.puzzle-char'));
    const correctLetters = letterBoxes.filter(box => box.innerText !== '');
    return letterBoxes.length === correctLetters.length;
  },

  addIncorrectGuess(guess) {
    $('.incorrect-guesses').append(`<div class="letter">${guess}</div>`);
  },

  displaySpinVal(game) {
    $('#spin-val').text(game.currentRound.currentTurn.spinValue);
    $('#spin-val').addClass('spin-val-transition');
    setTimeout(function () {
      $('#spin-val').removeClass('spin-val-transition');
    }, 1000);
  },

  clearSpinVal() {
    $('#spin-val').text('Spin that wheel!');
  },

  displayPlayerScores(game, playerId) {
    $(`#player${playerId}-round-score-num`).text(game.currentRound.currentTurn.player.roundScore);
    $(`#player${playerId}-round-score-num`).addClass('score-transition');
    setTimeout(function() {
      $(`#player${playerId}-round-score-num`).removeClass('score-transition');
    }, 1000);
  },

  toggleSolveForm() {
    $('#solve-form').toggle();
    $('.spin-btn, .solve-btn, .guess-btn, .buy-btn').toggleClass('hidden');
  },

  clearForm(form) {
    $(form).val('');
  },

  clearCorrectLetters() {
    $('.puzzle-char, .space').remove()
  },

  clearIncorrectLetters() {
    $('.incorrect-guesses').children().remove();
  },

  updateTotalScore(game, playerId) {
    $('.round-score-num').text('0');
    $(`#player${playerId}-total-score-num`).text(game.currentRound.currentTurn.player.totalScore)
  },

  turnMessage() {
    const ml4 = {};
    ml4.opacityIn = [0, 1];
    ml4.scaleIn = [0.2, 2];
    ml4.scaleOut = 3;
    ml4.durationIn = 600;
    ml4.durationOut = 600;
    ml4.delay = 500;

    anime.timeline({ loop: false })
      .add({
        targets: '.ml4 .letters-1',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      }).add({
        targets: '.ml4 .letters-1',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      }).add({
        targets: '.ml4 .letters-2',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      }).add({
        targets: '.ml4 .letters-2',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      }).add({
        targets: '.ml4',
        opacity: 1,
        duration: 500,
        delay: 500
      });
  },

  showError(message) {
    $('.error').text(message);
    $('.sad-btn').removeClass('hidden');
    $('.spin-btn, .solve-btn, .buy-btn').addClass('hidden');
  },

  showHelp(message) {
    setTimeout(function() { 
      $('.help').text(message); 
    }, 60000);
  },

  displayGameWinner(winner) {
    $('#winner-popup').toggle();
    $('#winner-name').text(winner.name);
    $('#winner-money').text(winner.totalScore);
  }
}