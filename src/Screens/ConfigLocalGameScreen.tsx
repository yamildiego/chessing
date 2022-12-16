import React, { Component } from "react";
import { Switch, StyleSheet, Text, View, ImageBackground } from "react-native";
import { HStack, Box, Divider, Button } from "@react-native-material/core";

import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import * as game from "../Actions/game";

import background from "../Assets/background.jpg";
import white from "../Assets/white.png";
import black from "../Assets/black.png";

import Chess from "yd-chess-lib";

const times = { 180000: "3", 300000: "5", 600000: "10", 900000: "15" };

class ConfigLocalGameScreen extends Component {
  toggleShowLegalMoves = () => this.props.setShowLegalMoves(!this.props.show_legal_moves);
  setTimePerPlayer = (time) => this.props.setTimePerPlayer(time);
  openGameLocal = () => {
    Chess.getInstance().reStart();
    this.props.initializedBoard();
    this.props.navigation.navigate("LocalGameScreen");
  };

  render() {
    const { board, pieces, time_per_player, show_legal_moves } = this.props;
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
                      onPress={() => this.setTimePerPlayer(key)}
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
          title={() => <Text style={styles.buttonText}>PLAY</Text>}
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
  board: state.game.board,
  selected: state.game.selected,
  show_legal_moves: state.game.show_legal_moves,
  time_per_player: state.game.time_per_player,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setShowLegalMoves: game.setShowLegalMoves,
  setTimePerPlayer: game.setTimePerPlayer,
  initializedBoard: game.initializedBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigLocalGameScreen);
