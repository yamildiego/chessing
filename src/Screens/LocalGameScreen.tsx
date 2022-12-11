import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import Draggable from "../Components/Draggable";
import Piece from "../Components/Piece";

import * as game from "../Actions/game";

import background from "../Assets/background.jpg";
import white from "../Assets/white.png";
import black from "../Assets/black.png";

import Chess, { tPosNS, tPosSN } from "yd-chess-lib";

interface GameProps {}

interface GameState {}

class LocalGameScreen extends Component<GameProps, GameState> {
  componentDidMount = () => {
    Chess.getInstance();
  };

  getColor = (number, letter) => {
    let color = "transparent";
    const { selected } = this.props;
    let position = `${8 - number}${letter}`;
    if (selected != null && selected.movementsAllowed.length > 0) {
      if (selected.movementsAllowed.includes(position)) {
        color = "#ffff2654";
      }
    }

    return color;
  };

  tryToMove = (number, letter) => {
    let posString = `${8 - number}${letter}`;
    let posNumber = tPosSN(posString);
    let square = Chess.getInstance().getSquare(posString);
    if (this.props.selected !== null && square == null) {
      if (this.props.selected.movementsAllowed.includes(posString)) Chess.getInstance().move(`${this.props.selected.key}x${posString}`);
      this.props.setSelected(null);
    }
  };

  render() {
    const { board, pieces } = this.props;
    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.board}>
          <View style={{ paddingTop: 50, position: "relative" }}>
            {Object.keys(board)
              .reverse()
              .map((row, number) => {
                return (
                  <View key={`Row_${number}`} style={{ flexDirection: "row" }}>
                    {Object.keys(board[row]).map((letter, indexItem) => {
                      return (
                        <TouchableOpacity key={`Item_${indexItem}`} delayPressIn={150} onPress={() => this.tryToMove(number, letter)}>
                          <ImageBackground source={(number + indexItem) % 2 == 0 ? white : black} resizeMode="cover" style={styles.image}>
                            <View
                              style={{
                                backgroundColor: this.getColor(number, letter),
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
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state: AppState) => ({
  board: state.game.board,
  selected: state.game.selected,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSelected: game.setSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalGameScreen);
