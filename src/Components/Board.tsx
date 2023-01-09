import React from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";
import { Chess, tPosSN } from "yd-chess-lib";

import * as match from "../Actions/match";

import white from "../Assets/white.png";
import black from "../Assets/black.png";

interface BoardProps {
  board: Array<Array<string>>;
  square_selected: PieceType | null;
  show_legal_moves: boolean;
  status: string | null;
  size_square: number;
  setPieceMoved: (value: { from: string; to: string } | null) => void;
  setSquareSelected: (value: PieceType | null) => void;
}

const Board = (props: BoardProps) => {
  const { board, square_selected, show_legal_moves, status, size_square } = props;

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

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  highlight: {
    borderWidth: 6,
    borderColor: "#44444455",
    borderRadius: 100,
    margin: 10,
  },
});

const mapStateToProps = (state: StateType) => ({
  board: state.game.board,
  square_selected: state.match.square_selected,
  show_legal_moves: state.config.show_legal_moves,
  status: state.match.data_finished.status,
  size_square: state.visual.size_square,
});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setSquareSelected: match.setSquareSelected,
  setPieceMoved: match.setPieceMoved,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
