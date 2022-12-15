import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import PlayerInfo from "./PlayerInfo";

const PlayersInfo = (props) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <PlayerInfo timePerPlayer={props.timePerPlayer} isPlaying={props.isPlaying == "W"} color="white" />
      <PlayerInfo timePerPlayer={props.timePerPlayer} isPlaying={props.isPlaying == "B"} color="black" />
    </View>
  );
};

export default PlayersInfo;
