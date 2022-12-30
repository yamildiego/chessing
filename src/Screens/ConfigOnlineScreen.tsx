import React, { Component } from "react";
import { Switch, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import * as config from "../Actions/config";
import * as match from "../Actions/match";

import { primaryColor } from "../Constants/MyColors";
import Button from "../Components/Button";

import background from "../Assets/background.jpg";
import white from "../Assets/white.png";
import black from "../Assets/black.png";

import { Chess, TypeOfPiece, Color } from "yd-chess-lib";

const times = { 300000: "5", 600000: "10", 900000: "15", 1800000: "30" };
const flipOptions = { board: "Board", pieces: "Pieces" };

class ConfigOnlineScreen extends Component {
  createGame = () => this.props.createGame();

  render() {
    const { pieces, time_per_player, show_legal_moves, flip, is_loading } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.lineSetting}>
            <Text style={styles.label}>Show legal moves</Text>
            <Switch
              ios_backgroundColor="white"
              disabled={is_loading}
              style={{ color: "red" }}
              trackColor={{ false: "#767577", true: "#0b843936" }}
              thumbColor={show_legal_moves ? primaryColor : "#f4f3f4"}
              color={primaryColor}
              onValueChange={() => this.props.setShowLegalMoves(!this.props.show_legal_moves)}
              value={show_legal_moves}
            />
          </View>
          <View style={{ ...styles.lineSetting, flexDirection: "column" }}>
            <View>
              <Text style={{ fontSize: 15, fontFamily: "Ubuntu", textAlign: "left", lineHeight: 20 }}>Minutes per player</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <View style={{ width: 360, flexDirection: "row", justifyContent: "space-between" }}>
                {Object.keys(times).map((key, index) => {
                  return (
                    <Button
                      disabled={is_loading}
                      width={80}
                      key={index}
                      bgColor={time_per_player == key ? primaryColor : "grey"}
                      onPress={() => this.props.setTimePerPlayer(key)}
                    >
                      {times[key]}
                    </Button>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <Button onPress={() => this.createGame()}>{is_loading ? <ActivityIndicator color={"#fff"} /> : "Create game"}</Button>
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
});

const mapStateToProps = (state: AppState) => ({
  show_legal_moves: state.config.show_legal_moves,
  time_per_player: state.config.time_per_player,
  is_loading: state.config.is_loading,
  flip: state.config.flip,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setShowLegalMoves: config.setShowLegalMoves,
  setFlip: config.setFlip,
  setTimePerPlayer: config.setTimePerPlayer,
  createGame: config.createGame,
  initializedBoard: match.initializedBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigOnlineScreen);
