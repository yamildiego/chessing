import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import Board from "../Components/Board";
import PlayersInfo from "../Components/PlayersInfo";

import * as game from "../Actions/game";

import background from "../Assets/background.jpg";

import Chess from "yd-chess-lib";

class LocalGameScreen extends Component {
  componentDidMount = () => {
    Chess.getInstance();
  };

  render() {
    const transformFlip = {
      transform: [{ scaleX: -1 }, { scaleY: -1 }],
    };

    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <View style={{ ...transformFlip, flex: 1, width: "100%", maxWidth: 380, justifyContent: "flex-start" }}>
          <PlayersInfo timePerPlayer={this.props.time_per_player} isPlaying={this.props.is_playing} />
        </View>
        <View>
          <Board />
        </View>
        <View style={{ flex: 1, width: "100%", maxWidth: 380 }}>
          <PlayersInfo timePerPlayer={this.props.time_per_player} isPlaying={this.props.is_playing} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state: AppState) => ({
  is_playing: state.game.is_playing,
  time_per_player: state.game.time_per_player,
  // board: state.game.board,
  // selected: state.game.selected,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  switchPlayer: game.switchPlayer,
  // setSelected: game.setSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalGameScreen);
