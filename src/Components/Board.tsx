import React, { useState, useEffect } from "react";
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
  const [pieceMoved, setPieceMoved] = useState(null);

  const highlight = (number, letter) => {
    const { selected, show_legal_moves } = props;
    return (
      show_legal_moves &&
      selected != null &&
      selected.movementsAllowed.length > 0 &&
      selected.movementsAllowed.includes(`${8 - number}${letter}`)
    );
  };

  const isSelected = (number, letter) => props.show_legal_moves && props.selected != null && props.selected.key == `${8 - number}${letter}`;

  const tryToMove = (number, letter) => {
    let posString = `${8 - number}${letter}`;
    let posNumber = tPosSN(posString);
    let square = Chess.getInstance().getSquare(posString);
    if (props.selected !== null && square == null) {
      if (props.selected.movementsAllowed.includes(posString)) {
        setPieceMoved({ from: props.selected.key, to: posString });
        // setPieceMoved(`${props.selected.key}x${posString}`);
        //this var is becose the animation. I'll move inside
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
                          {highlight(number, letter) && <View style={{ ...styles.highlight, height: size - 20 }} />}
                          {isSelected(number, letter) && (
                            <View
                              style={{
                                ...styles.highlight,
                                margin: 5,
                                width: size - 10,
                                height: size - 10,
                                backgroundColor: "#44444455",
                              }}
                            />
                          )}
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        <>
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
                    pieceMoved={pieceMoved}
                    key={`item_${indexX}_${indexY}`}
                  >
                    <Piece size={size} piece={item} is_playing={is_playing} />
                  </Draggable>
                );
              })
            )}
        </>
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
  highlight: {
    borderWidth: 6,
    borderColor: "#44444455",
    borderRadius: 100,
    margin: 10,
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
  setInitializedBoard: game.setInitializedBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
