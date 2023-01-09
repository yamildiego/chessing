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

const times: { [key: number]: string } = { 300000: "5", 600000: "10", 900000: "15", 1800000: "30" };
const flipOptions: { [key: string]: string } = { pieces: "Pieces", board: "Board" };

interface ConfigOfflineScreenProps {
  show_legal_moves: boolean;
  time_per_player: number;
  flip: string;
  initializedBoard: () => void;
  setShowLegalMoves: (value: boolean) => void;
  setFlip: (value: string) => void;
  setTimePerPlayer: (value: number) => void;
  navigation: any;
}

class ConfigOfflineScreen extends Component<ConfigOfflineScreenProps> {
  toggleShowLegalMoves = () => this.props.setShowLegalMoves(!this.props.show_legal_moves);

  openGameOffline = () => {
    Chess.getInstance().reStart();
    this.props.initializedBoard();
    this.props.navigation.navigate("OfflineGameScreen");
  };

  render() {
    const { show_legal_moves, time_per_player, flip } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.lineSetting}>
            <Text style={styles.label}>Show legal moves</Text>
            <Switch
              ios_backgroundColor="white"
              trackColor={{ false: "#767577", true: "#0b843936" }}
              thumbColor={show_legal_moves ? primaryColor : "#f4f3f4"}
              onValueChange={this.toggleShowLegalMoves}
              value={show_legal_moves}
            />
          </View>
          <View style={{ ...styles.lineSetting, flexDirection: "column" }}>
            <View>
              <Text style={{ fontSize: 15, fontFamily: "Ubuntu", textAlign: "left", lineHeight: 20 }}>Flip</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <View style={{ width: 170, flexDirection: "row", justifyContent: "space-between" }}>
                {Object.keys(flipOptions).map((key, index) => {
                  return (
                    <Button width={80} key={index} bgColor={flip == key ? primaryColor : "grey"} onPress={() => this.props.setFlip(key)}>
                      {flipOptions[key]}
                    </Button>
                  );
                })}
              </View>
            </View>
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
                      width={80}
                      key={index}
                      bgColor={time_per_player == parseInt(key) ? primaryColor : "grey"}
                      onPress={() => this.props.setTimePerPlayer(parseInt(key))}
                    >
                      {times[parseInt(key)]}
                    </Button>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <Button onPress={() => this.openGameOffline()}>Play</Button>
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

const mapStateToProps = (state: any) => ({
  show_legal_moves: state.config.show_legal_moves,
  time_per_player: state.config.time_per_player,
  flip: state.config.flip,
});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setShowLegalMoves: config.setShowLegalMoves,
  setFlip: config.setFlip,
  setTimePerPlayer: config.setTimePerPlayer,
  initializedBoard: match.initializedBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigOfflineScreen);
