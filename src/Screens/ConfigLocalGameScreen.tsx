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
  toggleShowLegalMoves = () => this.props.dispatch(game.setShowLegalMoves(!this.props.show_legal_moves));
  setTimePerPlayer = (time) => this.props.dispatch(game.setTimePerPlayer(time));
  openGameLocal = () => this.props.navigation.navigate("LocalGameScreen");

  render() {
    const { board, pieces, time_per_player, show_legal_moves } = this.props;
    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
        <View style={{ backgroundColor: "#ffffffaa", marginTop: -150 }}>
          <Text style={styles.title}>Settings</Text>
          <View style={{ borderTopWidth: 1, borderColor: "#eee", padding: 10, width: 300, display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 15, flex: 3, fontFamily: "Ubuntu", textAlign: "left", lineHeight: 48 }}>Show legal moves</Text>
            <Switch ios_backgroundColor="white" onValueChange={this.toggleShowLegalMoves} value={show_legal_moves} />
          </View>
          <View style={{ borderTopWidth: 1, borderColor: "#eee", padding: 10, width: 300, display: "flex", flexDirection: "column" }}>
            <View>
              <Text style={{ fontSize: 15, fontFamily: "Ubuntu", textAlign: "left", lineHeight: 20 }}>Minutes per player</Text>
            </View>
            <HStack style={{ marginTop: 15 }} m={4} spacing={2} divider={true}>
              {Object.keys(times).map((key, index) => {
                return (
                  <Button
                    key={index}
                    color={time_per_player == key ? "secondary" : "grey"}
                    title={() => <Text style={{ fontSize: 16, lineHeight: 30, color: "white", fontFamily: "Ubuntu" }}>{times[key]}</Text>}
                    onPress={() => this.setTimePerPlayer(key)}
                  />
                );
              })}
            </HStack>
          </View>
          <View style={{ borderTopWidth: 1, borderColor: "#eee" }}>
            <Button
              style={{ margin: 10 }}
              color="secondary"
              title={() => <Text style={{ fontSize: 16, lineHeight: 30, color: "white", fontFamily: "Ubuntu" }}>PLAY</Text>}
              onPress={() => this.openGameLocal()}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: "absolute",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    lineHeight: 80,
    fontFamily: "Ubuntu",
    textAlign: "center",
  },
});

const mapStateToProps = (state: AppState) => ({
  board: state.game.board,
  selected: state.game.selected,
  show_legal_moves: state.game.show_legal_moves,
  time_per_player: state.game.time_per_player,
});

export default connect(mapStateToProps)(ConfigLocalGameScreen);
