import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Color } from "yd-chess-lib";

import Board from "./Board";
import Draggables from "./Draggables";

interface ChessboardProps {
  is_playing: Color;
  flip: string;
  is_offline: boolean;
  main_player_color: string;
}

const Chessboard = (props: ChessboardProps) => {
  const { is_playing, flip, is_offline, main_player_color } = props;

  const animatedStyle =
    (is_offline && flip == "board" && is_playing == Color.BLACK) || (!is_offline && main_player_color == Color.BLACK)
      ? { transform: [{ scaleY: -1 }, { scaleX: -1 }] }
      : {};

  return (
    <View style={{ ...styles.container, ...animatedStyle }}>
      <View style={{ position: "relative" }}>
        <Board />
        <Draggables />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F2D6AF",
  },
});

const mapStateToProps = (state: StateType) => ({
  is_playing: state.match.is_playing,
  flip: state.config.flip,
  is_offline: state.online.code == null,
  main_player_color: state.online.main_player_color,
});

export default connect(mapStateToProps)(Chessboard);
