import React, { Component } from "react";
import { Switch, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";

import * as config from "../Actions/config";
import * as match from "../Actions/match";
import * as online from "../Actions/online";

import { primaryColor } from "../Constants/MyColors";
import Button from "../Components/Button";

const times: { [key: number]: string } = { 300000: "5", 600000: "10", 900000: "15", 1800000: "30" };

interface ConfigOnlineScreenProps {
  show_legal_moves: boolean;
  time_per_player: number;
  is_loading: boolean;
  code: string | null;
  createGame: () => void;
  setShowLegalMoves: (value: boolean) => void;
  setTimePerPlayer: (value: number) => void;
  navigation: any;
}

class ConfigOnlineScreen extends Component<ConfigOnlineScreenProps> {
  createGame = () => this.props.createGame();

  componentDidUpdate = (oldProps: ConfigOnlineScreenProps) => {
    if (oldProps.code == null && oldProps.code !== this.props.code) this.props.navigation.navigate("JoinOnlineScreen");
  };

  render() {
    const { show_legal_moves, time_per_player, is_loading } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.lineSetting}>
            <Text style={styles.label}>Show legal moves</Text>
            <Switch
              ios_backgroundColor="white"
              disabled={is_loading}
              trackColor={{ false: "#767577", true: "#0b843936" }}
              thumbColor={show_legal_moves ? primaryColor : "#f4f3f4"}
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

const mapStateToProps = (state: StateType) => ({
  show_legal_moves: state.config.show_legal_moves,
  time_per_player: state.config.time_per_player,
  is_loading: state.online.is_loading,
  code: state.online.code,
});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setShowLegalMoves: config.setShowLegalMoves,
  setFlip: config.setFlip,
  setTimePerPlayer: config.setTimePerPlayer,
  createGame: online.createGame,
  initializedBoard: match.initializedBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigOnlineScreen);
