import React from "react";
import { connect } from "react-redux";
import { Chess, Color } from "yd-chess-lib";

import Draggable from "./Draggable";

interface DraggablesProps {
  is_playing: Color;
  status: string | null;
  is_offline: boolean;
  main_player_color: Color | null;
}

const Draggables = (props: DraggablesProps) => {
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

const mapStateToProps = (state: StateType) => ({
  is_playing: state.match.is_playing,
  status: state.match.data_finished.status,
  is_offline: state.online.code == null,
  main_player_color: state.online.main_player_color,
});

export default connect(mapStateToProps)(Draggables);
