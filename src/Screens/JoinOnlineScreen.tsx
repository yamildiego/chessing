import React, { Component } from "react";
import { Switch, StyleSheet, Text, View } from "react-native";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import * as config from "../Actions/config";
import * as match from "../Actions/match";

import { primaryColor } from "../Constants/MyColors";
import Button from "../Components/Button";

import background from "../Assets/background.jpg";
import white from "../Assets/white.png";
import black from "../Assets/black.png";

import { Chess, TypeOfPiece, Color } from "yd-chess-lib";

import { StatusBar, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";
import { secondaryColor, logoColor, textColor } from "../Constants/MyColors";
import logo from "../../assets/icon.png";

const times = { 300000: "5", 600000: "10", 900000: "15", 1800000: "30" };
const flipOptions = { board: "Board", pieces: "Pieces" };
const size = Math.round(Dimensions.get("window").width * 0.06);

class JoinOnlineScreen extends Component {
  joinGame = () => this.props.navigation.navigate("ConfigOnlineScreen");

  createGame = () => this.props.navigation.navigate("ConfigOnlineScreen");

  render() {
    const { pieces, time_per_player, show_legal_moves, flip } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Avatar.Image style={{ backgroundColor: "transparent" }} size={size * 5} source={logo} />
          <Text style={{ ...styles.title, color: logoColor, fontSize: size, lineHeight: size * 2 }}>Chessing</Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.buttons}>
            <Button onPress={this.joinGame}>Join game</Button>
            <Button onPress={this.createGame}>Create game</Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  subContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  logo: {
    marginTop: 38,
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "CCKillJoy",
  },
  buttons: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state: AppState) => ({
  show_legal_moves: state.config.show_legal_moves,
  time_per_player: state.config.time_per_player,
  flip: state.config.flip,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setShowLegalMoves: config.setShowLegalMoves,
  setFlip: config.setFlip,
  setTimePerPlayer: config.setTimePerPlayer,
  initializedBoard: match.initializedBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinOnlineScreen);
