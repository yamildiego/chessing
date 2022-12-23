import React from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, Text } from "react-native";

import Board from "../Components/Board";
import PlayersInfo from "../Components/PlayersInfo";
import ModalWins from "../Components/ModalWins";
import Options from "../Components/Options";

import background from "../Assets/background.jpg";

class LocalGameScreen extends React.Component {
  render() {
    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <ModalWins navigation={this.props.navigation} />
        <Options playerMain={false} />
        <PlayersInfo playerMain={false} />
        <Board />
        <PlayersInfo playerMain={true} />
        <Options playerMain={true} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default LocalGameScreen;
