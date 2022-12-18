import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from "react-native";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Dimensions } from "react-native";

import Draggable from "./Draggable";
import Piece from "./Piece";

import * as match from "../Actions/match";
import * as config from "../Actions/config";

import white from "../Assets/white.png";
import black from "../Assets/black.png";

import Chess, { tPosSN, tPosNS } from "yd-chess-lib";

const Board = (props) => {
  const { board, pieces, is_playing, square_selected, show_legal_moves, status } = props;
  const windowWidth = Dimensions.get("window").width;
  const size = Math.round(windowWidth * 0.1175);
  const [pieceMoved, setPieceMoved] = useState(null);

  const highlight = (number, letter) => {
    return (
      show_legal_moves &&
      square_selected != null &&
      square_selected.movementsAllowed.length > 0 &&
      square_selected.movementsAllowed.includes(`${8 - number}${letter}`)
    );
  };

  const isSelected = (number, letter) => show_legal_moves && square_selected != null && square_selected.key == `${8 - number}${letter}`;

  const tryToMove = (number, letter) => {
    let posString = `${8 - number}${letter}`;
    let posNumber = tPosSN(posString);
    let square = Chess.getInstance().getSquare(posString);
    if (square_selected !== null && square == null) {
      if (square_selected.movementsAllowed.includes(posString)) {
        setPieceMoved({ from: square_selected.key, to: posString });
        // setPieceMoved(`${square_selected.key}x${posString}`);
        //this var is becose the animation. I'll move inside
      }
      props.setSquareSelected(null);
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
                    isDraggable={item !== null && item.color === is_playing && item.movementsAllowed.length > 0 && status == null}
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
  is_playing: state.match.is_playing,
  square_selected: state.match.square_selected,
  status: state.match.status,
  show_legal_moves: state.config.show_legal_moves,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSquareSelected: match.setSquareSelected,
  switchPlayer: match.switchPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
