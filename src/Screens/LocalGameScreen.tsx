import React, { useEffect } from "react";
import { StyleSheet, ImageBackground, Text } from "react-native";
import { connect, MapStateToProps } from "react-redux";

import Board from "../Components/Board";
import PlayersInfo from "../Components/PlayersInfo";

import background from "../Assets/background.jpg";

class LocalGameScreen extends React.Component {
  render() {
    const { time_per_player, is_playing } = this.props;

    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <PlayersInfo executeFunc={false} timePerPlayer={time_per_player} isPlaying={is_playing} />
        <Board />
        <PlayersInfo executeFunc={true} timePerPlayer={time_per_player} isPlaying={is_playing} />
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
});

export default connect(mapStateToProps)(LocalGameScreen);
