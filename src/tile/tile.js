import React from "react";
import PropTypes from "prop-types";
import Back from "../asset/back.png";
import "./tile.css";

export default function Tile({
  correct,
  disable,
  handleFlip,
  id,
  type,
  flipped,
  width,
  height
}) {
  return (
    <div
      id={`no${id}`}
      className={`tile-wrapper ${flipped ? "flipped" : ""}`}
      style={{ width, height }}
      onClick={() => (disable ? null : handleFlip(id))}
    >
      <div className="flipState">
        <img
          style={{ height, width }}
          className={flipped ? "front" : "back"}
          src={flipped || correct ? require(`../asset/${type}.png`) : Back}
        />
      </div>
    </div>
  );
}
Tile.propTypes = {
  correct: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired,
  handleFlip: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};
