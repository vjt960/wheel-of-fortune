# Wheel of Fortune 
## Turing Mod 2 FE Project

### Background
For this project, to the best of our current abilities, we implemented principles of OOP and test-driven development. With the fetch api, we were able to use prototype methods to iterate/mutate a dataset. 


### Gameplay 
Wheel of Fortune consists of three rounds as well as one bonus round. The general idea of the game is to rack up points during each round by guessing letters in a given word puzzle correctly. The person who solves the puzzle gets to keep these round points and accumulates them in their total score. The player with the highest total score wins. Each player is allowed to submit their name to begin the game.

![a gif of users enter their names into three inputs before clicking a button that says 'start game' revealing the game board](/src/images/wheel-start.gif "Users submit names")

Players are then able to choose to spin the wheel with several possible outcomes - a number of points which they can earn by selecting the right consonant, going bankrupt which empties their round score, or losing a turn in which the game moves on to the next player. If a player has at least 100 points in their round score, they are able to buy a vowel which, if correct, earns them 250 points. 

![A gif of a user hovering their mouse over a box full of black letters. As the mouse hovers over each letter, the letter temporarily turns orange and increases in size.](/src/images/wheel-letter-animations.gif)

![A user clicks on a correct letter which is entered into the corresponding blank spaces which represent letters of the puzzle.](/src/images/wheel-correct-letter.gif "User guesses correct letter")

A user can also choose to guess what the puzzle in full by typing into an input box. If they answer correctly, they win the round.

![A user enters the answer to a puzzle correctly.](/src/images/wheel-solve.gif "User solves puzzle")

At the end of the first few rounds, the player with the top score enters a bonus round. They are able to guess three consonants and a vowel before attempting to guess the puzzle. Doing so earns them a prize or cash value from a bonus wheel as well as their total score from the preceding game. Answering correctly allots them only their total score.

![A user plays a bonus round.](/src/images/wheel-bonus-round.gif)

![A user wins the game.](/src/images/wheel-end-game.gif "User wins game")

### Original assignment
Mod 2 Project from Turing School of Software and Design
http://frontend.turing.io/projects/module-2/game-time.html

### Contributors
Jacqeline Moore: https://github.com/jacquelinebelle
Vinton Te'o: https://github.com/vjt960
Steve Rumizen: https://github.com/rumizen

