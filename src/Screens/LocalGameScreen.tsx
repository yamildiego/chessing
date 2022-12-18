import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

import Board from "../Components/Board";
import PlayersInfo from "../Components/PlayersInfo";
import ModalWins from "../Components/ModalWins";

import background from "../Assets/background.jpg";

class LocalGameScreen extends React.Component {
  render() {
    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <ModalWins navigation={this.props.navigation} />
        <PlayersInfo executeFunc={false} />
        <Board />
        <PlayersInfo executeFunc={true} />
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

export default LocalGameScreen;
