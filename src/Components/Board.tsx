import { StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import Draggable from "./Draggable";
import Piece from "./Piece";

import * as game from "../Actions/game";

import white from "../Assets/white.png";
import black from "../Assets/black.png";

import Chess, { tPosSN, tPosNS } from "yd-chess-lib";

const Board = (props) => {
  const { board, pieces } = props;

  const getColor = (number, letter) => {
    let color = "transparent";
    const { selected } = props;
    let position = `${8 - number}${letter}`;
    if (selected != null && selected.movementsAllowed.length > 0) {
      if (selected.movementsAllowed.includes(position)) {
        color = "#ffff2654";
      }
    }

    return color;
  };

  const tryToMove = (number, letter) => {
    let posString = `${8 - number}${letter}`;
    let posNumber = tPosSN(posString);
    let square = Chess.getInstance().getSquare(posString);
    if (props.selected !== null && square == null) {
      if (props.selected.movementsAllowed.includes(posString)) Chess.getInstance().move(`${props.selected.key}x${posString}`);
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
                    <TouchableOpacity key={`Item_${indexItem}`} delayPressIn={150} onPress={() => tryToMove(number, letter)}>
                      <ImageBackground source={(number + indexItem) % 2 == 0 ? white : black} resizeMode="cover" style={styles.image}>
                        <View
                          style={{
                            backgroundColor: getColor(number, letter),
                            width: 45,
                            height: 45,
                          }}
                        />
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
                <Draggable index={1} item={item} key={`item_${indexX}_${indexY}`}>
                  <Piece piece={item} />
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
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSelected: game.setSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
