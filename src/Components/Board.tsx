import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from "react-native";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import Draggable from "./Draggable";

import * as match from "../Actions/match";
import * as config from "../Actions/config";

import white from "../Assets/white.png";
import black from "../Assets/black.png";

import { Chess, tPosSN, tPosNS, Color } from "yd-chess-lib";

interface BoardProps {
  board: Array<Array<string>>;
  is_playing: Color;
  square_selected: PieceType | null;
  show_legal_moves: boolean;
  status: string | null;
  size_square: number;
  flip: string;
  is_offline: boolean;
  main_player_color: string;
  setPieceMoved: (value: { from: string; to: string } | null) => void;
  setSquareSelected: (value: PieceType | null) => void;
}

const Board = (props: BoardProps) => {
  const { board, is_playing, square_selected, show_legal_moves, status, size_square, flip, is_offline, main_player_color } = props;

  const highlight = (number: number, letter: string) => {
    return (
      show_legal_moves &&
      square_selected != null &&
      square_selected.movementsAllowed.length > 0 &&
      square_selected.movementsAllowed.includes(`${8 - number}${letter}`) &&
      status == null
    );
  };

  const isSelected = (number: number, letter: string) =>
    show_legal_moves && square_selected != null && status == null && square_selected.key == `${8 - number}${letter}`;

  const tryToMove = (number: number, letter: string) => {
    let posString = `${8 - number}${letter}`;
    let posNumber = tPosSN(posString);
    let square = Chess.getInstance().getSquare(posString);
    if (square_selected !== null && square == null) {
      if (square_selected.movementsAllowed.includes(posString)) props.setPieceMoved({ from: square_selected.key, to: posString });
      props.setSquareSelected(null);
    }
  };

  const animatedStyle =
    (is_offline && flip == "board" && is_playing == Color.BLACK) || (!is_offline && main_player_color == Color.BLACK)
      ? { transform: [{ scaleY: -1 }, { scaleX: -1 }] }
      : {};

  return (
    <View style={{ ...styles.board, ...animatedStyle }}>
      <View style={{ position: "relative" }}>
        {board.reverse().map((row, number) => {
          return (
            <View key={`Row_${number}`} style={{ flexDirection: "row" }}>
              {row.map((letter, indexItem) => {
                return (
                  <TouchableOpacity key={`Item_${indexItem}`} activeOpacity={1} onPress={() => tryToMove(number, letter)}>
                    <ImageBackground source={(number + indexItem) % 2 == 0 ? white : black} resizeMode="cover">
                      <View style={{ width: size_square, height: size_square }}>
                        {highlight(number, letter) && <View style={{ ...styles.highlight, height: size_square - 20 }} />}
                        {isSelected(number, letter) && (
                          <View style={{ ...styles.highlight, width: size_square - 10, height: size_square - 10, margin: 5 }} />
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
                  <React.Fragment key={`item_${indexX}_${indexY}`}>
                    {item !== null && (
                      <Draggable
                        isDraggable={
                          (is_offline || (!is_offline && main_player_color == is_playing)) &&
                          item.color === is_playing &&
                          item.movementsAllowed.length > 0 &&
                          status == null
                        }
                        item={item}
                      />
                    )}
                  </React.Fragment>
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

const mapStateToProps = (state: any) => ({
  board: state.game.board,
  is_playing: state.match.is_playing,
  square_selected: state.match.square_selected,
  show_legal_moves: state.config.show_legal_moves,
  status: state.match.status,
  size_square: state.visual.size_square,
  flip: state.config.flip,
  is_offline: state.online.code == null,
  main_player_color: state.online.main_player_color,
});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setSquareSelected: match.setSquareSelected,
  setPieceMoved: match.setPieceMoved,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
