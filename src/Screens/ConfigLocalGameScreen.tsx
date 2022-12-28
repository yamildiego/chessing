import React, { Component } from "react";
import { Switch, StyleSheet, Text, View } from "react-native";
import { HStack, Box, Divider, Button } from "@react-native-material/core";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import * as config from "../Actions/config";
import * as match from "../Actions/match";

import background from "../Assets/background.jpg";
import white from "../Assets/white.png";
import black from "../Assets/black.png";

import { Chess, TypeOfPiece, Color } from "yd-chess-lib";

const times = { 300000: "5", 600000: "10", 900000: "15", 1800000: "30" };
const flipOptions = { board: "Board", pieces: "Pieces" };

class ConfigLocalGameScreen extends Component {
  toggleShowLegalMoves = () => this.props.setShowLegalMoves(!this.props.show_legal_moves);

  openGameLocal = () => {
    Chess.getInstance().reStart();
    this.props.initializedBoard();
    this.props.navigation.navigate("LocalGameScreen");
  };

  render() {
    const { pieces, time_per_player, show_legal_moves, flip } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.lineSetting}>
            <Text style={styles.label}>Show legal moves</Text>
            <Switch ios_backgroundColor="white" onValueChange={this.toggleShowLegalMoves} value={show_legal_moves} />
          </View>
          <View style={{ ...styles.lineSetting, flexDirection: "column" }}>
            <View>
              <Text style={{ fontSize: 15, fontFamily: "Ubuntu", textAlign: "left", lineHeight: 20 }}>Flip</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
              <HStack spacing={2} divider={true}>
                {Object.keys(flipOptions).map((key, index) => {
                  return (
                    <Button
                      key={index}
                      color={flip == key ? "secondary" : "grey"}
                      title={() => <Text style={styles.buttonText}>{flipOptions[key]}</Text>}
                      onPress={() => this.props.setFlip(key)}
                    />
                  );
                })}
              </HStack>
            </View>
          </View>
          <View style={{ ...styles.lineSetting, flexDirection: "column" }}>
            <View>
              <Text style={{ fontSize: 15, fontFamily: "Ubuntu", textAlign: "left", lineHeight: 20 }}>Minutes per player</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
              <HStack spacing={2} divider={true}>
                {Object.keys(times).map((key, index) => {
                  return (
                    <Button
                      key={index}
                      color={time_per_player == key ? "secondary" : "grey"}
                      title={() => <Text style={styles.buttonText}>{times[key]}</Text>}
                      onPress={() => this.props.setTimePerPlayer(key)}
                    />
                  );
                })}
              </HStack>
            </View>
          </View>
        </View>
        <Button
          style={{ padding: 10 }}
          color="secondary"
          title={() => <Text style={styles.buttonText}>Play</Text>}
          onPress={() => this.openGameLocal()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
  lineSetting: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  label: {
    fontSize: 15,
    flex: 3,
    fontFamily: "Ubuntu",
    textAlign: "left",
    lineHeight: 48,
  },
  title: {
    fontSize: 35,
    lineHeight: 80,
    fontFamily: "Ubuntu",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 30,
    color: "white",
    fontFamily: "Ubuntu",
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfigLocalGameScreen);
