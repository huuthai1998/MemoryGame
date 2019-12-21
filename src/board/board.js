import React from "react";
import Tile from "../tile/tile.js";
import PropTypes from "prop-types";
import "./board.css";
export default function Board({
  isHidden,
  correct,
  disable,
  dimension,
  tiles,
  flipped,
  handleFlip
}) {
  return (
    <div className="board" style={{ display: isHidden ? "none" : null }}>
      {tiles.map(tile => (
        <Tile
          key={tile.id}
          id={tile.id}
          width={dimension / 6.5}
          height={dimension / 6.5}
          type={tile.type}
          id={tile.id}
          handleFlip={handleFlip}
          correct={correct.includes(tile.id)}
          disable={disable || correct.includes(tile.id)} //Disable if the clicked tiles if the disable state is true or if the clicked tile is already solved
          flipped={flipped.includes(tile.id)}
        />
      ))}
    </div>
  );
}
Board.propTypes = {
  disable: PropTypes.bool.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  correct: PropTypes.arrayOf(PropTypes.number).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleFlip: PropTypes.func.isRequired,
  dimension: PropTypes.number.isRequired,
  isHidden: PropTypes.bool.isRequired
};
