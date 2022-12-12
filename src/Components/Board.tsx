import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from "react-native";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Dimensions } from "react-native";

import Draggable from "./Draggable";
import Piece from "./Piece";

import * as game from "../Actions/game";

import white from "../Assets/white.png";
import black from "../Assets/black.png";

import Chess, { tPosSN, tPosNS } from "yd-chess-lib";

const Board = (props) => {
  const { board, pieces, is_playing } = props;
  const windowWidth = Dimensions.get("window").width;
  const size = Math.round(windowWidth * 0.1175);

  const isHighlight = (number, letter) => {
    let is_highlight = false;
    const { selected, show_legal_moves } = props;
    if (
      show_legal_moves &&
      selected != null &&
      selected.movementsAllowed.length > 0 &&
      selected.movementsAllowed.includes(`${8 - number}${letter}`)
    )
      is_highlight = true;
    return is_highlight;
  };

  const tryToMove = (number, letter) => {
    let posString = `${8 - number}${letter}`;
    let posNumber = tPosSN(posString);
    let square = Chess.getInstance().getSquare(posString);
    if (props.selected !== null && square == null) {
      if (props.selected.movementsAllowed.includes(posString)) {
        Chess.getInstance().move(`${props.selected.key}x${posString}`);
        props.switchPlayer();
      }
      props.setSelected(null);
    }
  };

  return (
    <View style={styles.board}>
      <View style={{ position: "relative" }}>
        {Object.keys(board)
          .reverse()
          .map((row, number) => {
            return (
              <View key={`Row_${number}`} style={{ flexDirection: "row" }}>
                {Object.keys(board[row]).map((letter, indexItem) => {
                  return (
                    <TouchableOpacity key={`Item_${indexItem}`} activeOpacity={1} onPress={() => tryToMove(number, letter)}>
                      <ImageBackground source={(number + indexItem) % 2 == 0 ? white : black} resizeMode="cover" style={styles.image}>
                        <View style={{ width: size, height: size }}>
                          {isHighlight(number, letter) && (
                            <View style={{ borderWidth: 6, borderColor: "#44444455", borderRadius: 45, height: 28, margin: 10 }} />
                          )}
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        {Chess.getInstance()
          .getChessboard()
          .map((row, indexX) =>
            row.map((item, indexY) => {
              return (
                <Draggable
                  isDraggable={item !== null && item.color === is_playing && item.movementsAllowed.length > 0}
                  size={size}
                  index={1}
                  item={item}
                  key={`item_${indexX}_${indexY}`}
                >
                  <Piece size={size} piece={item} />
                </Draggable>
              );
            })
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F2D6AF",
  },
});

const mapStateToProps = (state: AppState) => ({
  board: state.game.board,
  selected: state.game.selected,
  is_playing: state.game.is_playing,
  show_legal_moves: state.game.show_legal_moves,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSelected: game.setSelected,
  switchPlayer: game.switchPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
