import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import Draggable from "./Draggable";
import Piece from "./Piece";

import * as match from "../Actions/match";
import * as config from "../Actions/config";

import white from "../Assets/white.png";
import black from "../Assets/black.png";

import { Chess, tPosSN, tPosNS, Color } from "yd-chess-lib";

const Board = (props) => {
  const { board, pieces, is_playing, square_selected, show_legal_moves, status, sizeSquare, flip } = props;
  const [pieceMoved, setPieceMoved] = useState(null);

  const highlight = (number, letter) => {
    return (
      show_legal_moves &&
      square_selected != null &&
      square_selected.movementsAllowed.length > 0 &&
      square_selected.movementsAllowed.includes(`${8 - number}${letter}`) &&
      status == null
    );
  };

  const isSelected = (number, letter) =>
    show_legal_moves && square_selected != null && status == null && square_selected.key == `${8 - number}${letter}`;

  const tryToMove = (number, letter) => {
    let posString = `${8 - number}${letter}`;
    let posNumber = tPosSN(posString);
    let square = Chess.getInstance().getSquare(posString);
    if (square_selected !== null && square == null) {
      if (square_selected.movementsAllowed.includes(posString)) props.setPieceMoved({ from: square_selected.key, to: posString });
      props.setSquareSelected(null);
    }
  };

  const animatedStyle = flip == "board" && is_playing == Color.BLACK ? { transform: [{ scaleY: -1 }, { scaleX: -1 }] } : {};

  return (
    <View style={{ ...styles.board, ...animatedStyle }}>
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
                        <View style={{ width: sizeSquare, height: sizeSquare }}>
                          {highlight(number, letter) && <View style={{ ...styles.highlight, height: sizeSquare - 20 }} />}
                          {isSelected(number, letter) && (
                            <View
                              style={{
                                ...styles.highlight,
                                margin: 5,
                                width: sizeSquare - 10,
                                height: sizeSquare - 10,
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
                    isDraggable={item !== null && item.color === is_playing && item.movementsAllowed.length > 0 && status == null}
                    size={sizeSquare}
                    index={1}
                    item={item}
                    key={`item_${indexX}_${indexY}`}
                  >
                    <Piece size={sizeSquare} piece={item} is_playing={is_playing} />
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
  is_playing: state.match.is_playing,
  square_selected: state.match.square_selected,
  status: state.match.status,
  show_legal_moves: state.config.show_legal_moves,
  sizeSquare: state.visual.sizeSquare,
  flip: state.config.flip,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSquareSelected: match.setSquareSelected,
  switchPlayer: match.switchPlayer,
  setPieceMoved: match.setPieceMoved,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
