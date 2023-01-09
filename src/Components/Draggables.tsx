import React from "react";
import { connect } from "react-redux";
import { Chess } from "yd-chess-lib";

import Draggable from "./Draggable";

const Draggables = (props) => {
  const { is_playing, status, is_offline, main_player_color } = props;
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

const mapStateToProps = (state: any) => ({
  is_playing: state.match.is_playing,
  status: state.match.status,
  is_offline: state.online.code == null,
  main_player_color: state.online.main_player_color,
});

export default connect(mapStateToProps)(Draggables);
