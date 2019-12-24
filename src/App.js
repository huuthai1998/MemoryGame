import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./board/board";
import initializeDeck from "./deck/deck";

export default function App() {
  const [tiles, setTiles] = useState([]); //The array of tiles
  const [flipped, setFlipped] = useState([]); //The array of flipped tiles (maximum length = 2)
  const [dimension, setDimension] = useState(800); //Dimension of the window
  const [correct, setCorrect] = useState([]); //The array of solved tiles
  const [disable, setDisable] = useState(false); //Disable status of the tiles. The tiles are not clickable if disable = true
  const [score, setScore] = useState(0); //Track score of current game
  const [bestScore, setBestScore] = useState(0); //Track the best score
  const [minutes, setMinutes] = useState(0); //Minute of the timer
  const [seconds, setSeconds] = useState(0); //Second of the timer
  const [isTimerActive, setIsTimerActive] = useState(false); //The state of the timer. Timer will stop if isTimerActive = false
  const [movesLeft, setMovesLeft] = useState(100); //Track the number of move player has left
  const [previousMoveOption, setPreviousMoveOption] = useState(100); //Store the previous move allowed option used when player left the numberOfMove input box empty
  const [firstClick, setFirstClick] = useState(true); //Track status of the first click on the tiles to start the timer
  const [isFinished, setIsFinished] = useState(false); //Status of the game. The game is not playable if it is finished
  const [isHidden, setIsHidden] = useState(true); //Flag used to hide the board and the difficulty option bars.
  const [isSettingUp, setIsSettingUp] = useState(true); //Status of the game. Unhide the difficulty bar and hide the board if isSettingUp is true

  //Initialize the board and call the function to resize the board whenever the window's size changes
  useEffect(() => {
    resizeBoard();
    setTiles(initializeDeck());
  }, []);

  //Resize the board whenever the window's size changes
  useEffect(() => {
    const windowListener = window.addEventListener("resize", resizeBoard);
    return () => window.removeEventListener("resize", windowListener);
  });

  //Track the score and movesLeft to determine if the user win or lose
  useEffect(() => {
    if (score === 18) handleWin();
    else if (movesLeft === 0) handleLoss();
  }, [score, movesLeft]);

  //Call preloadImg whenever there is change to tiles
  useEffect(() => {
    preloadImg();
  }, [tiles]);

  //The timer. Start when player performed a first click on the tile
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        } else setSeconds(seconds + 1);
      }, 1000);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [isTimerActive, seconds]);

  //Flag to start the timer
  const startTimer = () => {
    setIsTimerActive(true);
  };

  //Display an alert to notice player that they had lost
  const handleLoss = () => {
    alert("Sorry! You lost =(");
    setDisable(true);
    setIsFinished(true);
    setIsTimerActive(false);
  };

  //Display an alert to notice player that they had won
  const handleWin = () => {
    alert("Congratulations! You won!");
    setDisable(true);
    setIsFinished(true);
    setIsTimerActive(false);
  };

  //Preload image for smoother transition
  const preloadImg = () => {
    tiles.map(tile => {
      const src = require(`./asset/${tile.type}.png`);
      new Image().src = src;
    });
  };
  //Handle the event when user flip a tile
  const handleFlip = id => {
    if (firstClick) {
      startTimer();
      setFirstClick(false);
    }
    if (!isFinished) {
      setDisable(true);
      if (flipped.length === 0) {
        setFlipped([id]);
        setDisable(false);
        setMovesLeft(movesLeft - 1);
      } else {
        //If player clicked on the same tile, nothing happened
        if (!flipped.includes(id)) {
          setFlipped([...flipped, id]);
          //If the it is a pair
          if (isCorrect(id)) {
            setMovesLeft(movesLeft - 1);
            setCorrect([...correct, flipped[0], id]);
            reset2FlippedTiles();
            setScore(score + 1);
            if (bestScore <= score) {
              setBestScore(bestScore + 1);
            }
          } else {
            setMovesLeft(movesLeft - 1);
            setTimeout(reset2FlippedTiles, 1000);
          }
        } else setDisable(false);
      }
    }
  };
  //Flip 2 incorrect tiles back
  const reset2FlippedTiles = () => {
    setFlipped([]);
    setDisable(false);
  };
  //Function to check if 2 flipped tiles are a pair
  const isCorrect = id => {
    const clickTile = tiles.find(tile => tile.id === id);
    const flippedTile = tiles.find(tile => tile.id === flipped[0]);
    return clickTile.type === flippedTile.type;
  };
  //Handle the new game/ go button
  const handleNewGame = () => {
    if (movesLeft < 35 && isSettingUp) {
      alert("Please enter a number greater than 35");
      return;
    }
    if (!isSettingUp) {
      setScore(0);
      setSeconds(0);
      setMinutes(0);
      setIsHidden(true);
      reset2FlippedTiles();
      setIsTimerActive(false);
      setIsFinished(true);
      setFirstClick(true);
      setIsSettingUp(true);
      setMovesLeft(previousMoveOption);
    } else {
      setIsFinished(false);
      setPreviousMoveOption(movesLeft);
      setTiles(initializeDeck());
      setCorrect([]);
      setScore(0);
      setSeconds(0);
      setMinutes(0);
      setIsSettingUp(false);
      setIsHidden(false);
    }
  };
  //Calculate the dimension
  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
      )
    );
  };
  //Set the value player input to numberOfMove to movesLeft. set movesLeft = previousMoveOption if user left numberOfMove blank
  const changeNumOfMove = e => {
    if (e.target.value) setMovesLeft(e.target.value);
    else setMovesLeft(previousMoveOption);
  };

  return (
    <div className="App">
      <div className="headerWrapper">
        <h1 className="header"> Memory Game</h1>
      </div>
      <div className="gameScreen">
        <div className="topWrapper">
          <h2> Score: {score}</h2>
          <h2> Best Score: {bestScore} </h2>
          <h2>
            {" "}
            Timer: {minutes === 0 ? null : `${minutes}:`}
            {seconds < 10 ? `0${seconds}` : seconds}
          </h2>
          <h2> Moves left: {movesLeft}</h2>
          <button className="newGame" onClick={handleNewGame}>
            {" "}
            {isSettingUp ? "GO!" : "New Game"}
          </button>
        </div>
        <div
          className="difficulty"
          style={{ display: isSettingUp ? null : "none" }}
        >
          <h2>Number of moves allowed</h2>
          <input
            placeholder="Please enter number of moves"
            type="number"
            onChange={changeNumOfMove}
            className="numberOfMove"
          ></input>
        </div>
        <Board
          correct={correct}
          disable={disable}
          dimension={dimension}
          tiles={tiles}
          flipped={flipped}
          handleFlip={handleFlip}
          isHidden={isHidden}
        />
      </div>
    </div>
  );
}
