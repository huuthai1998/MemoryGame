# Memory-Game
A 6x6 grid memory game that is playable on browsers built by ReactJS. The game is compatible with phone, tablet, pc, etc. 
The game is able to:
- Allow player to change how many moves they can make.
- Notify player when they win or lose
- Show player how many moves they have left.
- Keep track of the current score as well as player's best score.
- A timer to keep track of the length of the game.
- Allow player to start a new game anytime
- The board is scrambled every new game.

# Prequesite
- Git and NodeJS must be installed

# Getting Started
1. Clone the repository or only the build folder on your computer. 
2. Open the terminal in the MemoryGame folder then run these commands:

```
npm install -g serve
serve -s build
```

The local host address will be copied to clipboard

3. Go the the copied address on any browser and enjoy!

# How to play
The Rules: 
- Player will flip 2 cards. If they match, they will stay in the flipped state. Otherwise, both card will flipped back after a 2 seconds timeout.
- Player can enter the number of steps they are allow to make in the game. They won if they solved the game before the moves ran out and lost otherwise. (The default value for number of move is 100. If player left the input for number of moves blank, it will take the value of the last number of moves)
- The game will display an alert whenever the player win or lose.
- Player can start new game by clicking the New Game button. After setting up number of moves allowed, click the GO! button to start the game.

# Built With
ReactJS - Front-end framework. Utilized React Hook for cleaner code.

# Author
Thai Nguyen - 2019
