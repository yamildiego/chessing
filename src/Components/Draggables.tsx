import React from "react";
import { connect } from "react-redux";
import { Chess, Color } from "yd-chess-lib";

import Draggable from "./Draggable";

interface DraggablesProps {
  is_playing: Color;
  status: string | null;
}

const Draggables = (props: DraggablesProps) => {
  const { is_playing, status } = props;
  return (
    <>
      {Chess.getInstance()
        .getChessboard()
        .map((row, indexX) =>
          row.map((item, indexY) => {
            return (
              <React.Fragment key={`item_${indexX}_${indexY}`}>
                {item !== null && (
                  <Draggable isDraggable={item.color === is_playing && item.movementsAllowed.length > 0 && status == null} item={item} />
                )}
              </React.Fragment>
            );
          })
        )}
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  is_playing: state.match.is_playing,
  status: state.match.data_finished.status,
});

export default connect(mapStateToProps)(Draggables);
